import { Vehicle } from "../../models/vehicle";
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateVehicleRepository, UpdateVehicleParams } from "./protocols";
import { VehicleValidationService } from "../../services/VehicleValidationService";
import { IGetVehiclesRepository } from "../get-vehicles/protocols";
export class UpdateVehicleController implements IController {
  private vehicleValidationService: VehicleValidationService;

  constructor(
    private readonly updateVehicleRepository: IUpdateVehicleRepository,
    private readonly getVehiclesRepository: IGetVehiclesRepository // Ensure this is being passed to the constructor
  ) {
    this.vehicleValidationService = new VehicleValidationService(getVehiclesRepository);
  }
  async handle(
    httpRequest: HttpRequest<UpdateVehicleParams>
  ): Promise<HttpResponse<Vehicle | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Missing fields.");
      }

      if (!id) {
        return badRequest("Missing vehicle id");
      }

      // Checking if license plate is being updated and needs uniqueness validation
      if (body.licensePlate) {
        const uniqueError = await this.vehicleValidationService.checkLicensePlateUniqueExceptCurrent(body.licensePlate, id);
        if (uniqueError) {
          return badRequest(uniqueError);
        }
      }

      const allowedFieldsToUpdate: (keyof UpdateVehicleParams)[] = ["licensePlate", "make", "model", "year", "mileage"];

      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateVehicleParams)
      );

      if (someFieldIsNotAllowedToUpdate) {
        return badRequest("Some received field is not allowed");
      }

      const vehicle = await this.updateVehicleRepository.updateVehicle(id, body);

      return ok<Vehicle>(vehicle);
    } catch (error) {
      return serverError();
    }
  }
}
