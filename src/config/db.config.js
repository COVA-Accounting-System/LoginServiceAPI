import mongoose from "mongoose";

try {
  const db = await mongoose.connect(
    `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@authentication-api.6mso7s4.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
  );
  console.log(`Database is connected to ${db.connection.name}`);
} catch (error) {
  console.log(error);
}
