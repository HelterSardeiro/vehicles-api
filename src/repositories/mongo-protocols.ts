import { Vehicle } from "../models/vehicle";

export type MongoVehicle = Omit<Vehicle, "id">;
