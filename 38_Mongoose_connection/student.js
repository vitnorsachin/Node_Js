import mongoose from "mongoose";
import chalk from "chalk";


// Step 1. make connection and create practice DB
try {
  await mongoose.connect("mongodb://localhost:27017/practice"); 
  console.log(chalk.greenBright("\nMongoDb connection..!\n"));
  // mongoose.set("debug", (Student, method, query, doc) => {
  //   console.log("Collection Name:", Student);  // This is for debuging of mongoose && mongodb
  //   console.log("Method:", method);
  //   console.log("Query:", query);
  //   console.log("Document:", JSON.stringify(doc));
  // });
} catch (error) {
  console.error(error);
}


// Step 2. create schema
const studentSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true }, 
  age: { type: Number, required: true, min: 18, max: 30 },
  createAt: { type: Date, default: Date.now },
});


// Step 3. create model
const Student = mongoose.model("student", studentSchema); 


// Step 4. create user
await Student.create({ name: "Sachin", age: 23 }); 
console.log(chalk.green("Student create & add\n"));


// Step 5. find user (It all student Data)
const student = await Student.find({});
console.log("<---Student Data--->");
student.map(({ _id, name, age, createAt }) => {
  console.log("Created At:", createAt);
  console.log(`Id: "${_id}"`);
  console.log("Name:", name, "Age:", age, "\n");
});


// Step 6. Close connection
await mongoose.connection.close();