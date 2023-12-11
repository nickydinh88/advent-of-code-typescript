// @ts-nocheck

import * as path from "path";
import { parseInput } from "../util";

const input = parseInput(path.join(__dirname, "input.txt"), { split: { delimiter: '\n', mapper: false } });

function main() {
  return 0;
}

const instructions = 'LRRLRRRLRRLLLRLLRRLRRLLRRRLRRLLRLRRRLRLRRLRLRRRLRLRLRRLLRLRLRRLRRRLRRRLRRRLRLRRLLLLRLLRLLRRLRRRLLLRLRRRLRLRRRLRLRRLRRRLRRRLRLRLLRRRLLRLLRLRLRLRLLRRLRRLRRRLRRLRLRLRLRLRRLRRRLLRRRLLRLLLRRRLLRRRLRRRLRRLRLRRLRLLRRLLRRLRLRLRRLRLRRLLRRRLLRRRLLRLRRRLRLRRRLRLRRRLRRRLRRLRRLRRLLRRRLRRRLLLRRRR';

const network = {};

input.forEach(line => {
  const [node, values] = line.split(' = ');
  const [left, right] = values.replace(/[()]/g, '').split(', ');
  network[node.trim()] = [left.trim(), right.trim()];
});

function stepsToZ(instructions, network) {
  const nodesEndingWithZ = new Set(Object.keys(network).filter(node => node.endsWith('Z')));
  let currentNodes = new Set(Object.keys(network).filter(node => node.endsWith('A')));
  let steps = 0;

  while (![...currentNodes].every(node => nodesEndingWithZ.has(node))) {
    let nextNodes = new Set();

    for (let node of currentNodes) {
      const nextNode = network[node][instructions[steps % instructions.length] === 'L' ? 0 : 1];
      if (nextNode) {
        nextNodes.add(nextNode);
      }
    }

    if (nextNodes.size === 0) {
      // No reachable nodes from current configuration, exiting loop
      break;
    }

    currentNodes = nextNodes;
    steps++;
  }

  return steps;
}

const instructions2 = 'LR';

const network2 = {
  '11A': ['11B', 'XXX'],
  '11B': ['XXX', '11Z'],
  '11Z': ['11B', 'XXX'],
  '22A': ['22B', 'XXX'],
  '22B': ['22C', '22C'],
  '22C': ['22Z', '22Z'],
  '22Z': ['22B', '22B'],
  'XXX': ['XXX', 'XXX'],
};

console.log(stepsToZ(instructions2, network2)); // Outputs: 6

export default main();
