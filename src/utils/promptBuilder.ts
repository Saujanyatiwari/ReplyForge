import type { Situation, DesiredOutcome, QuickAction } from '../types';
import { SITUATION_OPTIONS, OUTCOME_OPTIONS } from '../types';

// ─── Prompt Construction ──────────────────────────────────────────────────────

interface PromptParams {
  incomingMessage: string;
  situation: Situation;
  desiredOutcome: DesiredOutcome;
  role?: string;
  writingExamples?: string[];
}

export function buildGenerationPrompt(params: PromptParams): string {
  const { incomingMessage, situation, desiredOutcome, role, writingExamples } = params;

  const situationLabel = SITUATION_OPTIONS.find((s) => s.value === situation)?.label ?? situation;
  const outcomeLabel = OUTCOME_OPTIONS.find((o) => o.value === desiredOutcome)?.label ?? desiredOutcome;

  const hasExamples = writingExamples && writingExamples.length > 0;

  const styleSection = hasExamples
    ? `## My Writing Style Examples\nHere are examples of how I naturally write. Match my tone, vocabulary, sentence length, and personality closely:\n\n${writingExamples.map((ex, i) => `Example ${i + 1}:\n"""\n${ex}\n"""`).join('\n\n')}`
    : `## Writing Style\nNo personal writing examples provided. Write in a professional, natural, and human-sounding style that fits the situation.`;

  const roleSection = role?.trim()
    ? `## My Role\n${role.trim()}\n`
    : '';

  return `You are an expert professional communication coach. Your job is to craft 3 distinct, high-quality reply variations for a difficult professional conversation.

${roleSection}
## Incoming Message
The following is the message I received and need to reply to:
"""
${incomingMessage}
"""

## Situation
${situationLabel}

## Desired Outcome
${outcomeLabel}

${styleSection}

## Your Task
Generate exactly 3 reply variations that:
1. Sound completely human and natural — avoid generic AI-sounding phrases
2. Directly achieve the desired outcome: "${outcomeLabel}"
3. Are appropriate for the situation: "${situationLabel}"
4. ${hasExamples ? 'Closely match my writing style from the examples above' : 'Are professional and polished'}
5. Avoid starting with "I hope this email finds you well" or similar clichés
6. Are ready to send without any modifications

Also provide 3 practical, concise observations about these replies (risk_analysis). Focus on tone, relationship impact, and likely response. No scores, no percentages — just plain-language observations.

Respond ONLY with valid JSON matching this exact schema:
{
  "replies": [
    { "title": "Variation 1 — [brief descriptor]", "content": "..." },
    { "title": "Variation 2 — [brief descriptor]", "content": "..." },
    { "title": "Variation 3 — [brief descriptor]", "content": "..." }
  ],
  "risk_analysis": ["observation 1", "observation 2", "observation 3"]
}`;
}

// ─── Quick Action Prompt ──────────────────────────────────────────────────────

interface QuickActionParams {
  originalReply: string;
  action: QuickAction;
  situation: Situation;
  desiredOutcome: DesiredOutcome;
}

export function buildQuickActionPrompt(params: QuickActionParams): string {
  const { originalReply, action, situation, desiredOutcome } = params;

  const situationLabel = SITUATION_OPTIONS.find((s) => s.value === situation)?.label ?? situation;
  const outcomeLabel = OUTCOME_OPTIONS.find((o) => o.value === desiredOutcome)?.label ?? desiredOutcome;

  const actionInstructions: Record<QuickAction, string> = {
    firmer: 'Make the reply more assertive and direct. Keep it professional but add more backbone and urgency. Remove overly soft language.',
    'more-polite': 'Make the reply warmer and more diplomatic. Soften any hard edges while preserving the core message and desired outcome.',
    shorter: 'Make the reply significantly shorter. Keep only the essential message. Cut any filler words, redundant phrases, or unnecessary context.',
    'more-human': 'Make the reply feel more conversational and human. Add natural language patterns, vary sentence structure, and reduce any stiff or formal phrasing.',
    'more-confident': 'Rewrite the reply with stronger, more confident language. Use direct statements instead of hedging. Project certainty and authority.',
  };

  return `You are an expert professional communication coach. Refine the following reply.

## Original Reply
"""
${originalReply}
"""

## Refinement Instruction
${actionInstructions[action]}

## Context to Preserve
- Situation: ${situationLabel}
- Desired Outcome: ${outcomeLabel}
- The core message and intent must remain the same
- Keep it ready to send without modifications

Respond ONLY with valid JSON matching this exact schema:
{
  "replies": [
    { "title": "Refined — [brief descriptor]", "content": "..." }
  ],
  "risk_analysis": ["observation about this refined version"]
}`;
}
