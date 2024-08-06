import { Vehicle } from "../../models/vehicle";
import { ok, badRequest, notFound, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IGetVehicleRepository } from "./protocols";

export class GetVehicleController implements IController {
  constructor(private readonly getVehicleRepository: IGetVehicleRepository) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Vehicle | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing vehicle id");
      }
      const vehicle = await this.getVehicleRepository.getVehicleByID(id);
      return vehicle ? ok<Vehicle>(vehicle) : notFound('Vehicle Not Found');
    } catch (error) {
      return serverError();
    }
  }
}
