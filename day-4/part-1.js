import { readFileSync } from "node:fs";

const PAPER = "@";
const REMOVED_PAPER = "x";
const MAX_ADJACENT = 3;

const dataFile = readFileSync("day-4/input.txt", "utf-8");
const parsedGrid = dataFile.split("\n").map((line) => line.split(""));

let openPapers = 0;

function replacePapers(grid) {
  let replacedPapers = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === PAPER) {
        const adjacencies = [
          grid[y + 1]?.[x + 1],
          grid[y + 1]?.[x],
          grid[y + 1]?.[x - 1],
          grid[y]?.[x + 1],
          grid[y]?.[x - 1],
          grid[y - 1]?.[x + 1],
          grid[y - 1]?.[x],
          grid[y - 1]?.[x - 1],
        ];
        const paperAdjacencies = adjacencies.filter((tile) => tile === PAPER);
        if (paperAdjacencies.length <= MAX_ADJACENT) {
          grid[y][x] = REMOVED_PAPER;
          replacedPapers++;
        }
      }
    }
  }

  return replacedPapers;
}

let replacedPapers;
do {
  replacedPapers = replacePapers(parsedGrid);
  openPapers += replacedPapers;
} while (replacedPapers > 0);

console.log("Papers free", openPapers);
