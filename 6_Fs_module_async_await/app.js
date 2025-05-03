const fs = require("fs/promises");
const path = require("path");

// (async () => {
//   try {
//     const res = await fs.readdir(__dirname);
//     console.log(res);
//   } catch (error) {
//     console.error(error);
//   }
// })();

// (async () => {
//   try {
//     fs.writeFile("test.txt", "Hi, I am MERN Stack Developer", "utf-8");
//     console.log("File Created");
//   } catch (error) {
//     console.error(error);
//   }
// })();

// (async () => {
//   try {
//     console.log("File Data is: ")
//     console.log(await fs.readFile("test.txt", "utf-8"));
//   } catch (error) {
//     console.error(error);
//   }
// })();

// (async () => {
//   try {
//     await fs.appendFile("test.txt", "\nThis is new Info added", "utf-8");
//     console.log("File Updated");
//   } catch (error) {
//     console.error(error);
//   }
// })();

(async () => {
  try {
    await fs.unlink("test.txt");
    console.log("File Deleted..");
  } catch (error) {
    console.error("Error deleting file:", error);
  }
})();