const fs = require("fs");
const path = require("path");

const fileName = "test.txt";
const filePath = path.join(__dirname, fileName);

console.log("Start");

// fs.writeFile(filePath, "The Hello world sachin", "utf-8", (err) => {
//   if (err) console.error(err);
//   else console.log("file has been saved");
// });

// fs.readFile(filePath, "utf-8", (err, data) => {
//   if (data) console.log(data);
//   else console.log(err);
// });

// fs.appendFile(filePath, "\nUpdated The Hello world sachin", "utf-8", (err) => {
//   if (err) console.error(err);
//   else console.log("file has been saved");
// });

fs.unlink(filePath, (err) => {
  if (err) console.error(err);
  else console.log("File has been Deleted");
});

console.log("End");