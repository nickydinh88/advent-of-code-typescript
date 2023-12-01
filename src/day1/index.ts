import * as path from "path";
import { parseInput, replaceWordWithNumber } from "../util";

const input = parseInput(path.join(__dirname, "input.txt"), ({ split: { mapper: (n) => replaceWordWithNumber(n) } }));


// function extract digits and join the first and last digits to form a number
function extractAndJoinDigits(inputString: string) : number {
  // Using regular expression to extract digits
  let digits = inputString.match(/\d/g);

  if (digits) {
    // Extracting first and last digits
    let firstDigit = digits[0];
    let lastDigit = digits[digits.length - 1];

    return Number(firstDigit + lastDigit) ;
  } else {
    return 0;
  }
}


function main() {
  const result = input.reduce((acc, curr) => acc + extractAndJoinDigits(curr), 0);

  console.log(input);
  
  return result;
}

export default main();
