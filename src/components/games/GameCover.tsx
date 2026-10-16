import { useState } from 'react';
import type { Game } from '../../types/game';

interface GameCoverProps {
  game: Game;
  className?: string;
}

interface CoverTint {
  background: string;
  ink: string;
}

const coverPalette: Record<string, CoverTint> = {
  Plataformas: { background: '#f2c14e', ink: '#43350b' },
  Aventura: { background: '#52b788', ink: '#0e2f24' },
  Carreras: { background: '#e76f51', ink: '#41140a' },
  Rol: { background: '#8073b3', ink: '#f6f3fc' },
  Puzle: { background: '#457b9d', ink: '#edf5f9' },
  Lucha: { background: '#bc4749', ink: '#fdeeed' },
  Simulación: { background: '#95d5b2', ink: '#10372a' },
  Shooter: { background: '#2b2d42', ink: '#e8eaf6' },
  Estrategia: { background: '#dda15e', ink: '#432818' },
};

const defaultTint: CoverTint = { background: '#e8e0d0', ink: '#3a342b' };

const connectorWords = new Set(['the', 'of', 'and', 'y', 'de', 'del', 'a']);

function getMonogram(title: string): string {
  const letters = title
    .split(/\s+/)
    .filter((word) => !connectorWords.has(word.toLowerCase()))
    .map((word) => word.replace(/[^\p{L}\p{N}]/gu, ''))
    .filter((word) => word.length > 0)
    .map((word) => word.charAt(0).toUpperCase());

  return letters.slice(0, 4).join('');
}

function CoverFallback({ game, className }: GameCoverProps) {
  const genre = game.genres[0];
  const tint = (genre ? coverPalette[genre] : undefined) ?? defaultTint;
  const monogram = getMonogram(game.title);
  const monogramSize = monogram.length <= 2 ? 'text-6xl' : 'text-5xl';

  return (
    <div
      className={`relative flex h-full w-full flex-col justify-between overflow-hidden p-3 ${className ?? ''}`}
      style={{ backgroundColor: tint.background }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-y-0 right-0 w-2/5 opacity-20"
        style={{
          backgroundImage:
            'repeating-linear-gradient(160deg, rgba(255, 255, 255, 0.6) 0 6px, transparent 6px 18px)',
        }}
      />
      <div className="relative flex items-center justify-between gap-2">
        <span
          className="font-display text-[10px] font-bold uppercase tracking-[0.18em]"
          style={{ color: tint.ink }}
        >
          {genre ?? 'Videojuego'}
        </span>
        <span
          className="size-2 shrink-0 rounded-full opacity-60"
          style={{ backgroundColor: tint.ink }}
        />
      </div>
      <span
        className={`relative font-display font-black leading-none tracking-tight ${monogramSize}`}
        style={{ color: tint.ink }}
      >
        {monogram}
      </span>
    </div>
  );
}

export function GameCover({ game, className }: GameCoverProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(game.coverImage) && !failed;

  if (showImage && game.coverImage) {
    return (
      <img
        src={game.coverImage}
        alt={`Portada de ${game.title}`}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover ${className ?? ''}`}
      />
    );
  }

  return <CoverFallback game={game} className={className} />;
}
