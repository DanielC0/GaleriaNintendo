import type { ReactNode } from 'react';

interface EmptyStateAction {
  label: string;
  onAction: () => void;
}

interface EmptyStateProps {
  title: string;
  message: string;
  action?: EmptyStateAction;
  icon?: ReactNode;
}

export function EmptyState({ title, message, action, icon }: EmptyStateProps) {
  return (
    <section className="flex flex-col items-center justify-center rounded-lg border border-dashed border-line bg-surface px-6 py-14 text-center">
      {icon ? (
        <div className="mb-4 grid size-12 place-items-center rounded-md bg-accent-tint text-accent-dark" aria-hidden="true">
          {icon}
        </div>
      ) : null}
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-muted">{message}</p>
      {action ? (
        <button
          type="button"
          onClick={action.onAction}
          className="mt-6 inline-flex min-h-10 items-center gap-2 rounded-md bg-accent-dark px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {action.label}
        </button>
      ) : null}
    </section>
  );
}
