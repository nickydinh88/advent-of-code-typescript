// @ts-nocheck

import * as path from "path";
import { parseInput } from "../util";

const input = parseInput(path.join(__dirname, "input.txt"), { split: { delimiter: '\n', mapper: false } });

function main() {
  return 0;
}


function stepsToZZZ(instructions, network) {
  let steps = 0;
  let currentNode = 'AAA';
  while (true) {
    for (let instruction of instructions) {
      currentNode = network[currentNode][instruction === 'L' ? 0 : 1];
      steps++;
      if (currentNode === 'ZZZ') {
        return steps;
      }
    }
  }
}

const instructions = 'LRRLRRRLRRLLLRLLRRLRRLLRRRLRRLLRLRRRLRLRRLRLRRRLRLRLRRLLRLRLRRLRRRLRRRLRRRLRLRRLLLLRLLRLLRRLRRRLLLRLRRRLRLRRRLRLRRLRRRLRRRLRLRLLRRRLLRLLRLRLRLRLLRRLRRLRRRLRRLRLRLRLRLRRLRRRLLRRRLLRLLLRRRLLRRRLRRRLRRLRLRRLRLLRRLLRRLRLRLRRLRLRRLLRRRLLRRRLLRLRRRLRLRRRLRLRRRLRRRLRRLRRLRRLLRRRLRRRLLLRRRR';
const network1 = {
  'AAA': ['BBB', 'BBB'],
  'BBB': ['AAA', 'ZZZ'],
  'ZZZ': ['ZZZ', 'ZZZ'],
};

const network = {};

input.forEach(line => {
  const [node, values] = line.split(' = ');
  const [left, right] = values.replace(/[()]/g, '').split(', ');
  network[node.trim()] = [left.trim(), right.trim()];
});

console.log(network);

console.log(stepsToZZZ(instructions, network)); // Outputs: 6

export default main();
