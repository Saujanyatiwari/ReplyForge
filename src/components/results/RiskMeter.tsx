import { MessageCircle } from 'lucide-react';

interface RiskMeterProps {
  observations: string[];
}

export function RiskMeter({ observations }: RiskMeterProps) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-4 space-y-3 animate-fade-in">
      <div className="flex items-center gap-2">
        <MessageCircle size={14} className="text-indigo-400" />
        <h3 className="text-sm font-semibold text-text-primary">Conversation Observations</h3>
      </div>
      <div className="space-y-2">
        {observations.map((obs, i) => (
          <div
            key={i}
            className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl bg-surface-2 border border-border"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
            <p className="text-xs text-text-primary leading-relaxed">{obs}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
