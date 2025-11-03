export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
}

export interface MovieDetails extends Movie {
  runtime: number;
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  homepage: string;
  imdb_id: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface MovieCredits {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
}

export interface MovieVideos {
  id: number;
  results: Video[];
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface ApiError {
  status_message: string;
  status_code: number;
}

// Filter out K-drama and anime genres
export const EXCLUDED_GENRES = {
  KOREA: 207,
  ANIME: 16,
  DOCUMENTARY: 99,
};

export const INCLUDED_GENRES = {
  ACTION: 28,
  ADVENTURE: 12,
  COMEDY: 35,
  DRAMA: 18,
  HORROR: 27,
  ROMANCE: 10749,
  SCI_FI: 878,
  THRILLER: 53,
  WESTERN: 37,
  WAR: 10752,
  MYSTERY: 9648,
  CRIME: 80,
  FANTASY: 14,
  MUSIC: 10402,
  FAMILY: 10751,
  HISTORY: 36,
};

export type MovieCategory = 'trending' | 'popular' | 'top_rated' | 'upcoming' | 'now_playing';

export interface CategoryInfo {
  key: MovieCategory;
  label: string;
  genre?: number;
}