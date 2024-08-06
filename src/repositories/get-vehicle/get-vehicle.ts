import { ObjectId } from "mongodb";

import { IGetVehicleRepository } from "../../controllers/get-vehicle/protocols";
import { MongoClient } from "../../database/mongo";
import { Vehicle } from "../../models/vehicle";
import { MongoVehicle } from "../mongo-protocols";

export class MongoGetVehicleRepository implements IGetVehicleRepository {

  async getVehicleByID(id: string): Promise<Vehicle | null> {
    try {
      const vehicle = await MongoClient.db
        .collection<MongoVehicle>("vehicles").findOne({
          _id: new ObjectId(id)
        });

      if (!vehicle) {
        console.log(`No vehicle found with id: ${id}`);
        return null;  // or throw new Error("Vehicle not found");
      }

      console.log(`Vehicle retrieved successfully: ${id}`);
      return { ...vehicle, id: vehicle._id.toHexString() };
    } catch (error) {
      console.error('Error retrieving vehicle by ID: ', error);
      throw new Error('Database operation failed');
    }
  }
  // async checkLicensePlateUnique(licensePlate: string): Promise<boolean> {
  //   try {
  //     const vehicle = await MongoClient.db
  //       .collection<MongoVehicle>("vehicle")
  //       .findOne({ licensePlate });

  //     return !vehicle;
  //   } catch (error) {
  //     console.error('Error checking unique license plate: ', error);
  //     throw new Error('Database operation failed');
  //   }
  // }
  // async checkLicensePlateUniqueExceptCurrent(licensePlate: string, id: string): Promise<boolean> {
  //   try {
  //     const vehicle = await MongoClient.db
  //       .collection<MongoVehicle>("vehicle").findOne({
  //         licensePlate: licensePlate,
  //         _id: { $ne: new ObjectId(id) }
  //       });
  //     return !vehicle;
  //   } catch (error) {
  //     console.error('Error checking unique license plate: ', error);
  //     throw new Error('Database operation failed');
  //   }
  // }
}
