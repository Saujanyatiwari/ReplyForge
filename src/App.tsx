import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { IncomingMessage } from './components/workspace/IncomingMessage';
import { SituationSelector } from './components/workspace/SituationSelector';
import { OutcomeSelector } from './components/workspace/OutcomeSelector';
import { RoleInput } from './components/workspace/RoleInput';
import { WritingExamples } from './components/workspace/WritingExamples';
import { GenerateButton } from './components/workspace/GenerateButton';
import { ReplyGrid } from './components/results/ReplyGrid';
import { SettingsPanel } from './components/settings/SettingsPanel';
import { ToastContainer } from './components/ui/Toast';
import { AppProvider, useApp } from './context/AppContext';

function Divider() {
  return <div className="h-px bg-border" />;
}

function SectionLabel({ label }: { label: string }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-0.5">
      {label}
    </p>
  );
}

function AppShell() {
  const { toasts, removeToast } = useApp();

  return (
    <div className="flex h-screen bg-bg overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />

        {/* Two-column workspace */}
        <div className="flex flex-1 overflow-hidden">

          {/* Left column — Inputs */}
          <main className="w-full md:w-[420px] lg:w-[460px] xl:w-[500px] shrink-0 flex flex-col overflow-y-auto border-r border-border bg-surface">
            <div className="px-5 py-6 space-y-6">
              <IncomingMessage />
              <Divider />
              <SectionLabel label="Context" />
              <SituationSelector />
              <OutcomeSelector />
              <RoleInput />
              <Divider />
              <SectionLabel label="Style" />
              <WritingExamples />
              <Divider />
              <GenerateButton />
              {/* bottom padding for mobile scroll */}
              <div className="h-4" />
            </div>
          </main>

          {/* Right column — Results */}
          <section className="flex-1 overflow-y-auto bg-bg">
            <div className="max-w-2xl mx-auto px-5 py-6">
              <ReplyGrid />
            </div>
          </section>
        </div>
      </div>

      {/* Overlays */}
      <SettingsPanel />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
