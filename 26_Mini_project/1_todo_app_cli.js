import readline from "readline";
import chalk from "chalk";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const todos = [];

const showMenu = () => {
  console.log(chalk.greenBright("\n1: Add a Task"));
  console.log(chalk.greenBright("2: View Task"));
  console.log(chalk.greenBright("3: Exit"));
  rl.question(chalk.yellowBright("Choose an option: "), handleInput);
};

const handleInput = (option) => {
  if (option === "1") {
    rl.question("Enter the Task: ", (task) => {
      todos.push(task);
      console.log(chalk.green("Task added: "), chalk.blueBright(task));
      showMenu();
    });
  } else if (option === "2") {
    console.log(chalk.magenta("\nYour Todo Lists"));
    todos.forEach((task, index) => {
      console.log(chalk.blueBright(`${index + 1}. ${task}.`));
    });
    showMenu();
  } else if (option === "3") {
    console.log(chalk.magenta("Good Bye..!"));
    rl.close();
  } else {
    console.log(chalk.redBright("Invalid Option. Please select Valid Option"));
    showMenu();
  }
};

showMenu();