// The Moon Finally Answers Back
// One line, 1-240 characters, in the voice of the Moon replying at last
// to the wishes, howls and late-night promises of everyone staring up at it.
// The program writes the line to /output/entry.txt.
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

function arg(name: string, fallback: string): string {
  const at = process.argv.indexOf(`--${name}`);
  if (at >= 0 && at + 1 < process.argv.length) return process.argv[at + 1]!;
  const withEquals = process.argv.find((a) => a.startsWith(`--${name}=`));
  return withEquals === undefined ? fallback : withEquals.slice(name.length + 3);
}

const line =
  "You wished on me for centuries, howled at me, and swore you'd change. I heard every word. I kept glowing anyway — now look up and say thanks for the light.";

if (line.length > 240) {
  process.stderr.write(`moon: line is ${line.length} characters, over the 240 cap\n`);
  process.exit(1);
}

const out = arg('output', process.env.MAKEFUN_OUTPUT_DIR ?? '/output');
mkdirSync(out, { recursive: true });
writeFileSync(join(out, 'entry.txt'), line);
process.stdout.write(`moon: wrote ${join(out, 'entry.txt')} (${line.length} characters)\n`);
