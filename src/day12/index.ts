// @ts-nocheck

import * as path from "path";
import { parseInput, replaceWordWithNumber } from "../util";

const input = parseInput(path.join(__dirname, "input.txt"), ({ split: { mapper: (n) => (n) } }));

const str = `
...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`


function stringToGalaxies(input) {
  let height = 0;
  const galaxies  = [];

  for (const line of input) {
    [...line.matchAll(/#/g)].forEach(item => {
      galaxies.push({ row: height, col: item.index });
    });
    height++;
  }

  return { 
      height, 
      galaxies,
      width: input[0].length, 
  };
}

function part1() {
  const space = stringToGalaxies(input);

  // Create empty rows and columns from the spece.height and space.width
  // and fill them with true
  const emptyRows = Array(space.height).fill(true);
  const emptyCols = Array(space.width).fill(true);

  // Loop through the galaxies and set the emptyRows and emptyCols to false
  // if there is a galaxy in that row or column
  for (const galaxy of space.galaxies) {
      emptyRows[galaxy.row] = false;
      emptyCols[galaxy.col] = false;
  }

  function distance(p1, p2) {
    let r1 = Math.min(p1.row, p2.row), r2 = Math.max(p1.row, p2.row);
    let c1 = Math.min(p1.col, p2.col), c2 = Math.max(p1.col, p2.col);

    let result = (r2 - r1) + (c2 - c1);
    for (let r = r1; r < r2; r++) if (emptyRows[r]) result++;
    for (let c = c1; c < c2; c++) if (emptyCols[c]) result++;

    return result;
  }
  

 // Initialize an empty map to store the computed distances.
// Iterate over the galaxies array with two nested loops.
// For each pair of galaxies, check if the distance is already computed and stored in the map.
// If it is, add the stored distance to the total distance.
// If it's not, compute the distance, store it in the map, and add it to the total distance.

const distances = new Map();
let totalDistance = 0;
for (let i = 0; i < space.galaxies.length; i++) {
    for (let j = i + 1; j < space.galaxies.length; j++) {
        const p1 = space.galaxies[i];
        const p2 = space.galaxies[j];
        const key = `${p1.row},${p1.col},${p2.row},${p2.col}`;
        if (distances.has(key)) {
            totalDistance += distances.get(key);
        } else {
            const d = distance(p1, p2);
            distances.set(key, d);
            totalDistance += d;
        }
    }
}

  return totalDistance;
}

function part2() {
  const space = stringToGalaxies(input);

  // Create empty rows and columns from the spece.height and space.width
  // and fill them with true
  const emptyRows = Array(space.height).fill(true);
  const emptyCols = Array(space.width).fill(true);

  // Loop through the galaxies and set the emptyRows and emptyCols to false
  // if there is a galaxy in that row or column
  for (const galaxy of space.galaxies) {
      emptyRows[galaxy.row] = false;
      emptyCols[galaxy.col] = false;
  }

  function distance(p1, p2) {
      let r1 = Math.min(p1.row, p2.row), r2 = Math.max(p1.row, p2.row);
      let c1 = Math.min(p1.col, p2.col), c2 = Math.max(p1.col, p2.col);

      let result = (r2 - r1) + (c2 - c1);
      for (let r = r1; r < r2; r++) if (emptyRows[r]) result += 999_999;
      for (let c = c1; c < c2; c++) if (emptyCols[c]) result += 999_999;

      return result;
  }


// Initialize an empty map to store the computed distances.
// Iterate over the galaxies array with two nested loops.
// For each pair of galaxies, check if the distance is already computed and stored in the map.
// If it is, add the stored distance to the total distance.
// If it's not, compute the distance, store it in the map, and add it to the total distance.

const distances = new Map();
let totalDistance = 0;
for (let i = 0; i < space.galaxies.length; i++) {
    for (let j = i + 1; j < space.galaxies.length; j++) {
        const p1 = space.galaxies[i];
        const p2 = space.galaxies[j];
        const key = `${p1.row},${p1.col},${p2.row},${p2.col}`;
        if (distances.has(key)) {
            totalDistance += distances.get(key);
        } else {
            const d = distance(p1, p2);
            distances.set(key, d);
            totalDistance += d;
        }
    }
}

return totalDistance;
}

console.log(part1());

