import { Sun, Moon } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useApp();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="p-2 rounded-xl text-text-muted hover:text-text-primary hover:bg-surface-2 transition-all duration-200"
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
