import { readFileSync } from "node:fs";

const dataFile = readFileSync("day-5/input.txt", "utf-8");
const lines = dataFile.split("\n");
const dividingLine = lines.findIndex((line) => line === "");

const freshRanges = lines.slice(0, dividingLine).map((line) =>
  line
    .split("-")
    .map((num) => parseInt(num))
    .sort()
);

let rangeAggregates = [...freshRanges];
let aggregatedRun;

do {
  const newRangeAggregates = [];
  aggregatedRun = false;

  for (const range of rangeAggregates) {
    let aggregatedRow = false;
    for (const checkedRange of newRangeAggregates) {
      if (range[0] <= checkedRange[0] && range[1] >= checkedRange[1]) {
        checkedRange[0] = range[0];
        checkedRange[1] = range[1];
        aggregatedRow = true;
        break;
      } else if (range[0] <= checkedRange[0] && range[1] >= checkedRange[0]) {
        checkedRange[0] = range[0];
        aggregatedRow = true;
        break;
      } else if (range[1] >= checkedRange[1] && range[0] <= checkedRange[1]) {
        checkedRange[1] = range[1];
        aggregatedRow = true;
        break;
      } else if (range[0] >= checkedRange[0] && range[1] <= checkedRange[1]) {
        aggregatedRow = true;
        break;
      }
    }
    if (!aggregatedRow) {
      newRangeAggregates.push(range);
    } else {
      aggregatedRun = true;
    }
  }
  rangeAggregates = newRangeAggregates;
} while (aggregatedRun);

const totalRanges = rangeAggregates
  .map(([rangeStart, rangeEnd]) => 1 + rangeEnd - rangeStart)
  .reduce((acc, curr) => acc + curr, 0);

console.log("Total fresh ingredient IDs", totalRanges);
