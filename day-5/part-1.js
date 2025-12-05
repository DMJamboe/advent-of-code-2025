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
const ingredients = lines.slice(dividingLine).map((num) => parseInt(num));

let freshCount = 0;

for (const ingredient of ingredients) {
  for (const range of freshRanges) {
    if (ingredient >= range[0] && ingredient <= range[1]) {
      freshCount++;
      break;
    }
  }
}

console.log("Fresh ingredients", freshCount);
