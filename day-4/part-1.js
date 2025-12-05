import { readFileSync } from "node:fs";

const PAPER = "@";
const MAX_ADJACENT = 3;

const dataFile = readFileSync("day-4/input.txt", "utf-8");
const parsedGrid = dataFile.split("\n").map((line) => line.split(""));

let openPapers = 0;

for (let y = 0; y < parsedGrid.length; y++) {
  for (let x = 0; x < parsedGrid[y].length; x++) {
    if (parsedGrid[y][x] === PAPER) {
      const adjacencies = [
        parsedGrid[y + 1]?.[x + 1],
        parsedGrid[y + 1]?.[x],
        parsedGrid[y + 1]?.[x - 1],
        parsedGrid[y]?.[x + 1],
        parsedGrid[y]?.[x - 1],
        parsedGrid[y - 1]?.[x + 1],
        parsedGrid[y - 1]?.[x],
        parsedGrid[y - 1]?.[x - 1],
      ];
      const paperAdjacencies = adjacencies.filter((tile) => tile === PAPER);
      if (paperAdjacencies.length <= MAX_ADJACENT) {
        openPapers++;
      }
    }
  }
}

console.log("Papers free", openPapers);
