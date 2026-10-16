import type { Game } from '../../types/game';
import { GameCard } from './GameCard';

interface GameGridProps {
  games: Game[];
  onOpenDetails: (gameId: string) => void;
}

export function GameGrid({ games, onOpenDetails }: GameGridProps) {
  return (
    <ul className="grid grid-cols-1 gap-5 min-[420px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
      {games.map((game) => (
        <li key={game.id}>
          <GameCard game={game} onOpenDetails={onOpenDetails} />
        </li>
      ))}
    </ul>
  );
}
