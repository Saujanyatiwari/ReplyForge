// ─── localStorage Utilities ───────────────────────────────────────────────────

const PREFIX = 'replyforge_';

export function storageGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function storageSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    console.error('[ReplyForge] Failed to write to localStorage');
  }
}

export function storageRemove(key: string): void {
  localStorage.removeItem(PREFIX + key);
}

// ─── Storage Keys ─────────────────────────────────────────────────────────────

export const STORAGE_KEYS = {
  PLAYBOOKS: 'playbooks',
  API_KEY: 'api_key',
  THEME: 'theme',
  WRITING_EXAMPLES: 'writing_examples',
} as const;
