import { Vehicle } from "../../models/vehicle";

export interface IGetVehiclesRepository {
  getVehicles(): Promise<Vehicle[]>;
  checkLicensePlateUnique(licensePlate: string): Promise<boolean>;
  checkLicensePlateUniqueExceptCurrent(licensePlate: string, id: string): Promise<boolean>;
}
