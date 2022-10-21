import mongoose from "mongoose";
import { config } from "dotenv";
config();

try {
  const db = await mongoose.connect(
    `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@acsys.whd9p61.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority&ssl=true`
     // `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ac-zzbedaa-shard-00-00.whd9p61.mongodb.net:27017,ac-zzbedaa-shard-00-01.whd9p61.mongodb.net:27017,ac-zzbedaa-shard-00-02.whd9p61.mongodb.net:27017/${process.env.DATABASE_NAME}?ssl=true&replicaSet=atlas-fkmmc5-shard-0&authSource=admin&retryWrites=true&w=majority`
  );
  console.log(`Database is connected to ${db.connection.name}`);
} catch (error) {
  console.log(error);
}
