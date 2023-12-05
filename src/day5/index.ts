// @ts-nocheck

import * as path from "path";
import { parseInput } from "../util";
const input = parseInput(path.join(__dirname, "input.txt"), { split: { delimiter: '\n\n', mapper: false } });


function mappingByRange(maps, ranges) {
  const newRanges = [];

  // loop through each mapping and calculate the new ranges
  // rangeOverlapStart is the max of the start of the range and the source of the mapping
  // rangeOverlapEnd is the min of the end of the range and the source + length of the mapping

  maps.forEach((item) => {
    const { destination, source, length } = item;
    
    const rangeOverlapStart = Math.max(ranges.start, source);
    const rangeOverlapEnd = Math.min(ranges.end, source + length);

    // if rangeOverlapStart < rangeOverlapEnd, then there is an overlap
    // between the source and the destination
    // calculate the new range and add it to the result
    if (rangeOverlapStart < rangeOverlapEnd) { 
      const item = {
        start: destination + (rangeOverlapStart - source),
        end: destination + (rangeOverlapEnd - source)
      }

      newRanges.push(item);
    }
  });


  return newRanges.length === 0 ? [ranges] : newRanges;
}

function checkMinLocation(data: string[]) {
  const seeds = data[0].split(':')[1].split(' ').filter(s => s).map(Number);
  let ranges = [];

  for (let i = 0; i < seeds.length; i += 2) {
    ranges.push({ start: seeds[i], end: seeds[i] + seeds[i + 1] });
  }

  const mappings = data.slice(1).reduce((acc, item) => {
    const lines = item.split('\n').filter(s => s).slice(1);
    const map = lines.map(line => {
      const [destination, source, length] = line.split(' ').map(Number);
      return { destination, source, length };
    });
    acc.push(map);
    return acc;
  }, []);

  mappings.forEach(m => {
    ranges = ranges.flatMap(range => mappingByRange(m, range));
  });

  return ranges.reduce((min, range) => Math.min(min, range.start), Number.MAX_SAFE_INTEGER);
}

function main() {
  const result = checkMinLocation(input);
  console.log(result);
  return result;
}

export default main();