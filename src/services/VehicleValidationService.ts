import { CreateVehicleParams } from "../controllers/create-vehicle/protocols";
import validator from "validator";
import { IGetVehiclesRepository } from "../controllers/get-vehicles/protocols";

export class VehicleValidationService {
    private static firstVehicleYear = parseInt(process.env.FIRST_VEHICLE || "1886");
    
    constructor(private readonly getVehiclesRepository: IGetVehiclesRepository) {}

    static validateFields(vehicle: CreateVehicleParams): string | null {
        const requiredFields = ["licensePlate", "make", "model", "year", "mileage"];
        for (const field of requiredFields) {
            if (vehicle[field as keyof CreateVehicleParams] == null) {
                return `Field ${field} is required`;
            }
        }
        return null;
    }

    static validateYear(year: string): string | null {
        const yearNumber = parseInt(year);
        const currentYear = new Date().getFullYear();
        if (isNaN(yearNumber) || !validator.isNumeric(year.toString())) {
            return "Invalid value for year";
        }
        if (yearNumber < this.firstVehicleYear || yearNumber > currentYear + 1) {
            return `Invalid vehicle year, must be between ${this.firstVehicleYear} and ${currentYear + 1}`;
        }
        return null;
    }

    static validateMileage(mileage: number): string | null {
        if (!Number.isFinite(mileage) || mileage < 0) {
            return "Mileage must be a non-negative number";
        }
        return null;
    }

    async checkLicensePlateUnique(licensePlate: string): Promise<string | null> {
        const isUnique = await this.getVehiclesRepository.checkLicensePlateUnique(licensePlate);
        if (!isUnique) {
            return "A vehicle with this license plate already exists.";
        }
        return null;
    }

    async checkLicensePlateUniqueExceptCurrent(licensePlate: string, id: string): Promise<string | null> {
        const isUnique = await this.getVehiclesRepository.checkLicensePlateUniqueExceptCurrent(licensePlate, id);
        if (!isUnique) {
            return "Another vehicle with this license plate already exists.";
        }
        return null;
    }

}
