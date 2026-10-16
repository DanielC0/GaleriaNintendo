import type { ReactNode } from 'react';

interface TagProps {
  children: ReactNode;
}

export function Tag({ children }: TagProps) {
  return (
    <span className="inline-flex items-center rounded border border-line bg-canvas px-2 py-0.5 font-display text-[11px] font-bold uppercase tracking-[0.12em] text-ink">
      {children}
    </span>
  );
}
