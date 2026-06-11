import { Sparkles, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function GenerateButton() {
  const { generate, isLoading, hasApiKey, incomingMessage, generationError } = useApp();



  return (
    <div className="space-y-3 pt-2">
      <button
        id="generate-replies-btn"
        onClick={generate}
        disabled={isLoading}
        className="w-full relative group flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-base font-semibold text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden"
        style={{
          background: isLoading
            ? 'linear-gradient(135deg, #4f46e5, #7c3aed)'
            : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          boxShadow: isLoading
            ? 'none'
            : '0 8px 32px rgba(99, 102, 241, 0.35), 0 2px 8px rgba(99, 102, 241, 0.2)',
        }}
      >
        {/* Shimmer overlay on hover */}
        {!isLoading && (
          <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
        )}

        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white/80" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>Generating replies…</span>
          </>
        ) : (
          <>
            <Sparkles size={20} className="shrink-0" />
            <span>Generate 3 Replies</span>
          </>
        )}
      </button>

      {!hasApiKey && (
        <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-amber-400/5 border border-amber-400/20">
          <AlertCircle size={14} className="text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-300 leading-relaxed">
            Add your Gemini API key in{' '}
            <button
              className="underline underline-offset-2 hover:text-amber-200 transition-colors"
              onClick={() => document.getElementById('settings-trigger')?.click()}
            >
              Settings
            </button>{' '}
            to start generating.
          </p>
        </div>
      )}

      {!incomingMessage.trim() && hasApiKey && (
        <p className="text-xs text-text-muted text-center">Paste an incoming message above to get started.</p>
      )}

      {generationError && (
        <div className="flex items-start gap-2 px-3 py-3 rounded-xl bg-red-500/8 border border-red-500/20">
          <AlertCircle size={14} className="text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-red-400 mb-0.5">Generation failed</p>
            <p className="text-xs text-red-400/80 leading-relaxed">{generationError}</p>
          </div>
        </div>
      )}
    </div>
  );
}
