import { MessageSquarePlus } from 'lucide-react';

interface EmptyStateProps {
  onGetStarted?: () => void;
}

export function EmptyState({ onGetStarted }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
      <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-5">
        <MessageSquarePlus size={28} className="text-indigo-400" />
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-2">
        Your replies will appear here
      </h3>
      <p className="text-sm text-text-muted max-w-xs leading-relaxed">
        Paste an incoming message, choose your situation and desired outcome, then hit{' '}
        <span className="text-indigo-400 font-medium">Generate 3 Replies</span>.
      </p>
      <div className="mt-8 grid grid-cols-3 gap-3 w-full max-w-sm opacity-30 pointer-events-none select-none">
        {['Variation 1', 'Variation 2', 'Variation 3'].map((v) => (
          <div key={v} className="h-24 rounded-xl bg-surface-2 border border-border" />
        ))}
      </div>
      {onGetStarted && (
        <button
          onClick={onGetStarted}
          className="mt-6 text-sm text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-2"
        >
          Load a starter playbook
        </button>
      )}
    </div>
  );
}
