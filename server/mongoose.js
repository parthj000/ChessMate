import mongoose from "mongoose";
async function connectDb() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017");
  } catch (err) {
    console.log(err.message);
  }
  console.log("Database running");
}

export { connectDb };
