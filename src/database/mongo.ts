import { MongoClient as Mongo, Db, ServerApiVersion  } from "mongodb";

export const MongoClient = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    const url = process.env.MONGO_URI || "mongodb://localhost:27017";

    try {
      const client = new Mongo(url, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
      await client.connect();
      const db = client.db("vehicles-db");

      this.client = client;
      this.db = db;

      console.log("Connected to MongoDB!");
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
      throw error;
    }
  },
};
