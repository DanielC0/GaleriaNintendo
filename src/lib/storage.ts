export const MY_GAMES_STORAGE_KEY = 'galeria-nintendo:my-games:v1';

function getStorage(): Storage | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const storage = window.localStorage;
    const probeKey = '__galeria_nintendo_probe__';
    storage.setItem(probeKey, '1');
    storage.removeItem(probeKey);
    return storage;
  } catch {
    return null;
  }
}

export function isStorageAvailable(): boolean {
  return getStorage() !== null;
}

/**
 * Devuelve la lista guardada, o `null` cuando no hay datos utilizables
 * (almacenamiento bloqueado o contenido con un formato inválido).
 * Una clave ausente se interpreta como una colección vacía.
 */
export function readStoredGameIds(): string[] | null {
  const storage = getStorage();
  if (!storage) {
    return null;
  }

  const raw = storage.getItem(MY_GAMES_STORAGE_KEY);
  if (raw === null) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return null;
    }

    const ids = parsed.filter(
      (value): value is string => typeof value === 'string' && value.trim() !== '',
    );
    return Array.from(new Set(ids));
  } catch {
    return null;
  }
}

export function writeStoredGameIds(gameIds: string[]): boolean {
  const storage = getStorage();
  if (!storage) {
    return false;
  }

  try {
    storage.setItem(MY_GAMES_STORAGE_KEY, JSON.stringify(gameIds));
    return true;
  } catch {
    return false;
  }
}
