// video No.40
// import express from "express";
// import chalk from "chalk";
// import { PORT } from "./env.js";

// const app = express();
// // const PORT = 3003;
// // const PORT = process.env.PORT || 3001;

// app.get("/", (req, res) => res.send("<h1>Hello world?</h1>"));

// app.get("/about", (req, res) => res.send("<h1>Hello About Page?</h1>"));

// app.get("/contact", (req, res) => {
//   return res.send(`
//     <div class="container">
//       <h1>URL Shortener</h1>
//       <form id="shorten-form">
//         <div>
//           <label for="url">Enter URL: </label>
//           <input type="url" name="url" id="url" required />
//         </div>
//         <div>
//           <label for="shortCode">Enter Short Code: </label>
//           <input type="text" name="shortCode" id="shortCode" required />
//         </div>
//         <button type="submit">Shorten</button>
//       </form>
//       <h2>Shortened URLs</h2>
//       <ul id="shortened-urls"></ul>
//     </div>`);
// });

// app.listen(PORT, () => {
//   console.log(
//     chalk.greenBright("Server is running at PORT:"),
//     chalk.magentaBright(PORT),
//     chalk.redBright(`: http://localhost:${PORT}`)
//   );
// });

// // video No.42
// import express from "express";
// import chalk from "chalk";
// import path from "path";

// const app = express();
// const PORT = process.env.PORT || 3001;

// console.log(import.meta.dirname)
// console.log(import.meta.filename)

// const staticPath = path.join(import.meta.dirname, "public");
// app.use("/public", express.static(staticPath)); // middleware

// app.get("/", (req, res) => {  // get Request
//   const homePagePath = path.join(import.meta.dirname, "public", "index.html");
//   res.sendFile(homePagePath);
// });

// app.listen(PORT, () => {
//   console.log(
//     chalk.greenBright("Server Running at PORT:", PORT),
//     chalk.bgMagentaBright(`: http://localhost:${PORT} `)
//   );
// });

// // 45. Route Parameter in Express.js | Dynamic Routes, URL Params & Handling
// import express from "express";
// const app = express();
// const PORT = 3005;
// app.get("/profile/:username", (req, res) => {
//   res.send(
//     `<h1>My name is <b>${req.params.username.toLocaleUpperCase()}</b></h1>`
//   );
// });
// app.get("/profile/:username/article/:slug", (req, res) => {
//   const formatedSlug = req.params.slug.replace(/-/g, " ").toca;
//   res.send(`<h1>Article ${req.params.username} by ${formatedSlug}</h1>`);
// });
// app.listen(PORT, () => console.log("Server is Running"));

// // 46. Query Parameter in Express | real examples
// import express from "express";
// const app = express();
// const PORT = 3005;

// app.get("/product/search", (req, res) => {
//   // console.log(req.query)
//   const product = Object.keys(req.query)[0];
//   const productName = req.query[product];
//   res.send(
//     `<p>User search for Product is
//       <b>${product ? product : ""}</b> and it's Name
//       <b>${productName ? productName : ""}</b>
//     </p>`
//   );
// });

// app.get("/product", (req, res) => {
//   // console.log(req.query.limit);
//   res.send(`Page:${req.query.page} && Limit:${req.query.limit}`);
// });

// app.listen(PORT, () => {
//   console.log("Server Running");
// });

// 47. Handle form submission in Express || Get & Post method
import express from "express";
import path from "path";
const app = express();
const PORT = 3005;

const staticPath = path.join(import.meta.dirname, "public");
app.use(express.static(staticPath));
app.use(express.urlencoded({ extended: true }));

// app.get("/contact", (req, res) => { // get data from form
//   console.log(req.query);
//   res.send("Data get")
// });

app.post("/contact", (req, res) => {  // get data from form
  console.log(req.body);
  res.send("Data Get ✅");
});

app.use((req, res) => {  // middleware for 404
  res
    .status(404)
    .sendFile(path.join(import.meta.dirname, "public", "404.html"));
});

app.listen(PORT, () => {
  console.log("Server Running");
});