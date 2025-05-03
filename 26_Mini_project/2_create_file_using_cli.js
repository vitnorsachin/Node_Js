import readline from "readline";
import fs from "fs/promises";
import chalk from "chalk";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(chalk.magentaBright("\nEnter FileName : "), (filename) => {
  rl.question(chalk.magentaBright("Enter file data : "), (filecontent) => {
    (async () => {
      try {
        await fs.writeFile(filename, filecontent, "utf-8");
        console.log(chalk.greenBright(`\nFile "${filename}" is created Successfully...`));
      } catch (error) {
        console.error(error);
      }
    })();
    rl.close();
  });
});