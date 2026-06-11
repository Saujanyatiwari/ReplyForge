import { useState, useEffect } from 'react';
import type { Theme } from '../types';
import { storageGet, storageSet, STORAGE_KEYS } from '../utils/localStorage';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    storageGet<Theme>(STORAGE_KEYS.THEME, 'dark')
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    storageSet(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return { theme, toggleTheme };
}
