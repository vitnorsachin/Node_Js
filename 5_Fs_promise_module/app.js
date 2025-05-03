const fs = require("fs/promises");

// const fs = require("fs");
// const path = require("path");

// const fileName = "text.txt";
// const filePath = path.join(__dirname, fileName);

// fs.promises
//   .readdir(__dirname)
//   .then((data) => console.log(data))
//   .catch((err) => console.error(err));

// const file = path.join(__dirname, "src");
// fs.readdir(file)
//   .then((data) => console.log(data))
//   .catch((err) => console.error(err));

// fs.writeFile("text3.txt", "This file create using new version", "utf-8")
//   .then(() => console.log("File has been created"))
//   .catch((err) => console.error(err));

// fs.readFile("test.txt", "utf-8")
//   .then((data) => console.log(data))
//   .catch((err) => console.error(err));

// fs.appendFile("test.txt", "\nAnd study on aws servises", "utf-8")
//   .then(() => console.log("New data is append"))
//   .catch((error) => console.error(error));

fs.unlink("test.txt")
  .then(() => console.log("File deleted successfully"))
  .catch((err) => console.error(err));
