import https from "https";
import chalk from "chalk";

const getJoke = () => {
  const url = "https://official-joke-api.appspot.com/random_joke";

  https.get(url, (response) => {
    let data = "";
    response.on("data", (chunk) => {
      data += chunk;
    });
    response.on("end", () => {
      const joke = JSON.parse(data);
      console.log(chalk.greenBright(`\nHere is a random "${joke.type}" joke: `));
      console.log(chalk.redBright(`${joke.id}. ${joke.setup}`));
      console.log(chalk.magentaBright.bold("Punchline :",joke.punchline));
    });
    response.on('error', (err)=>{
      console.log(chalk.redBright("Error fetching the joke", err.message));
    })
  });
};
getJoke();