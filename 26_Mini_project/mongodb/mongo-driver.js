import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1");
await client.connect();

const db = client.db("mongodb_nodejs_db");
const userCollection = db.collection("users");

// userCollection.insertOne({ name: "sachin Vitnor", age: 23 });

// userCollection.insertMany([
//   { name: "technicla", role: "user", age: 21 },
//   { name: "thapa", role: "user", age: 32 },
//   { name: "ganesh", role: "admin", age: 33 },
// ]);

// const userCursor = userCollection.find();
// console.log(userCursor);

// for await (const user of userCursor) {
//   console.log(user);
// }

// const userCursor = await userCollection.find().toArray();
// console.log(userCursor);

// const user = await userCollection.findOne({ name: "vinod" });
// console.log(userCursor);
// console.log(user._id.toHexString());

// update
// await userCollection.updateOne({ name: "thapa" }, { $set: { age: 30 } });

// delete
// await userCollection.deleteOne({ name: "thapa" });

const result = await userCollection.deleteMany({ name: "thapa technical" });
console.log(`${result.deletedCount} document deleted.`);