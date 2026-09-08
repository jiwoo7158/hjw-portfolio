import { spawn } from "node:child_process";
import path from "node:path";
import process from "node:process";

const command = process.argv[2];
const args = process.argv.slice(3);
const allowedCommands = new Set(["dev", "check", "build", "preview"]);

if (!allowedCommands.has(command)) {
  console.error(`Unknown Astro command: ${command ?? "(missing)"}`);
  process.exit(1);
}

const bin = path.join(process.cwd(), "node_modules", "astro", "bin", "astro.mjs");

const child = spawn(process.execPath, [bin, command, ...args], {
  env: {
    ...process.env,
    ASTRO_TELEMETRY_DISABLED: "1"
  },
  stdio: "inherit"
});

child.on("exit", (code, signal) => {
  if (signal) {
    console.error(`Astro command terminated by signal ${signal}`);
    process.exit(1);
  }
  process.exit(code ?? 0);
});
