import { useState } from 'react';
import { Plus, Trash2, AlertCircle, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { cn } from '../../utils/cn';

export function WritingExamples() {
  const { writingExamples, addWritingExample, removeWritingExample } = useApp();
  const [draft, setDraft] = useState('');

  const handleAdd = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    addWritingExample(trimmed);
    setDraft('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleAdd();
    }
  };

  const tooFew = writingExamples.length < 3;

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-0.5">
          My Writing Examples
          <span className="ml-2 text-xs font-normal text-text-muted">(optional, improves style matching)</span>
        </label>
        <p className="text-xs text-text-muted">Past replies you like — Gemini will match your natural tone.</p>
      </div>

      {/* Example list */}
      {writingExamples.length > 0 && (
        <div className="space-y-2">
          {writingExamples.map((ex, i) => (
            <div
              key={i}
              className="group flex items-start gap-2 bg-surface-2 border border-border rounded-xl px-3 py-2.5"
            >
              <div className="shrink-0 w-5 h-5 rounded-md bg-indigo-500/15 flex items-center justify-center mt-0.5">
                <span className="text-[10px] font-bold text-indigo-400">{i + 1}</span>
              </div>
              <p className="text-xs text-text-primary flex-1 leading-relaxed whitespace-pre-wrap line-clamp-3">
                {ex}
              </p>
              <button
                onClick={() => removeWritingExample(i)}
                className="shrink-0 opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-red-500/20 hover:text-red-400 text-text-muted transition-all mt-0.5"
                aria-label={`Remove example ${i + 1}`}
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Helper if too few */}
      {tooFew && writingExamples.length > 0 && (
        <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-amber-400/5 border border-amber-400/20">
          <AlertCircle size={14} className="text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-300 leading-relaxed">
            Add {3 - writingExamples.length} more example{3 - writingExamples.length !== 1 ? 's' : ''} for better style matching.
          </p>
        </div>
      )}

      {writingExamples.length === 0 && (
        <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-surface-2 border border-border border-dashed">
          <Sparkles size={14} className="text-text-muted shrink-0 mt-0.5" />
          <p className="text-xs text-text-muted leading-relaxed">
            Add 2–3 past replies you like for better style matching.
          </p>
        </div>
      )}

      {/* Add new example */}
      <div className="space-y-2">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Paste a reply you've written before…"
          rows={3}
          className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 resize-none transition-all leading-relaxed"
        />
        <button
          onClick={handleAdd}
          disabled={!draft.trim()}
          className={cn(
            'flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg transition-all',
            draft.trim()
              ? 'text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20'
              : 'text-text-muted bg-surface-2 border border-border opacity-50 cursor-not-allowed'
          )}
        >
          <Plus size={13} />
          Add Example
          <span className="text-text-muted font-normal ml-1">⌘↵</span>
        </button>
      </div>
    </div>
  );
}
