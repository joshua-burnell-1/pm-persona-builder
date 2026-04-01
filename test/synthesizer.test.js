// ABOUTME: Tests for the formatAnswers function in synthesizer.
// ABOUTME: Verifies interview answers are correctly formatted for the Claude API call.

import { formatAnswers } from '../lib/synthesizer.js';
import assert from 'node:assert';

const answers = {
  role: 'Senior PM at a fintech startup',
  responsibilities: 'roadmap, stakeholder alignment',
  communicationStyle: 'concise',
  formality: 'professional',
  tone: 'collaborator',
  expertise: 'product strategy, data analysis',
  toolsAndFrameworks: 'Jira, Figma, SQL',
  feedbackStyle: 'direct',
  avoidTopics: 'politics',
  specificBehaviors: 'always suggest metrics',
  antiPatterns: 'no bullet-point walls',
  context: 'I work async with a remote team',
};

const result = formatAnswers(answers);

assert(result.includes('Role & Domain: Senior PM'), 'should include role');
assert(result.includes('Key Responsibilities: roadmap'), 'should include responsibilities');
assert(result.includes('Communication Style: concise'), 'should include comm style');
assert(result.includes('Formality: professional'), 'should include formality');
assert(result.includes('Tone: collaborator'), 'should include tone');
assert(result.includes('Areas of Expertise: product strategy'), 'should include expertise');
assert(result.includes('Tools & Frameworks: Jira'), 'should include tools');
assert(result.includes('Feedback Style: direct'), 'should include feedback style');
assert(result.includes('Topics to Avoid/Handle Carefully: politics'), 'should include avoid topics');
assert(result.includes('Specific Behaviors Wanted: always suggest'), 'should include behaviors');
assert(result.includes('Things to Never Do: no bullet'), 'should include anti-patterns');
assert(result.includes('Additional Context: I work async'), 'should include context');

// Test with optional fields empty
const minimal = formatAnswers({
  role: 'Engineer',
  responsibilities: '',
  communicationStyle: 'balanced',
  formality: 'casual',
  tone: 'coach',
  expertise: 'backend',
  toolsAndFrameworks: '',
  feedbackStyle: 'socratic',
  avoidTopics: '',
  specificBehaviors: '',
  antiPatterns: '',
  context: '',
});

assert(minimal.includes('Role & Domain: Engineer'), 'should include role');
assert(!minimal.includes('Key Responsibilities:'), 'should skip empty responsibilities');
assert(!minimal.includes('Tools & Frameworks:'), 'should skip empty tools');
assert(!minimal.includes('Topics to Avoid/Handle Carefully'), 'should skip empty avoid topics');

console.log('All tests passed!');
