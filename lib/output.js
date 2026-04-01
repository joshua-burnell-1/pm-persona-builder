// ABOUTME: Saves the final system prompt to a .txt file and generates a CLAUDE.md snippet.
// ABOUTME: Writes both files to the current directory.

import * as fs from 'node:fs';
import * as path from 'node:path';
import chalk from 'chalk';

export async function saveOutputs(systemPrompt) {
  const cwd = process.cwd();
  const promptPath = path.join(cwd, 'persona-system-prompt.txt');
  const snippetPath = path.join(cwd, 'persona-claude-snippet.md');

  fs.writeFileSync(promptPath, systemPrompt + '\n');

  const snippet = `## AI Persona

> Paste this into your project's CLAUDE.md or ~/.claude/CLAUDE.md to apply this persona globally.

### System Prompt

\`\`\`
${systemPrompt}
\`\`\`

### How to use

- **Claude Code**: Paste the text above into your \`CLAUDE.md\` file under an "## AI Persona" or "## Identity" section.
- **Claude.ai**: Go to Settings > Profile > Custom Instructions and paste the prompt.
- **Claude API**: Use the prompt as the \`system\` parameter in your API call.
`;

  fs.writeFileSync(snippetPath, snippet);

  console.log(chalk.green.bold('\n  Saved!\n'));
  console.log(chalk.white(`  System prompt:   ${promptPath}`));
  console.log(chalk.white(`  CLAUDE.md snippet: ${snippetPath}\n`));
}
