import { useApp } from '../../context/AppContext';

export function RoleInput() {
  const { role, setRole } = useApp();

  return (
    <div className="space-y-2">
      <label htmlFor="role-input" className="block text-sm font-semibold text-text-primary">
        My Role
        <span className="ml-2 text-xs font-normal text-text-muted">(optional)</span>
      </label>
      <p className="text-xs text-text-muted">Helps tailor the tone for your professional context.</p>
      <input
        id="role-input"
        type="text"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="e.g. Freelance Designer, Product Manager, Founder…"
        className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 transition-all"
      />
    </div>
  );
}
