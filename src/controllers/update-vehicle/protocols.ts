import { Vehicle } from "../../models/vehicle";

export interface UpdateVehicleParams {
  licensePlate?: string;
  make?: string;
  model?: string;
  year?: string;
  mileage?: number;
}

export interface IUpdateVehicleRepository {
  updateVehicle(id: string, params: UpdateVehicleParams): Promise<Vehicle>;
}
