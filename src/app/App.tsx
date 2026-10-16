import { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { GameDetails } from '../components/games/GameDetails';
import { GalleryPage } from '../pages/GalleryPage';
import { MyGamesPage } from '../pages/MyGamesPage';
import { games } from '../data/games';
import type { MainView } from '../types/navigation';

export function App() {
  const [view, setView] = useState<MainView>('gallery');
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

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

  return (
    <>
      <MainLayout activeView={view} onNavigate={handleNavigate}>
        {view === 'gallery' ? (
          <GalleryPage onOpenDetails={handleOpenDetails} />
        ) : (
          <MyGamesPage onExploreGallery={() => handleNavigate('gallery')} />
        )}
      </MainLayout>
      {selectedGame ? <GameDetails game={selectedGame} onClose={handleCloseDetails} /> : null}
    </>
  );
}
