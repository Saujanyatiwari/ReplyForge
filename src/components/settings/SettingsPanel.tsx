import { useState, useEffect } from 'react';
import { Key, Trash2, Eye, EyeOff, ShieldCheck, ExternalLink, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

export function SettingsPanel() {
  const { isSettingsOpen, setIsSettingsOpen, apiKey, saveApiKey, removeApiKey, hasApiKey, addToast } = useApp();
  const [draft, setDraft] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [error, setError] = useState('');

  // Sync draft when panel opens
  useEffect(() => {
    if (isSettingsOpen) {
      setDraft(apiKey);
      setError('');
      setShowKey(false);
    }
  }, [isSettingsOpen, apiKey]);

  const validateKey = (key: string): string => {
    if (!key.trim()) return 'API key cannot be empty.';
    if (!key.trim().startsWith('AI') && key.trim().length < 20) {
      return 'This does not look like a valid Gemini API key.';
    }
    return '';
  };

  const handleSave = () => {
    const trimmed = draft.trim();
    const err = validateKey(trimmed);
    if (err) { setError(err); return; }
    saveApiKey(trimmed);
    addToast('success', 'API key saved. You\'re ready to generate!');
    setIsSettingsOpen(false);
  };

  const handleRemove = () => {
    removeApiKey();
    setDraft('');
    addToast('info', 'API key removed.');
    setIsSettingsOpen(false);
  };

  const maskedKey = apiKey
    ? apiKey.slice(0, 6) + '•'.repeat(Math.min(20, apiKey.length - 8)) + apiKey.slice(-4)
    : '';

  if (!isSettingsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={() => setIsSettingsOpen(false)}
      />

      {/* Panel */}
      <div className="relative w-full max-w-md bg-surface border-l border-border h-full flex flex-col shadow-2xl animate-slide-in-right overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Settings</h2>
            <p className="text-xs text-text-muted mt-0.5">Configure your Gemini API access</p>
          </div>
          <button
            onClick={() => setIsSettingsOpen(false)}
            className="p-2 rounded-xl text-text-muted hover:text-text-primary hover:bg-surface-2 transition-colors"
            aria-label="Close settings"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 px-6 py-6 space-y-6">
          {/* Current key status */}
          {hasApiKey && (
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-500/8 border border-emerald-500/20">
              <ShieldCheck size={18} className="text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-emerald-400">API key active</p>
                <p className="text-xs text-text-muted mt-1 font-mono">{maskedKey}</p>
                <p className="text-xs text-text-muted mt-1">Your key is stored only in this browser.</p>
              </div>
            </div>
          )}

          {/* API Key field */}
          <div className="space-y-2">
            <label htmlFor="api-key-input" className="block text-sm font-semibold text-text-primary">
              <span className="flex items-center gap-2">
                <Key size={14} className="text-indigo-400" />
                Gemini API Key
              </span>
            </label>

            <div className="relative">
              <input
                id="api-key-input"
                type={showKey ? 'text' : 'password'}
                value={draft}
                onChange={(e) => { setDraft(e.target.value); setError(''); }}
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                placeholder="AIza…"
                className={cn(
                  'w-full bg-surface-2 border rounded-xl px-4 py-2.5 text-sm font-mono text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all pr-10',
                  error ? 'border-red-500/50 focus:ring-red-500/30' : 'border-border focus:border-indigo-500/50'
                )}
                autoComplete="off"
                spellCheck={false}
              />
              <button
                type="button"
                onClick={() => setShowKey((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                aria-label={showKey ? 'Hide key' : 'Show key'}
              >
                {showKey ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {error && (
              <p className="text-xs text-red-400 mt-1">{error}</p>
            )}
          </div>

          {/* Privacy notice */}
          <div className="space-y-2 px-4 py-3 rounded-xl bg-surface-2 border border-border">
            <p className="text-xs font-semibold text-text-primary">🔒 Privacy first</p>
            <ul className="space-y-1 text-xs text-text-muted leading-relaxed">
              <li>• Your API key is stored only in <strong className="text-text-primary">this browser's localStorage</strong></li>
              <li>• It is never sent to any server other than Google's API</li>
              <li>• Clearing browser data will remove it</li>
              <li>• You can remove it at any time below</li>
            </ul>
          </div>

          {/* Get API key link */}
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <ExternalLink size={13} />
            Get a free Gemini API key at Google AI Studio
          </a>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-5 border-t border-border space-y-3 shrink-0">
          <Button
            variant="primary"
            size="lg"
            onClick={handleSave}
            className="w-full"
          >
            {hasApiKey ? 'Update API Key' : 'Save API Key'}
          </Button>
          {hasApiKey && (
            <Button
              variant="danger"
              size="md"
              onClick={handleRemove}
              leftIcon={<Trash2 size={14} />}
              className="w-full"
            >
              Remove API Key
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
