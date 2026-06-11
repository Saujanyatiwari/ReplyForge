import { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { ChevronDown } from 'lucide-react';
import { SITUATION_OPTIONS, OUTCOME_OPTIONS, type Situation, type DesiredOutcome } from '../../types';

interface SavePlaybookModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSituation: Situation;
  initialOutcome: DesiredOutcome;
  onSave: (name: string, situation: Situation, outcome: DesiredOutcome) => void;
}

export function SavePlaybookModal({ isOpen, onClose, initialSituation, initialOutcome, onSave }: SavePlaybookModalProps) {
  const [name, setName] = useState('');
  const [situation, setSituation] = useState<Situation>(initialSituation);
  const [outcome, setOutcome] = useState<DesiredOutcome>(initialOutcome);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName('');
      setSituation(initialSituation);
      setOutcome(initialOutcome);
      setError('');
    }
  }, [isOpen, initialSituation, initialOutcome]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Please enter a playbook name.');
      return;
    }
    if (trimmed.length < 3) {
      setError('Name must be at least 3 characters.');
      return;
    }
    onSave(trimmed, situation, outcome);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Save Playbook">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            Playbook Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setError(''); }}
            placeholder="e.g. Late Payment Reminder"
            className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
            autoFocus
          />
          {error && <p className="text-xs text-red-400 mt-1.5">{error}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            Situation
          </label>
          <div className="relative">
            <select
              value={situation}
              onChange={(e) => setSituation(e.target.value as Situation)}
              className="w-full appearance-none bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all pr-10 cursor-pointer"
            >
              {SITUATION_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            Desired Outcome
          </label>
          <div className="relative">
            <select
              value={outcome}
              onChange={(e) => setOutcome(e.target.value as DesiredOutcome)}
              className="w-full appearance-none bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all pr-10 cursor-pointer"
            >
              {OUTCOME_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
            />
          </div>
        </div>
        <p className="text-xs text-text-muted">
          Saves your current situation, desired outcome, and writing examples.
        </p>
        <div className="flex gap-3 pt-1">
          <Button type="button" variant="secondary" onClick={handleClose} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" variant="primary" className="flex-1">
            Save Playbook
          </Button>
        </div>
      </form>
    </Modal>
  );
}
