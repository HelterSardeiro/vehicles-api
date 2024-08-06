import { Vehicle } from "../../models/vehicle";

export interface IDeleteVehicleRepository {
  deleteVehicle(id: string): Promise<Vehicle>;
}
