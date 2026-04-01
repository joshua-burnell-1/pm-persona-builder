# pm-persona-builder

A CLI tool that interviews you about your working style and uses the Claude API to generate a polished AI assistant persona — a system prompt tailored to how you think, communicate, and work.

## Why I built this

Generic AI assistants give generic answers. The difference between a useful AI collaborator and a frustrating one often comes down to a well-crafted system prompt — but most people don't know how to write one, or don't take the time.

This tool turns that process into a 5-minute conversation. Answer questions about your role, preferences, and working style, and Claude synthesizes it into a system prompt you can use everywhere.

## What is a system prompt?

A system prompt is a set of instructions that shapes how an AI assistant behaves. It's the difference between "you are a helpful assistant" and "you are a direct, no-nonsense collaborator who works with senior PMs on product strategy, gives feedback without sugarcoating, and always suggests metrics to track decisions."

System prompts work across:

- **Claude.ai** — Settings > Profile > Custom Instructions
- **Claude Code** — paste into your `CLAUDE.md` file (loaded automatically every session)
- **Claude API** — pass as the `system` parameter in your API call

## Install

```bash
npm install -g pm-persona-builder
```

Or run directly:

```bash
npx pm-persona-builder
```

## Prerequisites

You need a Claude API key. Set it as an environment variable:

```bash
export ANTHROPIC_API_KEY=your-key-here
```

Get one at [console.anthropic.com](https://console.anthropic.com/).

## Usage

```bash
pm-persona
```

The tool will:

1. **Interview you** — asks about your role, communication style, expertise, tone, feedback preferences, and specific behaviors
2. **Synthesize** — sends your answers to Claude (claude-sonnet-4-20250514) to generate a polished system prompt
3. **Preview & refine** — shows you the result and lets you request changes or regenerate
4. **Save** — writes two files to the current directory:
   - `persona-system-prompt.txt` — the raw system prompt, ready to paste anywhere
   - `persona-claude-snippet.md` — a formatted snippet with usage instructions for Claude Code, Claude.ai, and the API

## How to use the output

### In Claude Code

Copy the system prompt into your project's `CLAUDE.md` file:

```markdown
## AI Persona

<paste your system prompt here>
```

Or add it to `~/.claude/CLAUDE.md` to apply it globally across all projects.

### In Claude.ai

Go to **Settings > Profile > Custom Instructions** and paste the system prompt.

### In the Claude API

```javascript
const response = await client.messages.create({
  model: 'claude-sonnet-4-20250514',
  system: '<your system prompt here>',
  messages: [{ role: 'user', content: 'Hello' }],
});
```

## Project Structure

```
bin/cli.js            # CLI entry point
lib/interview.js      # Inquirer-based conversational interview
lib/synthesizer.js    # Claude API call to generate the system prompt
lib/refine.js         # Preview, refine, and regenerate loop
lib/output.js         # Save system prompt and CLAUDE.md snippet
test/synthesizer.test.js  # Unit tests
```

## License

MIT
