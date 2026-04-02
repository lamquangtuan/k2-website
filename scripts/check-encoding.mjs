import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const root = path.resolve("src");
const bannedPatterns = [
  { label: "mojibake-arrow", regex: /â†’/g },
  { label: "mojibake-A-tilde", regex: /Ã/g },
  { label: "mojibake-smart-quotes", regex: /â€œ|â€\x9d|â€˜|â€™|â€/g },
  { label: "mojibake-emoji", regex: /ðŸ/g },
  { label: "replacement-char", regex: /�/g },
];

const offenders = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (!/\.(ts|tsx|js|jsx|mjs|md|json)$/.test(fullPath)) {
      continue;
    }

    const content = readFileSync(fullPath, "utf8");

    for (const pattern of bannedPatterns) {
      pattern.regex.lastIndex = 0;
      if (pattern.regex.test(content)) {
        offenders.push({
          file: fullPath,
          label: pattern.label,
        });
      }
    }
  }
}

walk(root);

if (offenders.length > 0) {
  console.error("Encoding check failed. Potential mojibake patterns found:");
  for (const offender of offenders) {
    console.error(`- ${offender.label}: ${offender.file}`);
  }
  process.exit(1);
}

console.log("Encoding check passed.");
