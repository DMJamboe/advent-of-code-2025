import { readFileSync } from "node:fs";

const JOLTAGE_DIGITS = 12;

const dataFile = readFileSync("day-3/input.txt", "utf-8");
const batteryRows = dataFile.split("\n");

function maxJoltage(batteryRow, numDigits) {
  let joltages = batteryRow.split("").map((joltage) => parseInt(joltage));
  const digits = [];

  for (let i = 1; i <= JOLTAGE_DIGITS; i++) {
    const maxDigit = highestInArray(
      joltages.slice(0, i - numDigits || undefined)
    );
    const highestIndex = joltages.findIndex((joltage) => joltage === maxDigit);
    digits.push(maxDigit);
    joltages = joltages.slice(highestIndex + 1);
  }

  return parseInt(digits.join(""));
}

function highestInArray(arr) {
  return arr.sort((a, b) => b - a)[0];
}

const sum = batteryRows
  .map((batteryRow) => maxJoltage(batteryRow, JOLTAGE_DIGITS))
  .reduce((acc, curr) => acc + curr, 0);
console.log("Max joltage", sum);
