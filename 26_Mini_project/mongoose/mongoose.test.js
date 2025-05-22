// Step 1️⃣. Mongoose with express setup, Schema, model and data insert
import mongoose from "mongoose";
import chalk from "chalk";


try {
  // connect mongodb server and create mongoose_database db
  await mongoose.connect("mongodb://localhost:27017/mongoose_database");
  console.log(chalk.greenBright("\n✅ MongoDb Connect...\n"));
  mongoose.set("debug", true);
} catch (error) {
  console.error(chalk.redBright(error));
  process.exit();
}


// Step 2️⃣. Creae schema
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true, min: 6 },
  },
  {
    timestamps: true, // Use this instead of createdAt and updatedAt
  }
);


// Step 3️⃣. Creating a model
const Users = mongoose.model("user", userSchema);




// Step 4️⃣. CRUD
// 🟥 Insert
// 🟢 Create Single user
// const user = await Users.create({ name: "prakash", age: 25, email: "prakashtupvire@gmail.com" });
// console.log(user);
// 🟢 Create multiple user
// const users = await Users.create([
//   { name: "sachin", age: 25, email: "sachintupvire@gmail.com" },
//   { name: "sarla", age: 25, email: "sarla@gmail.com" }
// ]);
// console.log(users);

// 🟥 Read
// 🟢 Read Single user
// const user = await Users.findOne({ name:'prakash' });
// console.log(user);
// 🟢 Read All user
// const users = await Users.find();
// console.log(users);

// 🟥 Update
// 🟢 Update Single user
// const user = await Users.updateOne(
//   {name:"prakash"},
//   {$set:{name:"prakash pacharne", age: 29, email: "prkashpach@gmail.com" }}
// );
// console.log(user);
// 🟢 Update many user
// const users = await Users.updateMany(
//   { age: 25 },
//   { $set: { age: 23 } },
// );
// console.log(users);

// 🟥 Delete
// 🟢 Delete Single user
// const user = await Users.deleteOne({ name: "Sachin" });
// console.log(user);
// 🟢 Delete many user
// const users = await Users.deleteMany({ age: 23 });
// console.log(users);



// 5️⃣. Close connection
await mongoose.connection.close();