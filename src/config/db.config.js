import mongoose from "mongoose";
import { config } from "dotenv";
config();

try {
  const db = await mongoose.connect(
    `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.l3bsi0m.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
  );
  console.log(`Database is connected to ${db.connection.name}`);
} catch (error) {
  console.log(error);
}
