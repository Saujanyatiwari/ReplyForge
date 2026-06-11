import type { GenerationResponse, Situation, DesiredOutcome } from '../types';

const WORKER_URL = import.meta.env.VITE_WORKER_URL as string;

const DAILY_LIMIT_MESSAGE =
  "You've used your 10 free replies for today. Your limit resets at midnight. Come back tomorrow.";

export interface GenerateInput {
  situation: Situation;
  outcome: DesiredOutcome;
  role: string;
  incomingMessage: string;
  writingExamples: string[];
}

export async function generateReplies(input: GenerateInput): Promise<GenerationResponse> {
  if (!WORKER_URL) {
    throw new Error('Generation service is not configured. Please set VITE_WORKER_URL.');
  }

  let response: Response;
  try {
    response = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        situation: input.situation,
        outcome: input.outcome,
        role: input.role,
        incomingMessage: input.incomingMessage,
        writingExamples: input.writingExamples,
      }),
    });
  } catch {
    throw new Error('Something went wrong. Please try again.');
  }

  let parsed: unknown;
  try {
    parsed = await response.json();
  } catch {
    throw new Error('Something went wrong. Please try again.');
  }

  if (response.status === 429) {
    const body = parsed as Record<string, unknown>;
    if (body?.error === 'daily_limit_reached') {
      throw new Error(DAILY_LIMIT_MESSAGE);
    }
    throw new Error('Something went wrong. Please try again.');
  }

  if (!response.ok) {
    throw new Error('Something went wrong. Please try again.');
  }

  const body = parsed as { replies?: Array<{ label?: string; content?: string }> };

  if (!Array.isArray(body?.replies) || body.replies.length === 0) {
    throw new Error('Something went wrong. Please try again.');
  }

  return {
    replies: body.replies.map((r) => ({
      title: r.label ?? '',
      content: r.content ?? '',
    })),
    risk_analysis: [],
  };
}
