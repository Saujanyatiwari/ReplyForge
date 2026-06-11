import { Eye } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ReplyCard } from './ReplyCard';
import { EmptyState } from '../ui/EmptyState';
import { RiskMeter } from './RiskMeter';

export function ReplyGrid() {
  const { replies, riskAnalysis, isLoading, setIsSidebarOpen } = useApp();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-5 w-32 bg-surface-2 rounded-lg animate-pulse" />
        </div>
        <div className="grid grid-cols-1 gap-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-56 bg-surface border border-border rounded-2xl animate-pulse"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (replies.length === 0) {
    return (
      <EmptyState onGetStarted={() => setIsSidebarOpen(true)} />
    );
  }

  return (
    <div className="space-y-5">
      {/* Section label */}
      <div className="flex items-center gap-2">
        <Eye size={15} className="text-indigo-400" />
        <h2 className="text-sm font-semibold text-text-primary">
          Generated Replies
        </h2>
        <span className="text-xs text-text-muted bg-surface-2 border border-border px-2 py-0.5 rounded-full">
          {replies.length} variations
        </span>
      </div>

      {/* Reply cards */}
      <div className="grid grid-cols-1 gap-4">
        {replies.map((reply, i) => (
          <ReplyCard key={reply.id} reply={reply} index={i} />
        ))}
      </div>

      {/* Risk meter */}
      {riskAnalysis.length > 0 && (
        <RiskMeter observations={riskAnalysis} />
      )}
    </div>
  );
}
