// @ts-nocheck

import * as path from "path";
import { parseInput } from "../util";

const input = parseInput(path.join(__dirname, "input.txt"), { split: false });

function main() {
  //console.log(input);
  return 0;
}

export default main();

export function part1(input: string): number {
  const { moves, map } = parse(input)
  return countSteps('AAA', moves, map)
}

export function countSteps(pos: string, moves: string[], map: Map<string, string[]>): number {
  for (let i = 0; ; i++) {
      const m = moves[i % moves.length]
      pos = map.get(pos)![m === 'L' ? 0 : 1]
      if (pos.endsWith('Z')) {
          return i + 1
      }
  }
}

export function parse(): { moves: string[]; map: Map<string, string[]> } {
  const [moves_, map_] = input.replaceAll(/= \(|,|\)/g, '').split('\n\n')
  const moves = moves_.split('')
  const map = new Map(map_.split('\n').map(l => l.split(' ')).map(l => [l[0], l.slice(1)]))

  return { moves, map }
}

export function part2(input: string): number {
  const { moves, map } = parse(input)
  return [...map.keys()].filter(k => k.endsWith('A'))
      .map(p => countSteps(p, moves, map))
      .reduce((a, b) => leastCommonMultiple(a, b), 1)
}

export function leastCommonMultiple(a: number, b: number): number {
  return (a * b) / greatestCommonDivisor(a, b);
}

export function greatestCommonDivisor(a: number, b: number): number {
  return !b ? a : greatestCommonDivisor(b, a % b);
}

console.log(part2())