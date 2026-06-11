import { useApp } from '../../context/AppContext';

export function IncomingMessage() {
  const { incomingMessage, setIncomingMessage } = useApp();

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-text-primary">
        Incoming Message
        <span className="text-red-400 ml-0.5">*</span>
      </label>
      <p className="text-xs text-text-muted">Paste the exact message you received and need to respond to.</p>
      <textarea
        id="incoming-message"
        value={incomingMessage}
        onChange={(e) => setIncomingMessage(e.target.value)}
        placeholder="Paste the message here…"
        rows={6}
        className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 resize-none transition-all leading-relaxed"
      />
      {incomingMessage.length > 0 && (
        <p className="text-xs text-text-muted text-right">{incomingMessage.length} characters</p>
      )}
    </div>
  );
}
