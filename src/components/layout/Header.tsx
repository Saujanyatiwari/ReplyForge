import { Settings, Menu, Zap } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useApp } from '../../context/AppContext';

export function Header() {
  const { setIsSettingsOpen, setIsSidebarOpen, hasApiKey } = useApp();

  return (
    <header className="h-16 border-b border-border bg-surface/80 backdrop-blur-sm flex items-center justify-between px-4 md:px-6 shrink-0 z-30 relative">
      {/* Left: Mobile menu + Brand */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 rounded-xl text-text-muted hover:text-text-primary hover:bg-surface-2 transition-colors md:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu size={18} />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Zap size={15} className="text-white" fill="white" />
          </div>
          <div className="leading-none">
            <span className="text-base font-bold text-text-primary tracking-tight">ReplyForge</span>
            <p className="text-[10px] text-text-muted hidden sm:block mt-0.5">Handle difficult conversations with confidence</p>
          </div>
        </div>
      </div>

      {/* Right: API key status + theme toggle + settings */}
      <div className="flex items-center gap-1">
        {!hasApiKey && (
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="hidden sm:flex items-center gap-1.5 text-xs text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-lg hover:bg-amber-400/20 transition-colors mr-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Add API key to start
          </button>
        )}

        {hasApiKey && (
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1.5 rounded-lg mr-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            API key active
          </div>
        )}

        <ThemeToggle />

        <button
          onClick={() => setIsSettingsOpen(true)}
          aria-label="Open settings"
          className="p-2 rounded-xl text-text-muted hover:text-text-primary hover:bg-surface-2 transition-colors"
        >
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
}
