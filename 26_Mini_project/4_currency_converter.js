import https from "https";
import readline from "readline";
import chalk from "chalk";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const apiKey = "1eeccfb59edc61c8c944107e";
const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

const convertCurrency = (amount, rate) => {
  return (amount * rate).toFixed(2);
}

https.get(url, (response) => {
  let data="";
  response.on("data", (chunk) => {
    data += chunk;
  });
  response.on("end", () => {
    const rates = JSON.parse(data).converion_rates;
    rl.question("Enter the aount is USD:", (amount) => {
      rl.question("Enter the target currency (eg. INR, EUR, NPR): ",(currency) => {
          const rate = rates[currency.toUpperCase()];
          if(rate){
            console.log(`${amount} USD is approximately ${convertCurrency(amount, rate)} ${currency}`);
          } else{
            console.log('Invalid Currency Code');
          }
        }
      );
    });
  });
});
