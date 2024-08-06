import {
  CreateVehicleParams,
  ICreateVehicleRepository,
} from "../../controllers/create-vehicle/protocols";
import { MongoClient } from "../../database/mongo";
import { Vehicle } from "../../models/vehicle";
import { MongoVehicle } from "../mongo-protocols";

export class MongoCreateVehicleRepository implements ICreateVehicleRepository {
  async createVehicle(params: CreateVehicleParams): Promise<Vehicle> {
    const { insertedId } = await MongoClient.db
      .collection("vehicles")
      .insertOne(params);

    const vehicle = await MongoClient.db
      .collection<MongoVehicle>("vehicles")
      .findOne({ _id: insertedId });

    if (!vehicle) {
      throw new Error("Vehicle not created");
    }

    const { _id, ...rest } = vehicle;

    return { id: _id.toHexString(), ...rest };
  }
}
