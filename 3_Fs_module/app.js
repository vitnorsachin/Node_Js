const fs = require("fs");
const path = require("path");

const filename = "test.txt";
const filepath = path.join(__dirname, filename);

// fs.writeFileSync(filename, "This is the initial data", "utf-8");

// const fileContent = fs.readFileSync(filepath, "utf-8");
// console.log(fileContent);

// fs.appendFileSync(
//   filepath,
//   "\nThis data add in new line which using appendFileSync method."
// );

// fs.unlinkSync(filepath);