import { Vehicle } from "../../models/vehicle";
import { badRequest, ok, notFound } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IDeleteVehicleRepository } from "./protocols";

export class DeleteVehicleController implements IController {
  constructor(private readonly deleteVehicleRepository: IDeleteVehicleRepository) {}

  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<Vehicle | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing vehicle id");
      }

      const vehicle = await this.deleteVehicleRepository.deleteVehicle(id);

      return ok<Vehicle>(vehicle);
    } catch (error) {
      return notFound("Vehicle Not Found");
    }
  }
}
