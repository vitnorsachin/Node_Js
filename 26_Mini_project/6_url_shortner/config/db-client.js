// Database connection code

// 1️⃣. Using mongoDb as backend
// import { MongoClient } from "mongodb";
// import { env } from "./env.js";
// export const dbClient = new MongoClient(env.MONGODB_URL);

// 2️⃣. Using "mongoose" connect 'mongodb" backend
// import mongoose from "mongoose";
// import {env} from './env.js';
// export const connectDB = async () => {
//   try {
//     await mongoose.connect(env.MONGODB_URL)
//   } catch (error) {
//     console.error(error)
//   }
// }

// 3️⃣. Using "mysql" as backend
// import mysql from "mysql2/promise";
// import { env } from "./env.js";

// export const db = await mysql.createConnection({
//   host: env.DATABASE_HOST,
//   user: env.DATABASE_USER,
//   password: env.DATABASE_PASSWORD,
//   port: env.PORT,
//   database: env.DATABASE_NAME,
// });
// console.log("\nMySQL Connected Successfully ✅");