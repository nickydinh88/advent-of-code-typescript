// @ts-nocheck
import * as path from "path";
import { parseInput } from "../util";

const input = parseInput(path.join(__dirname, "input.txt"), { split: { delimiter: '\n', mapper: false } });

function calculateWaysToWin(time, distance) {
  let ways = 0;
  for (let i = 1; i < time; i++) {
      if (i * (time - i) > distance) {
          ways++;
      }
  }
  return ways;
}

function calculateTotalWays(races) {
  return races.reduce((total, race) => total * calculateWaysToWin(race.time, race.distance), 1);
}

let races = [
  { time: 57, distance: 291 },
  { time: 72, distance: 1172 },
  { time: 69, distance: 1176 },
  { time: 92, distance: 2026 }
];

console.log(calculateTotalWays(races)); // Outputs: 288

function main() {
  console.log(input);
  return 0;
}

export default main();
