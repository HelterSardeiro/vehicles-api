import { ObjectId } from "mongodb";

import { IDeleteVehicleRepository } from "../../controllers/delete-vehicle/protocols";
import { MongoClient } from "../../database/mongo";
import { Vehicle } from "../../models/vehicle";
import { MongoVehicle } from "../mongo-protocols";

export class MongoDeleteVehicleRepository implements IDeleteVehicleRepository {
  async deleteVehicle(id: string): Promise<Vehicle> {
    const vehicle = await MongoClient.db
      .collection<MongoVehicle>("vehicles")
      .findOne({ _id: new ObjectId(id) });

    if (!vehicle) {
      throw new Error("Vehicle not found");
    }

    const { deletedCount } = await MongoClient.db
      .collection("vehicles")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      throw new Error("Vehicle not deleted");
    }

    const { _id, ...rest } = vehicle;

    return { id: _id.toHexString(), ...rest };
  }
}
