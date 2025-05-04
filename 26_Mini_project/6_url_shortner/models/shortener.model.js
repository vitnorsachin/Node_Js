// models handle all database work and data logics

import { dbClient } from "../config/db-client.js";
import { env } from "../config/env.js";

const db = dbClient.db(env.MONGODB_DATABASE_NAME);
const shortenerCollection = db.collection("shorteners");

export const loadLinks = async () => {
  return shortenerCollection.find().toArray();
};

export const saveLinks = async (link) => { // ✅ Done
  return shortenerCollection.insertOne(link);
};

export const getLinkByShortCode = async (shortcode) => {
  return await shortenerCollection.findOne({ shortCode: shortcode });
};



// //import { readFile, writeFile } from "fs/promises";
// import path from "path";
// const DATA_FILE = path.join("data", "links.json");
// // Load links file data
// const loadLinks = async () => {
//   try {
//     const data = await readFile(DATA_FILE, "utf-8");
//     return JSON.parse(data);
//   } catch (error) {
//     if (error.code === "ENOENT") {
//       await writeFile(DATA_FILE, JSON.stringify({}));
//       return {};
//     }
//     throw error;
//   }
// };
// // Save data to links file
// const saveLinks = async (links) => {
//   await writeFile(DATA_FILE, JSON.stringify(links));
// };
// export { loadLinks, saveLinks };