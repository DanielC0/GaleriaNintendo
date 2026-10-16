import { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { GameDetails } from '../components/games/GameDetails';
import { GalleryPage } from '../pages/GalleryPage';
import { MyGamesPage } from '../pages/MyGamesPage';
import { games } from '../data/games';
import { useMyGames } from '../hooks/useMyGames';
import { useTheme } from '../hooks/useTheme';
import type { MainView } from '../types/navigation';

export function App() {
  const [view, setView] = useState<MainView>('gallery');
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const {
    gameIds,
    savedCount,
    isPersistent,
    hasGame,
    toggleGame,
    removeGame,
    pruneMissingGames,
  } = useMyGames();
  const { theme, toggleTheme } = useTheme();

  const selectedGame =
    selectedGameId == null
      ? null
      : (games.find((game) => game.id === selectedGameId) ?? null);

  const handleNavigate = (nextView: MainView) => {
    setView(nextView);
    setSelectedGameId(null);
    window.scrollTo({ top: 0 });
  };

  const handleOpenDetails = (gameId: string) => {
    setSelectedGameId(gameId);
  };

  const handleCloseDetails = () => {
    setSelectedGameId(null);
  };

  const handlePruneMissing = () => {
    pruneMissingGames(games.map((game) => game.id));
  };

  return (
    <>
      <MainLayout
        activeView={view}
        savedCount={savedCount}
        theme={theme}
        onNavigate={handleNavigate}
        onToggleTheme={toggleTheme}
      >
        {view === 'gallery' ? (
          <GalleryPage
            isGameSaved={hasGame}
            onOpenDetails={handleOpenDetails}
            onToggleCollection={toggleGame}
          />
        ) : (
          <MyGamesPage
            gameIds={gameIds}
            isPersistent={isPersistent}
            onOpenDetails={handleOpenDetails}
            onRemove={removeGame}
            onPruneMissing={handlePruneMissing}
            onExploreGallery={() => handleNavigate('gallery')}
          />
        )}
      </MainLayout>
      {selectedGame ? (
        <GameDetails
          game={selectedGame}
          isSaved={hasGame(selectedGame.id)}
          onToggleCollection={toggleGame}
          onClose={handleCloseDetails}
        />
      ) : null}
    </>
  );
}
