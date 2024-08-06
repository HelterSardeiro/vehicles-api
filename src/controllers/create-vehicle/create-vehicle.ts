import { HttpRequest, HttpResponse, IController } from "../protocols";
import { Vehicle } from "../../models/vehicle";
import { badRequest, created, serverError } from "../helpers";
import { ICreateVehicleRepository } from "./protocols";
import { VehicleValidationService } from "../../services/VehicleValidationService";

import { IGetVehiclesRepository } from "../get-vehicles/protocols";

export class CreateVehicleController implements IController {
  private vehicleValidationService: VehicleValidationService;

  constructor(
    private readonly createVehicleRepository: ICreateVehicleRepository,
    private readonly getVehiclesRepository: IGetVehiclesRepository
  ) {
    this.vehicleValidationService = new VehicleValidationService(getVehiclesRepository);
  }

  async handle(httpRequest: HttpRequest<Vehicle>): Promise<HttpResponse<Vehicle | string>> {
    if (!httpRequest.body) {
      return badRequest("Request body is missing");
    }

    const fieldError = VehicleValidationService.validateFields(httpRequest.body);
    if (fieldError) return badRequest(fieldError);

    const yearError = VehicleValidationService.validateYear(httpRequest.body.year);
    if (yearError) return badRequest(yearError);

    const mileageError = VehicleValidationService.validateMileage(httpRequest.body.mileage);
    if (mileageError) return badRequest(mileageError);

    const uniqueError = await this.vehicleValidationService.checkLicensePlateUnique(httpRequest.body.licensePlate);
    if (uniqueError) return badRequest(uniqueError);

    try {
      const vehicle = await this.createVehicleRepository.createVehicle(httpRequest.body);
      return created(vehicle);
    } catch (error) {
      return serverError();
    }
  }
}
