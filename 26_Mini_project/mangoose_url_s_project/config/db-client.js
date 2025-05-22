// Step 2️⃣. Connection between mongodb, mongoose
// When use this way then don't need of env.js file & zod
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    console.error(error);
  }
};




// import mongoose from "mongoose";
// import { env } from "./env.js";

// export const connectDB = async () => {
//   try {
//     await mongoose.connect(env.MONGODB_URL);
//   } catch (error) {
//     console.error(error);
//   }
// };