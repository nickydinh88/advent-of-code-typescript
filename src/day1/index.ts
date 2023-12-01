import * as path from "path";
import { parseInput, replaceWordWithNumber } from "../util";

const input = parseInput(path.join(__dirname, "input.txt"), ({ split: { mapper: (n) => replaceWordWithNumber(n) } }));


// function extract digits and join the first and last digits to form a number
function extractAndJoinDigits(inputString: string) {
  let firstDigit = '';
  let lastDigit = '';

  // Finding the first digit
  for (let i = 0; i < inputString.length; i++) {
    if (!isNaN(parseInt(inputString[i]))) {
      firstDigit = inputString[i];
      break;
    }
  }

  // Finding the last digit
  for (let i = inputString.length - 1; i >= 0; i--) {
    if (!isNaN(parseInt(inputString[i]))) {
      lastDigit = inputString[i];
      break;
    }
  }

  // Joining the first and last digits to form a number
  return parseInt(firstDigit + lastDigit);
}


function main() {
  const result = input.reduce((acc, curr) => acc + extractAndJoinDigits(curr), 0);

  console.log(input);
  
  return result;
}

export default main();
