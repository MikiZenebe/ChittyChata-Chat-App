import mongoose from "mongoose";

const connectDB = async function () {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to Database");
    });

    connection.on("error", (error) => {
      console.log("Something is wrong in mongoDB", error);
    });
  } catch (error) {
    console.log("Something is wrong", error);
  }
};

export default connectDB;
