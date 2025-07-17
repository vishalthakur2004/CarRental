import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.log(
        "Warning: MONGODB_URI not found. Database features will be disabled.",
      );
      return;
    }

    mongoose.connection.on("connected", () =>
      console.log("Database Connected"),
    );
    mongoose.connection.on("error", (err) =>
      console.log("Database connection error:", err.message),
    );
    mongoose.connection.on("disconnected", () =>
      console.log("Database disconnected"),
    );

    await mongoose.connect(`${process.env.MONGODB_URI}/car-rental`);
  } catch (error) {
    console.log("Database connection failed:", error.message);
    console.log("Continuing without database connection...");
  }
};

export default connectDB;
