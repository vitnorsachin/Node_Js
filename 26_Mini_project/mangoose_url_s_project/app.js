import chalk from "chalk";
import express from "express";
import { shortenerRoutes } from "./routes/shortner.routes.js";
import { connectDB } from "./config/db-client.js";

const app = express();
const PORT = 3001;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(shortenerRoutes);

try {
  // Step 3️⃣. Call connectDB() here
  await connectDB();
  app.listen(PORT, () => {
    console.log(
      chalk.greenBright(`Server running at: 🟢 http://localhost:${PORT} 🏃🏃🏃`)
    );
  });
} catch (error) {
  console.error(error);
}