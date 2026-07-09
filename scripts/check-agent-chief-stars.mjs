import { readFileSync } from "node:fs";

const appSource = readFileSync(new URL("../src/App.jsx", import.meta.url), "utf8");

if (/agent-chief[\s\S]*★155\+/.test(appSource)) {
  console.error("agent-chief adapter still uses a hardcoded stale star count.");
  process.exit(1);
}

console.log("agent-chief adapter star count is not hardcoded.");
