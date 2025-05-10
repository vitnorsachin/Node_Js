import mongoose from "mongoose";
import chalk from "chalk";

try {
  await mongoose.connect("mongodb://localhost:27017/mongoose_middleware");
  console.log(chalk.magentaBright("MongoDb connected..!"));
  mongoose.set("debug", true);
} catch (error) {
  console.error(error);
  process.exit();
}

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
  },
  {
    timestamps: true, // Use this instead of createdAt and updatedAt
  }
);

const Users = mongoose.model("user", userSchema);

// await Users.create({name: "Sachin", email: "vitnorsach@gmail.com", age: 23 });
await Users.updateOne({ email: "vitnorsach@gmail.com" }, { $set: { age: 23 } });
await mongoose.connection.close();
