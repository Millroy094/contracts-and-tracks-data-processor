import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

class InMemoryMongoDb {
  static mongod: MongoMemoryServer;

  static async connect() {
    InMemoryMongoDb.mongod = await MongoMemoryServer.create();
    const uri = InMemoryMongoDb.mongod.getUri();

    await mongoose.connect(uri);
  }

  static async closeDatabase() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await InMemoryMongoDb.mongod.stop();
  }

  static async clearDatabase() {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany();
    }
  }
}

export default InMemoryMongoDb;
