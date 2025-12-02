import { readFileSync } from "node:fs";

function parseRotation(rotation) {
  const direction = rotation.charAt(0);
  const magnitude = rotation.slice(1);

  switch (direction) {
    case "R":
      return parseInt(magnitude);
    case "L":
      return -parseInt(magnitude);
    default:
      throw new Error("Failed to parse rotation");
  }
}

let dialPos = 50;
let timesZero = 0;

const rotationsFile = readFileSync("day-1/input.txt", "utf-8");
const rotations = rotationsFile.split("\n").filter((rotation) => rotation);

for (const rotation of rotations) {
  dialPos += parseRotation(rotation);
  dialPos %= 100;
  if (dialPos === 0) {
    timesZero++;
  }
}

console.log(`Password is ${timesZero}`);
