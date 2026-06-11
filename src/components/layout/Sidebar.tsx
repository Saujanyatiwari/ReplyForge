import { useState } from 'react';
import { Plus, BookOpen, Trash2, ChevronRight, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { Playbook } from '../../types';
import { SavePlaybookModal } from '../playbooks/SavePlaybookModal';
import { cn } from '../../utils/cn';

function PlaybookItem({
  playbook,
  isActive,
  onSelect,
  onDelete,
}: {
  playbook: Playbook;
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      className={cn(
        'group flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all duration-150 border',
        isActive
          ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
          : 'border-transparent hover:bg-surface-2 hover:border-border text-text-primary'
      )}
      onClick={onSelect}
    >
      <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-base transition-colors',
        isActive ? 'bg-indigo-500/20' : 'bg-surface-2 group-hover:bg-border'
      )}>
        {playbook.isBuiltIn ? '📋' : '⭐'}
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn('text-sm font-medium truncate', isActive ? 'text-indigo-300' : '')}>
          {playbook.name}
        </p>
        <p className="text-xs text-text-muted truncate mt-0.5">
          {playbook.isBuiltIn ? 'Built-in' : 'Custom'}
        </p>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        {!playbook.isBuiltIn && (
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-red-500/20 hover:text-red-400 text-text-muted transition-all"
            aria-label="Delete playbook"
          >
            <Trash2 size={13} />
          </button>
        )}
        <ChevronRight
          size={14}
          className={cn('text-text-muted transition-transform', isActive && 'rotate-90 text-indigo-400')}
        />
      </div>
    </div>
  );
}

export function Sidebar() {
  const {
    playbooks,
    activePlaybookId,
    selectPlaybook,
    deletePlaybook,
    addPlaybook,
    isSidebarOpen,
    setIsSidebarOpen,
    situation,
    desiredOutcome,
    writingExamples,
    addToast,
  } = useApp();

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const handleSavePlaybook = (name: string, editedSituation: typeof situation, editedOutcome: typeof desiredOutcome) => {
    addPlaybook({ name, situation: editedSituation, desiredOutcome: editedOutcome, writingExamples });
    addToast('success', `Playbook "${name}" saved!`);
    setIsSaveModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    deletePlaybook(id);
    addToast('info', `Playbook "${name}" deleted.`);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed md:relative z-20 md:z-auto top-0 left-0 h-full md:h-auto w-72 bg-surface border-r border-border flex flex-col transition-transform duration-300 md:translate-x-0 md:flex md:w-64 lg:w-72',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-4 pt-5 pb-3 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <BookOpen size={15} className="text-indigo-400" />
            <span className="text-sm font-semibold text-text-primary">My Playbooks</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-2 transition-colors md:hidden"
          >
            <X size={16} />
          </button>
        </div>

        {/* Playbook list */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          {playbooks.map((pb) => (
            <PlaybookItem
              key={pb.id}
              playbook={pb}
              isActive={activePlaybookId === pb.id}
              onSelect={() => selectPlaybook(pb.id)}
              onDelete={() => handleDelete(pb.id, pb.name)}
            />
          ))}
        </div>

        {/* Bottom actions */}
        <div className="px-3 py-4 border-t border-border space-y-2 shrink-0">
          <button
            onClick={() => setIsSaveModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 transition-all duration-150"
          >
            <Plus size={15} />
            Save Current as Playbook
          </button>
        </div>
      </aside>

      <SavePlaybookModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        initialSituation={situation}
        initialOutcome={desiredOutcome}
        onSave={handleSavePlaybook}
      />
    </>
  );
}
