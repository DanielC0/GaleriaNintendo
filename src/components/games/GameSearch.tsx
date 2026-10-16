import { useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { Search, X } from 'lucide-react';

interface GameSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function GameSearch({ value, onChange }: GameSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape' && value !== '') {
      event.preventDefault();
      handleClear();
    }
  };

  return (
    <div className="mt-6 max-w-xl">
      <label
        htmlFor="game-search"
        className="font-display text-xs font-bold uppercase tracking-[0.16em] text-ink-muted"
      >
        Buscar por nombre
      </label>
      <div className="relative mt-2">
        <Search
          size={18}
          aria-hidden="true"
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted"
        />
        <input
          ref={inputRef}
          id="game-search"
          type="text"
          inputMode="search"
          autoComplete="off"
          spellCheck={false}
          placeholder="Ej.: Zelda, Mario, Pokémon…"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full rounded-md border border-line bg-surface py-3 pl-11 pr-12 text-sm text-ink shadow-sm placeholder:text-ink-muted transition focus:border-accent focus:outline-2 focus:outline-accent"
        />
        {value !== '' ? (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Borrar búsqueda"
            className="absolute right-2.5 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-md text-ink-muted transition hover:bg-accent-tint hover:text-accent-dark focus-visible:outline-2 focus-visible:outline-accent"
          >
            <X size={16} aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
