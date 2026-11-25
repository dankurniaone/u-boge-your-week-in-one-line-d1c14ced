// Your Week in One Line — u-boge-your-week-in-one-line-d1c14ced
// Writes one line (1-100 UTF-8 chars) summing up the week to /output/entry.txt.
// The line is grounded in the entrant's real week: fifty make.fun bounty entries
// filed, seventeen placed, and the one that paid was a haiku about a breakpoint.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "I spent the week entering fifty bounties; the only one that paid was a haiku about a breakpoint.";

// Gate self-check: 1-100 chars, not only whitespace, single line.
const chars = [...LINE].length;
if (chars < 1 || chars > 100) {
  throw new Error(`line is ${chars} chars, gate requires 1-100`);
}
if (!LINE.trim() || LINE.includes("\n")) {
  throw new Error("line must be non-blank and a single line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = `${outDir}/entry.txt`;
writeFileSync(outPath, LINE, "utf8");
// Read back and verify the file holds exactly the line (no trailing newline).
import { readFileSync } from "node:fs";
if (readFileSync(outPath, "utf8") !== LINE) {
  throw new Error("round-trip check failed: entry.txt differs from the line");
}
console.log(`wrote ${chars} chars to ${outPath}`);
