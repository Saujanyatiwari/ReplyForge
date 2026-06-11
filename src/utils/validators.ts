import type { GenerationResponse } from '../types';

// ─── Response Validation ──────────────────────────────────────────────────────

export function isValidGenerationResponse(value: unknown): value is GenerationResponse {
  if (!value || typeof value !== 'object') return false;

  const obj = value as Record<string, unknown>;

  if (!Array.isArray(obj.replies) || obj.replies.length === 0) return false;
  if (!Array.isArray(obj.risk_analysis)) return false;

  for (const reply of obj.replies) {
    if (!reply || typeof reply !== 'object') return false;
    const r = reply as Record<string, unknown>;
    if (typeof r.title !== 'string' || typeof r.content !== 'string') return false;
    if (!r.title.trim() || !r.content.trim()) return false;
  }

  return true;
}

// ─── Error Helpers ────────────────────────────────────────────────────────────

export function parseApiError(error: unknown): string {
  if (error instanceof Error) {
    if (error.message.includes('API_KEY_INVALID') || error.message.includes('401')) {
      return 'Invalid API key. Please check your Gemini API key in Settings.';
    }
    if (error.message.includes('429')) {
      return 'Rate limit reached. Please wait a moment and try again.';
    }
    if (error.message.includes('403')) {
      return 'API key does not have permission to use this model. Please check your Gemini API key.';
    }
    if (error.message.includes('400')) {
      return 'Bad request — your message may be too long or contain unsupported content.';
    }
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      return 'Network error. Please check your internet connection and try again.';
    }
    return error.message;
  }
  return 'An unexpected error occurred. Please try again.';
}
