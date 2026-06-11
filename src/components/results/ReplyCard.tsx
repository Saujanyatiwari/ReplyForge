import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import type { Reply, QuickAction } from '../../types';
import { QUICK_ACTION_OPTIONS } from '../../types';
import { useApp } from '../../context/AppContext';
import { cn } from '../../utils/cn';

interface ReplyCardProps {
  reply: Reply;
  index: number;
}

export function ReplyCard({ reply, index }: ReplyCardProps) {
  const { refineReply } = useApp();
  const [copied, setCopied] = useState(false);
  const [refiningAction, setRefiningAction] = useState<QuickAction | null>(null);

  const isRefining = reply.title.includes('(refining…)');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(reply.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = reply.content;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleQuickAction = async (action: QuickAction) => {
    if (isRefining || refiningAction) return;
    setRefiningAction(action);
    await refineReply(reply.id, action);
    setRefiningAction(null);
  };

  const cardAccents = [
    'border-indigo-500/20 hover:border-indigo-500/40',
    'border-violet-500/20 hover:border-violet-500/40',
    'border-purple-500/20 hover:border-purple-500/40',
  ];

  const badgeColors = [
    'bg-indigo-500/10 text-indigo-400',
    'bg-violet-500/10 text-violet-400',
    'bg-purple-500/10 text-purple-400',
  ];

  return (
    <div
      className={cn(
        'flex flex-col gap-0 bg-surface border rounded-2xl overflow-hidden shadow-sm transition-all duration-200 animate-fade-in',
        cardAccents[index % 3],
        isRefining && 'opacity-70 pointer-events-none'
      )}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Card header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border">
        <div className="flex items-center gap-2.5">
          {isRefining ? (
            <RefreshCw size={13} className="text-text-muted animate-spin" />
          ) : (
            <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-md', badgeColors[index % 3])}>
              {index + 1}
            </span>
          )}
          <h3 className="text-sm font-semibold text-text-primary leading-tight">
            {isRefining ? 'Refining…' : reply.title}
          </h3>
        </div>
        <button
          id={`copy-reply-${index + 1}`}
          onClick={handleCopy}
          disabled={isRefining}
          className={cn(
            'flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all duration-150 font-medium shrink-0',
            copied
              ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
              : 'text-text-muted bg-surface-2 border-border hover:text-text-primary hover:border-indigo-500/30'
          )}
          aria-label="Copy reply to clipboard"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Reply content */}
      <div className="px-4 py-4 flex-1">
        <p className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap">
          {reply.content}
        </p>
      </div>

      {/* Quick actions */}
      <div className="px-4 pb-4 pt-1">
        <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-2">Refine</p>
        <div className="flex flex-wrap gap-1.5">
          {QUICK_ACTION_OPTIONS.map((action) => (
            <button
              key={action.value}
              id={`quick-action-${reply.id}-${action.value}`}
              onClick={() => handleQuickAction(action.value)}
              disabled={!!refiningAction || isRefining}
              className={cn(
                'flex items-center gap-1 text-[11px] font-medium px-2.5 py-1.5 rounded-lg border transition-all duration-150',
                refiningAction === action.value
                  ? 'text-indigo-300 bg-indigo-500/15 border-indigo-500/30'
                  : 'text-text-muted bg-surface-2 border-border hover:border-indigo-500/30 hover:text-text-primary hover:bg-indigo-500/5 disabled:opacity-40 disabled:cursor-not-allowed'
              )}
            >
              <span>{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
