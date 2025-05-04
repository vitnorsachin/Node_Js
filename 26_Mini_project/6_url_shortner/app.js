import chalk from "chalk";
import express from "express";
import { shortenerRoutes } from "./routes/shortner.routes.js";

const app = express();
const PORT = 3001;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(shortenerRoutes);

app.listen(PORT, () => {
  console.log(chalk.greenBright(`Server running at : http://localhost:${PORT}`));
});