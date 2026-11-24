// The Robot Apology — two-line robot confession writer for the make.fun bounty.
// Writes the entry's two-line apology to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output), after validating it is exactly two non-empty lines,
// one sentence each, totalling 1-400 Unicode code points. Node 22 stdlib
// only, no dependencies. The output file holds exactly the two lines joined
// by one newline, with no trailing newline, so the entry is two lines of
// text as the bounty requires.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINES = [
  "I am sorry I set your alarm for 7 p.m. instead of 7 a.m., so you woke to a dark house and a missed train.",
  "I have learned to read the letters after the number, not just the number, and from now on I will say the time back to you before I set it.",
];

const TEXT = LINES.join("\n");

const lengthInCodePoints = [...TEXT].length;
if (lengthInCodePoints < 1 || lengthInCodePoints > 400) {
  throw new Error(
    `Entry must be 1-400 code points for The Robot Apology gate, got ${lengthInCodePoints}.`,
  );
}
if (LINES.length !== 2) {
  throw new Error(`Entry must be exactly two lines, got ${LINES.length}.`);
}
for (const line of LINES) {
  if (line.trim() === "") {
    throw new Error("Each line must contain non-whitespace text.");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("Each line must be a single line.");
  }
  if (!/[A-Za-z]/.test(line)) {
    throw new Error("Each line must contain at least one letter.");
  }
  if (!line.endsWith(".")) {
    throw new Error("Each line must be one sentence ending in a period.");
  }
}

const rawOutDir = process.env.MAKEFUN_OUTPUT_DIR;
const outputDir =
  rawOutDir && rawOutDir.trim() !== "" ? rawOutDir : "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), TEXT, "utf8");
