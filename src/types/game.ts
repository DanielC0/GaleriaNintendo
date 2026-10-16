export interface Game {
  id: string;
  title: string;
  description: string;
  platforms: string[];
  releaseYear?: number;
  genres: string[];
  coverImage?: string;
  developer?: string;
  publisher?: string;
  series?: string;
}
