import { Vehicle } from "../../models/vehicle";

export interface IGetVehicleRepository {
  getVehicleByID(id: string): Promise<Vehicle | null>; 
}
