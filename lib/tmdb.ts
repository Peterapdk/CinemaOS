import { Movie, MovieDetails, MovieCredits, MovieVideos, Genre, MovieCategory } from '@/types/movie';

const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!TMDB_API_TOKEN) {
  throw new Error('TMDB API token is required');
}

const TMDB_API_HEADERS = {
  'Authorization': `Bearer ${TMDB_API_TOKEN}`,
  'Content-Type': 'application/json',
};

// Exclude K-drama and anime from API calls
const EXCLUDED_GENRE_IDS = [207, 16, 99]; // Korea, Anime, Documentary

class TMDBAPI {
  private async fetchAPI(endpoint: string, params: Record<string, any> = {}) {
    const url = new URL(`${TMDB_API_BASE_URL}${endpoint}`);
    
    // Add API token
    url.searchParams.append('api_key', TMDB_API_TOKEN!);
    
    // Add additional params
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value.toString());
      }
    });

    const response = await fetch(url.toString(), {
      headers: TMDB_API_HEADERS,
    });

    if (!response.ok) {
      throw new Error(`TMDB API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getMovies(category: MovieCategory, page: number = 1) {
    const endpoint = category === 'trending' ? '/trending/movie/week' : `/movie/${category}`;
    
    return this.fetchAPI(endpoint, {
      page,
      include_adult: false,
    });
  }

  async searchMovies(query: string, page: number = 1) {
    return this.fetchAPI('/search/movie', {
      query: query.trim(),
      page,
      include_adult: false,
      language: 'en-US',
    });
  }

  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    return this.fetchAPI(`/movie/${movieId}`);
  }

  async getMovieCredits(movieId: number): Promise<MovieCredits> {
    return this.fetchAPI(`/movie/${movieId}/credits`);
  }

  async getMovieVideos(movieId: number): Promise<MovieVideos> {
    return this.fetchAPI(`/movie/${movieId}/videos`);
  }

  async getGenres(): Promise<{ genres: Genre[] }> {
    const response = await this.fetchAPI('/genre/movie/list');
    
    // Filter out excluded genres
    response.genres = response.genres.filter((genre: Genre) => 
      !EXCLUDED_GENRE_IDS.includes(genre.id)
    );
    
    return response;
  }

  async getMoviesByGenre(genreId: number, page: number = 1) {
    return this.fetchAPI('/discover/movie', {
      with_genres: genreId,
      page,
      include_adult: false,
      sort_by: 'popularity.desc',
    });
  }

  async getSimilarMovies(movieId: number, page: number = 1) {
    return this.fetchAPI(`/movie/${movieId}/similar`, { page });
  }

  // Utility method to get image URL
  getImageUrl(path: string | null, size: 'w200' | 'w300' | 'w400' | 'w500' | 'original' = 'w500'): string {
    if (!path) return '/placeholder-poster.svg';
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }

  // Utility method to format movie runtime
  formatRuntime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return hours > 0 ? `${hours}h ${remainingMinutes}m` : `${remainingMinutes}m`;
  }

  // Utility method to format release year
  getReleaseYear(releaseDate: string): string {
    return new Date(releaseDate).getFullYear().toString();
  }

  // Utility method to get genre names
  getGenreNames(genreIds: number[], allGenres: Genre[]): string[] {
    return genreIds
      .map(id => allGenres.find(genre => genre.id === id)?.name)
      .filter(Boolean) as string[];
  }
}

export const tmdbAPI = new TMDBAPI();

// Cache for genres to avoid repeated API calls
let genresCache: Genre[] | null = null;

export async function getCachedGenres(): Promise<Genre[]> {
  if (genresCache) return genresCache;
  
  const response = await tmdbAPI.getGenres();
  genresCache = response.genres;
  return genresCache;
}