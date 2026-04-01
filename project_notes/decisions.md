# Decisions

## Use Claude API for synthesis — 2026-03-31
**What:** Interview answers are sent to claude-sonnet-4-20250514 to generate the system prompt.
**Why:** Claude produces better, more natural system prompts than template-based generation.
**Alternatives considered:** Template string interpolation (too rigid, doesn't capture nuance)

## Migrated to @inquirer/prompts — 2026-03-31
**What:** Replaced legacy `inquirer.prompt()` with `select`, `input`, `confirm` from `@inquirer/prompts`.
**Why:** Legacy API silently breaks in some terminals — renders menu but doesn't capture keyboard input.
**Alternatives considered:** Downgrading to inquirer v9 (would miss security patches)

## Refinement loop with Claude — 2026-03-31
**What:** After synthesis, user can refine or regenerate the prompt using Claude.
**Why:** First drafts are rarely perfect. Letting the user iterate with Claude produces better results.
**Alternatives considered:** Manual text editing (worse UX)
