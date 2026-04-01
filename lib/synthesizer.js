// ABOUTME: Sends interview answers to Claude API to synthesize a polished system prompt.
// ABOUTME: Uses claude-sonnet-4-20250514 to generate a well-structured persona definition.

import Anthropic from '@anthropic-ai/sdk';

const SYNTHESIS_PROMPT = `You are an expert at crafting AI system prompts. Given the following interview answers about someone's ideal AI assistant, synthesize a polished, well-structured system prompt.

The system prompt should:
- Be written in second person ("You are...")
- Open with a clear identity statement
- Organize instructions into logical sections
- Be specific and actionable, not vague
- Include concrete examples where helpful
- Feel natural, not robotic or overly rigid
- Be 200-400 words — comprehensive but not bloated

Return ONLY the system prompt text, no explanation or markdown fences.`;

export async function synthesizePersona(answers) {
  const client = new Anthropic();

  const interviewSummary = formatAnswers(answers);

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `${SYNTHESIS_PROMPT}\n\nInterview answers:\n${interviewSummary}`,
      },
    ],
  });

  return response.content[0].text.trim();
}

export function formatAnswers(answers) {
  const lines = [];

  lines.push(`Role & Domain: ${answers.role}`);
  if (answers.responsibilities) lines.push(`Key Responsibilities: ${answers.responsibilities}`);
  lines.push(`Communication Style: ${answers.communicationStyle}`);
  lines.push(`Formality: ${answers.formality}`);
  lines.push(`Tone: ${answers.tone}`);
  lines.push(`Areas of Expertise: ${answers.expertise}`);
  if (answers.toolsAndFrameworks) lines.push(`Tools & Frameworks: ${answers.toolsAndFrameworks}`);
  lines.push(`Feedback Style: ${answers.feedbackStyle}`);
  if (answers.avoidTopics) lines.push(`Topics to Avoid/Handle Carefully: ${answers.avoidTopics}`);
  if (answers.specificBehaviors) lines.push(`Specific Behaviors Wanted: ${answers.specificBehaviors}`);
  if (answers.antiPatterns) lines.push(`Things to Never Do: ${answers.antiPatterns}`);
  if (answers.context) lines.push(`Additional Context: ${answers.context}`);

  return lines.join('\n');
}
