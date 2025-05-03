import chalk from "chalk";

console.log(chalk.green("Successfull..!"));
console.log(chalk.red("Error Occur..!"));
console.log(chalk.yellow("Warnings..!"));
console.log(chalk.blue("Information Message..!"));
console.log(chalk.magenta("Sachin Vitnor..!"));

const hello = () =>
  console.log(
    chalk.greenBright("\nFunction:"),
    chalk.magentaBright("Hello Sachin Vitnor")
  );
hello();