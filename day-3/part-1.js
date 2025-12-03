import { readFileSync } from "node:fs";

const dataFile = readFileSync("day-3/input.txt", "utf-8");
const batteryRows = dataFile.split("\n");

function maxJoltage(batteryRow) {
  const joltages = batteryRow.split("").map((joltage) => parseInt(joltage));
  const maxTens = highestInArray(joltages.slice(0, -1));
  const highestIndex = joltages.findIndex((joltage) => joltage === maxTens);
  const maxUnit = highestInArray(joltages.slice(highestIndex + 1));
  return maxTens * 10 + maxUnit;
}

function highestInArray(arr) {
  return arr.sort((a, b) => b - a)[0];
}

const sum = batteryRows.map(maxJoltage).reduce((acc, curr) => acc + curr, 0);
console.log("Max joltage", sum);
