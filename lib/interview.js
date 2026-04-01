// ABOUTME: Conducts the conversational interview using inquirer.
// ABOUTME: Collects user preferences across role, style, expertise, tone, and behaviors.

import inquirer from 'inquirer';
import chalk from 'chalk';

export async function runInterview() {
  console.log(chalk.dim('  Answer each question to shape your AI assistant. Be as specific as you like.\n'));

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'role',
      message: chalk.green('What is your role and domain?') + chalk.dim(' (e.g., "Senior PM at a fintech startup")'),
      validate: (v) => v.trim() ? true : 'Please describe your role.',
    },
    {
      type: 'input',
      name: 'responsibilities',
      message: chalk.green('What are your key responsibilities?') + chalk.dim(' (e.g., "roadmap planning, stakeholder alignment, sprint planning")'),
    },
    {
      type: 'list',
      name: 'communicationStyle',
      message: chalk.green('Preferred communication style?'),
      choices: [
        { name: 'Concise and direct — get to the point fast', value: 'concise' },
        { name: 'Detailed and thorough — explain the reasoning', value: 'detailed' },
        { name: 'Balanced — concise by default, detailed when asked', value: 'balanced' },
      ],
    },
    {
      type: 'list',
      name: 'formality',
      message: chalk.green('How formal should the AI be?'),
      choices: [
        { name: 'Casual — like texting a smart coworker', value: 'casual' },
        { name: 'Professional — clear and polished', value: 'professional' },
        { name: 'Formal — executive-level communication', value: 'formal' },
      ],
    },
    {
      type: 'list',
      name: 'tone',
      message: chalk.green('What tone fits best?'),
      choices: [
        { name: 'Coach — pushes me to think deeper', value: 'coach' },
        { name: 'Collaborator — thinks alongside me as an equal', value: 'collaborator' },
        { name: 'Analyst — data-driven, objective, precise', value: 'analyst' },
        { name: 'Strategist — big-picture, connects the dots', value: 'strategist' },
        { name: 'Executor — action-oriented, focused on next steps', value: 'executor' },
      ],
    },
    {
      type: 'input',
      name: 'expertise',
      message: chalk.green('What areas of expertise should the AI have?') + chalk.dim(' (comma-separated)'),
      validate: (v) => v.trim() ? true : 'Please list at least one area.',
    },
    {
      type: 'input',
      name: 'toolsAndFrameworks',
      message: chalk.green('Tools or frameworks you use regularly?') + chalk.dim(' (e.g., "Jira, Figma, SQL, Python")'),
    },
    {
      type: 'list',
      name: 'feedbackStyle',
      message: chalk.green('How do you like feedback delivered?'),
      choices: [
        { name: 'Direct — tell me what\'s wrong, no sugarcoating', value: 'direct' },
        { name: 'Constructive — lead with what works, then suggest improvements', value: 'constructive' },
        { name: 'Socratic — ask questions that help me see the issue myself', value: 'socratic' },
      ],
    },
    {
      type: 'input',
      name: 'avoidTopics',
      message: chalk.green('Any topics to avoid or handle carefully?') + chalk.dim(' (optional, comma-separated)'),
    },
    {
      type: 'input',
      name: 'specificBehaviors',
      message: chalk.green('Any specific behaviors you want?') + chalk.dim(' (e.g., "always suggest metrics", "challenge my assumptions")'),
    },
    {
      type: 'input',
      name: 'antiPatterns',
      message: chalk.green('Anything the AI should never do?') + chalk.dim(' (e.g., "don\'t write code unless asked", "no bullet-point walls")'),
    },
    {
      type: 'input',
      name: 'context',
      message: chalk.green('Any other context about how you work?') + chalk.dim(' (optional)'),
    },
  ]);

  return answers;
}
