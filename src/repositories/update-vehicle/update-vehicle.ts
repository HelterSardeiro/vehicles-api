import { ObjectId } from "mongodb";

import {
  IUpdateVehicleRepository,
  UpdateVehicleParams,
} from "../../controllers/update-vehicle/protocols";
import { MongoClient } from "../../database/mongo";
import { Vehicle } from "../../models/vehicle";
import { MongoVehicle } from "../mongo-protocols";

export class MongoUpdateVehicleRepository implements IUpdateVehicleRepository {
  async updateVehicle(id: string, params: UpdateVehicleParams): Promise<Vehicle> {
    await MongoClient.db.collection("vehicles").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...params,
        },
      }
    );

    const vehicle = await MongoClient.db
      .collection<MongoVehicle>("vehicles")
      .findOne({ _id: new ObjectId(id) });

    if (!vehicle) {
      throw new Error("Vehicle not updated");
    }

    const { _id, ...rest } = vehicle;

    return { id: _id.toHexString(), ...rest };
  }
}
