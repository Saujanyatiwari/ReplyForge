import { ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SITUATION_OPTIONS } from '../../types';

export function SituationSelector() {
  const { situation, setSituation } = useApp();
  const selected = SITUATION_OPTIONS.find((s) => s.value === situation);

  return (
    <div className="space-y-2">
      <label htmlFor="situation-select" className="block text-sm font-semibold text-text-primary">
        Situation
      </label>
      <p className="text-xs text-text-muted">What kind of conversation is this?</p>
      <div className="relative">
        <select
          id="situation-select"
          value={situation}
          onChange={(e) => setSituation(e.target.value as typeof situation)}
          className="w-full appearance-none bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 transition-all pr-10 cursor-pointer"
        >
          {SITUATION_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
        />
      </div>
      {selected && (
        <p className="text-xs text-text-muted pl-1">{selected.description}</p>
      )}
    </div>
  );
}
