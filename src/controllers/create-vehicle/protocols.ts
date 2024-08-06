import { Vehicle } from "../../models/vehicle";

export interface CreateVehicleParams {
  licensePlate: string;
  make: string;
  model: string;
  year: string;
  mileage: number;
}

export interface ICreateVehicleRepository {
  createVehicle(params: CreateVehicleParams): Promise<Vehicle>;
}
