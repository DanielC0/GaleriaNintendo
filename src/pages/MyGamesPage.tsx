import { Bookmark } from 'lucide-react';
import { EmptyState } from '../components/ui/EmptyState';

interface MyGamesPageProps {
  onExploreGallery: () => void;
}

export function MyGamesPage({ onExploreGallery }: MyGamesPageProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="max-w-2xl">
        <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-accent-dark">
          Tu colección
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Mis juegos</h1>
        <p className="mt-3 leading-relaxed text-ink-muted">
          Los títulos que guardes aparecerán aquí para encontrarlos rápido. La colección se guarda
          únicamente en este navegador.
        </p>
      </header>

      <div className="mt-8">
        <EmptyState
          icon={<Bookmark size={22} />}
          title="Tu colección todavía está vacía"
          message="Todavía no has guardado ningún título. Explora la galería y vuelve aquí cuando quieras armar tu lista."
          action={{
            label: 'Explorar la galería',
            onAction: onExploreGallery,
          }}
        />
      </div>
    </section>
  );
}
