// Server create using Express.js
import express from "express";

const app = express();
const PORT = 3001;

app.get("/", (req, res) => {
  res.send("Home Page My name is Sachin");
});

app.get("/contact", (req, res) => {
  res.send("Contact Page");
});

app.listen(PORT, () => {
  console.log("Server running at PORT:", PORT);
});