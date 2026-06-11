import { useState } from 'react';
import { storageGet, storageSet, storageRemove, STORAGE_KEYS } from '../utils/localStorage';

export function useSettings() {
  const [apiKey, setApiKeyState] = useState<string>(() =>
    storageGet<string>(STORAGE_KEYS.API_KEY, '')
  );

  const saveApiKey = (key: string) => {
    const trimmed = key.trim();
    setApiKeyState(trimmed);
    storageSet(STORAGE_KEYS.API_KEY, trimmed);
  };

  const removeApiKey = () => {
    setApiKeyState('');
    storageRemove(STORAGE_KEYS.API_KEY);
  };

  const hasApiKey = apiKey.length > 0;

  return { apiKey, saveApiKey, removeApiKey, hasApiKey };
}
