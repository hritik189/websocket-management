import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI, {
        dbName: "websocket_DB",
      })
      .then((data) => {
        console.log(`Database connected with ${data.connection.name} `);
      });
  } catch (error) {
    console.error(`Error connecting to the database: ${error.message}`);
    setTimeout(dbConnect, 5000);
  }
};

export default connectDB