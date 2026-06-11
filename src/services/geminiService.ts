import type { GenerationResponse } from '../types';
import { isValidGenerationResponse } from '../utils/validators';

// ─── Gemini REST API Service ──────────────────────────────────────────────────

const GEMINI_MODEL = 'gemini-2.0-flash';
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

interface GeminiRequestBody {
  contents: Array<{
    role: string;
    parts: Array<{ text: string }>;
  }>;
  generationConfig: {
    responseMimeType: string;
    temperature: number;
    maxOutputTokens: number;
  };
}

export async function generateReplies(
  prompt: string,
  apiKey: string
): Promise<GenerationResponse> {
  if (!apiKey?.trim()) {
    throw new Error('No API key configured. Please add your Gemini API key in Settings.');
  }

  const url = `${BASE_URL}/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  const body: GeminiRequestBody = {
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.85,
      maxOutputTokens: 2048,
    },
  };

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (networkError) {
    throw new Error('NetworkError: Unable to reach the Gemini API. Check your connection.');
  }

  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}`;
    try {
      const errorBody = await response.json();
      const msg = errorBody?.error?.message;
      if (msg) errorMessage = msg;
    } catch {
      // ignore parse errors on error body
    }
    throw new Error(errorMessage);
  }

  let responseJson: unknown;
  try {
    responseJson = await response.json();
  } catch {
    throw new Error('Failed to parse the API response as JSON.');
  }

  // Extract the text content from the Gemini response envelope
  const candidate = (responseJson as Record<string, unknown>)?.candidates;
  if (!Array.isArray(candidate) || candidate.length === 0) {
    throw new Error('Empty response from Gemini API. Please try again.');
  }

  const textContent =
    ((candidate[0] as Record<string, unknown>)?.content as any)?.parts?.[0]?.text;

  if (typeof textContent !== 'string') {
    throw new Error('Unexpected response format from Gemini API.');
  }

  // Parse the structured JSON from the text content
  let parsed: unknown;
  try {
    parsed = JSON.parse(textContent);
  } catch {
    throw new Error(
      'Gemini returned malformed JSON. Please try again — this occasionally happens with complex prompts.'
    );
  }

  if (!isValidGenerationResponse(parsed)) {
    throw new Error(
      'Response structure was unexpected. Please try again or simplify your input.'
    );
  }

  return parsed;
}
