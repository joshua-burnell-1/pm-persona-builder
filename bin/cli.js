#!/usr/bin/env node
// ABOUTME: Entry point for the pm-persona CLI tool.
// ABOUTME: Runs the interview, synthesizes persona via Claude API, handles refinement and output.

import chalk from 'chalk';
import { runInterview } from '../lib/interview.js';
import { synthesizePersona } from '../lib/synthesizer.js';
import { refineLoop } from '../lib/refine.js';
import { saveOutputs } from '../lib/output.js';

const args = process.argv.slice(2);
if (args[0] === '--help' || args[0] === '-h') {
  console.log(`
pm-persona — Build your ideal AI assistant persona

Usage:
  pm-persona          Run the interactive interview
  pm-persona --help   Show this help message

Requires: ANTHROPIC_API_KEY environment variable
`);
  process.exit(0);
}

async function main() {
  console.log(chalk.blue.bold('\n  PM Persona Builder\n'));
  console.log(chalk.dim('  Build your ideal AI assistant persona through a friendly interview.\n'));

  if (!process.env.ANTHROPIC_API_KEY) {
    console.log(chalk.red('  Error: ANTHROPIC_API_KEY environment variable is required.\n'));
    console.log(chalk.dim('  Set it with: export ANTHROPIC_API_KEY=your-key-here\n'));
    process.exit(1);
  }

  const answers = await runInterview();

  console.log(chalk.blue('\n  Synthesizing your persona with Claude...\n'));
  let systemPrompt = await synthesizePersona(answers);

  systemPrompt = await refineLoop(systemPrompt, answers);

  await saveOutputs(systemPrompt);
}

main().catch((err) => {
  console.error(chalk.red(`\n  Error: ${err.message}\n`));
  process.exit(1);
});
