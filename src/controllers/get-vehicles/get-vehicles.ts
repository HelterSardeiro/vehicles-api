import { Vehicle } from "../../models/vehicle";
import { ok, serverError } from "../helpers";
import { HttpResponse, IController } from "../protocols";
import { IGetVehiclesRepository } from "./protocols";

export class GetVehiclesController implements IController {
  constructor(private readonly getVehiclesRepository: IGetVehiclesRepository) {}

  async handle(): Promise<HttpResponse<Vehicle[] | string>> {
    try {
      const vehicles = await this.getVehiclesRepository.getVehicles();

      return ok<Vehicle[]>(vehicles);
    } catch (error) {
      return serverError();
    }
  }
}
