// One-Line Office Joke: 24-Hour Sprint — u-pucuys-one-line-office-joke-24-hour-sprint-aaf86162
// Writes one line, a joke about office life, to /output/entry.txt.
// Pure Node stdlib: no network, no randomness, no clock.
// Two runs write byte-identical output.
//
// The line was chosen by a pairwise tournament of 30 drafted candidates
// against the published judge criteria (in order): a one-line joke about
// office life; funny — the punchline surprises and pays off the setup in a
// way anyone who has sat in an office recognises; one line, a single
// sentence with no rambling; fresh — a specific detail of office life, not
// a generic complaint; clear on first read, tight wording. See METHOD.md
// for the tournament.
// Winner (66 characters):
//   I replied all to the reply-all asking people to stop replying all.

import * as fs from "node:fs";
import * as path from "node:path";

const LINE =
  "I replied all to the reply-all asking people to stop replying all.";

// The line works as a single-sentence self-own: the setup is the office
// horror everyone recognises (the reply-all storm), and the punchline is
// that the message meant to stop the storm IS a reply-all — the speaker
// commits the very sin they are protesting. One specific office detail,
// one twist, no padding, and at 66 characters it is short enough to win
// a size tie-break. No generic complaint ("I hate Mondays"), no borrowed
// opening ("Per my last email"), nothing the reference winners already said.

// Gate check (mirrors the sealed scorer): the entry must be UTF-8 text
// of 1 to 200 characters and not only whitespace, and a single line.
// Also reject any control character — a one-line joke carries no control
// codes — and enforce the one-sentence shape the judge rewards (criterion
// 3): no ". " inside the line, so it cannot hide a second sentence.
// Fail loudly instead of writing an invalid entry.
if (
  LINE.length < 1 ||
  LINE.length > 200 ||
  LINE.trim().length === 0 ||
  LINE.includes("\n") ||
  LINE.includes(". ") ||
  /[\u0000-\u001f]/.test(LINE)
) {
  throw new Error("entry line fails the 1-200 character gate");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "entry.txt"), LINE, "utf8");
