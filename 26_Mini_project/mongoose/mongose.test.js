// Step 1. Mongoose with express setup, Schema, model and data insert
import mongoose from "mongoose";
import chalk from "chalk";

try {
  // connect mongodb://localhost server and create db: mongoose_database
  await mongoose.connect("mongodb://localhost:27017/mongoose_database");
  console.log(chalk.greenBright("\nMongoDb Connect\n"))
  mongoose.set("debug", true);
} catch (error) {
  console.error(chalk.redBright(error));
  process.exit();
}

// Step 2. Creae schema
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true, min: 6 },
  createdAt: { type: Date, default: Date.now },
});

// Step 3. Creating a model
const Users = mongoose.model("user", userSchema);

// Step 4. Create User for adding to DB && close connection
await Users.create({ name: "Sagar", age: 25, email: "sagartupvire@gmail.com" });
console.log(chalk.greenBright("\nNew User Add."))

await mongoose.connection.close();