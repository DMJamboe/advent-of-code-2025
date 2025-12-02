import { readFileSync } from "node:fs";

const idRangeFile = readFileSync("day-2/input.txt", "utf-8");
const idRanges = idRangeFile
  .split(",")
  .map((range) => range.split("-").map((id) => parseInt(id)));

function* scanInvalidIds(rangeStart, rangeEnd) {
  for (let id = rangeStart; id <= rangeEnd; id++) {
    const stringId = id.toString();
    if (
      stringId.length % 2 === 0 &&
      stringId.slice(0, Math.floor(stringId.length / 2)) ===
        stringId.slice(Math.floor(stringId.length / 2))
    ) {
      yield id;
    }
  }
}

const invalidIds = idRanges.flatMap(([rangeStart, rangeEnd]) =>
  Array.from(scanInvalidIds(rangeStart, rangeEnd))
);
const sumInvalidIds = invalidIds.reduce((prev, curr) => prev + curr, 0);

console.log("Invalid ID sum", sumInvalidIds);
