import { readFileSync } from "node:fs";

const idRangeFile = readFileSync("day-2/input.txt", "utf-8");
const idRanges = idRangeFile
  .split(",")
  .map((range) => range.split("-").map((id) => parseInt(id)));

function* scanInvalidIds(rangeStart, rangeEnd) {
  for (let id = rangeStart; id <= rangeEnd; id++) {
    const stringId = id.toString();
    const halfLength = Math.floor(stringId.length / 2);

    for (
      let repeatedSequenceLength = 1;
      repeatedSequenceLength <= halfLength;
      repeatedSequenceLength++
    ) {
      if (stringId.length % repeatedSequenceLength === 0) {
        const searchSequence = stringId.slice(0, repeatedSequenceLength);
        const testId = searchSequence.repeat(
          stringId.length / repeatedSequenceLength
        );
        if (testId === stringId) {
          yield id;
          break;
        }
      }
    }
  }
}

const invalidIds = idRanges.flatMap(([rangeStart, rangeEnd]) =>
  Array.from(scanInvalidIds(rangeStart, rangeEnd))
);

const sumInvalidIds = invalidIds.reduce((prev, curr) => prev + curr, 0);

console.log("Invalid ID sum", sumInvalidIds);
