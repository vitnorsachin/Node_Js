import chalk from "chalk";
import express from "express";
import { shortenerRoutes } from "./routes/shortner.routes.js";
// import { connectDB } from "./config/db-client.js";
// import { env } from "./config/env.js";

const app = express();
const PORT = 3001;
// const PORT = env.PORT;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(shortenerRoutes);

try {
  // await connectDB();
  app.listen(PORT, () => {
    console.log(
      chalk.greenBright(`Server running at : http://localhost:${PORT} 🏃🏃🏃`)
    );
  });
} catch (error) {
  console.error(error);
}