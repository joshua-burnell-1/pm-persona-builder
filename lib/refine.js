// ABOUTME: Handles the preview and refinement loop after persona synthesis.
// ABOUTME: Shows the system prompt and lets the user request changes via Claude.

import { select, input } from '@inquirer/prompts';
import chalk from 'chalk';
import Anthropic from '@anthropic-ai/sdk';

export async function refineLoop(systemPrompt, answers) {
  let current = systemPrompt;

  while (true) {
    console.log(chalk.cyan.bold('  ── Your AI Persona ──\n'));
    console.log(current.split('\n').map((l) => chalk.white(`  ${l}`)).join('\n'));
    console.log('');

    const action = await select({
      message: chalk.green('What would you like to do?'),
      choices: [
        { name: 'Looks good — save it', value: 'save' },
        { name: 'Refine — tell Claude what to change', value: 'refine' },
        { name: 'Regenerate — start the synthesis over', value: 'regenerate' },
      ],
    });

    if (action === 'save') {
      return current;
    }

    if (action === 'regenerate') {
      const { synthesizePersona } = await import('./synthesizer.js');
      console.log(chalk.blue('\n  Regenerating...\n'));
      current = await synthesizePersona(answers);
      continue;
    }

    const feedback = await input({
      message: chalk.green('What should be changed?'),
      validate: (v) => v.trim() ? true : 'Please describe the change.',
    });

    console.log(chalk.blue('\n  Refining...\n'));
    current = await applyRefinement(current, feedback);
  }
}

async function applyRefinement(systemPrompt, feedback) {
  const client = new Anthropic();

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `Here is an AI system prompt:\n\n${systemPrompt}\n\nThe user wants this change: "${feedback}"\n\nApply the requested change and return the updated system prompt. Return ONLY the updated system prompt text, no explanation or markdown fences.`,
      },
    ],
  });

  return response.content[0].text.trim();
}
