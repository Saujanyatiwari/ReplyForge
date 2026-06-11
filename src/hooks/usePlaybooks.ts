import { useState, useCallback } from 'react';
import type { Playbook } from '../types';
import { BUILT_IN_PLAYBOOKS } from '../types';
import { storageGet, storageSet, STORAGE_KEYS } from '../utils/localStorage';

function getInitialPlaybooks(): Playbook[] {
  const saved = storageGet<Playbook[]>(STORAGE_KEYS.PLAYBOOKS, []);

  // Ensure built-ins are always present (merge, don't duplicate)
  const savedIds = new Set(saved.map((p) => p.id));
  const builtIns: Playbook[] = BUILT_IN_PLAYBOOKS.filter(
    (b) => !savedIds.has(b.id)
  ).map((b) => ({ ...b, createdAt: 0 }));

  return [...builtIns, ...saved];
}

export function usePlaybooks() {
  const [playbooks, setPlaybooks] = useState<Playbook[]>(getInitialPlaybooks);
  const [activePlaybookId, setActivePlaybookId] = useState<string | null>(null);

  const persistCustom = useCallback((updated: Playbook[]) => {
    const custom = updated.filter((p) => !p.isBuiltIn);
    storageSet(STORAGE_KEYS.PLAYBOOKS, custom);
  }, []);

  const addPlaybook = useCallback(
    (playbook: Omit<Playbook, 'id' | 'createdAt' | 'isBuiltIn'>) => {
      const newPlaybook: Playbook = {
        ...playbook,
        id: `custom-${Date.now()}`,
        isBuiltIn: false,
        createdAt: Date.now(),
      };
      setPlaybooks((prev) => {
        const updated = [...prev, newPlaybook];
        persistCustom(updated);
        return updated;
      });
      return newPlaybook;
    },
    [persistCustom]
  );

  const deletePlaybook = useCallback(
    (id: string) => {
      setPlaybooks((prev) => {
        const updated = prev.filter((p) => p.id !== id);
        persistCustom(updated);
        return updated;
      });
      if (activePlaybookId === id) setActivePlaybookId(null);
    },
    [activePlaybookId, persistCustom]
  );

  const selectPlaybook = useCallback((id: string) => {
    setActivePlaybookId(id);
  }, []);

  const clearSelection = useCallback(() => {
    setActivePlaybookId(null);
  }, []);

  const activePlaybook = playbooks.find((p) => p.id === activePlaybookId) ?? null;

  return {
    playbooks,
    activePlaybook,
    activePlaybookId,
    addPlaybook,
    deletePlaybook,
    selectPlaybook,
    clearSelection,
  };
}
