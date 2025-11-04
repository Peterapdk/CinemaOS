import { Movie, MovieDetails, MovieCredits, MovieVideos, Genre, MovieCategory } from '@/types/movie';

const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';

class TMDBAPI {
  private apiToken: string | null = null;
  private initialized = false;

  private initialize() {
    if (!this.initialized) {
      this.apiToken = process.env.NEXT_PUBLIC_TMDB_API_KEY || null;
      this.initialized = true;
    }
  }

  private get headers(): Record<string, string> {
    this.initialize();
    if (!this.apiToken) {
      console.warn('TMDB API token not found. API calls will return sample data.');
      return {
        'Content-Type': 'application/json',
      };
    }
    return {
      'Authorization': `Bearer ${this.apiToken}`,
      'Content-Type': 'application/json',
    };
  }

  private get hasValidToken() {
    this.initialize();
    return !!this.apiToken && this.apiToken !== 'your_tmdb_api_key_here';
  }

  private async fetchAPI(endpoint: string, params: Record<string, any> = {}) {
    // If no valid API token, return sample data
    if (!this.hasValidToken) {
      return this.getSampleData(endpoint);
    }

    const url = new URL(`${TMDB_API_BASE_URL}${endpoint}`);
    
    // Add API token
    url.searchParams.append('api_key', this.apiToken!);
    
    // Add additional params
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value.toString());
      }
    });

    try {
      const response = await fetch(url.toString(), {
        headers: this.headers,
      });

      if (!response.ok) {
        console.warn(`TMDB API Error: ${response.status} ${response.statusText}, using sample data`);
        return this.getSampleData(endpoint);
      }

      return response.json();
    } catch (error) {
      console.warn(`Failed to fetch from TMDB API: ${error}, using sample data`);
      return this.getSampleData(endpoint);
    }
  }

  private getSampleData(endpoint: string) {
    // Return sample movie data based on endpoint
    const sampleMovies = [
      { id: 1, title: 'The Matrix', overview: 'A computer hacker learns about the true nature of his reality.', poster_path: null, backdrop_path: null, release_date: '1999-03-30', vote_average: 8.7, vote_count: 20000, genre_ids: [28], adult: false, original_language: 'en', original_title: 'The Matrix', popularity: 100, video: false },
      { id: 2, title: 'Inception', overview: 'A thief who steals corporate secrets.', poster_path: null, backdrop_path: null, release_date: '2010-07-16', vote_average: 8.4, vote_count: 15000, genre_ids: [28], adult: false, original_language: 'en', original_title: 'Inception', popularity: 90, video: false },
      { id: 3, title: 'Interstellar', overview: 'A team of explorers travel through a wormhole in space.', poster_path: null, backdrop_path: null, release_date: '2014-11-07', vote_average: 8.6, vote_count: 18000, genre_ids: [878], adult: false, original_language: 'en', original_title: 'Interstellar', popularity: 85, video: false },
      { id: 4, title: 'The Dark Knight', overview: 'When the menace known as the Joker wreaks havoc.', poster_path: null, backdrop_path: null, release_date: '2008-07-18', vote_average: 9.0, vote_count: 25000, genre_ids: [28], adult: false, original_language: 'en', original_title: 'The Dark Knight', popularity: 95, video: false },
      { id: 5, title: 'Pulp Fiction', overview: 'The lives of two mob hitmen, a boxer, a gangster and his wife.', poster_path: null, backdrop_path: null, release_date: '1994-10-14', vote_average: 8.9, vote_count: 17000, genre_ids: [53], adult: false, original_language: 'en', original_title: 'Pulp Fiction', popularity: 80, video: false },
    ];

    return {
      results: sampleMovies,
      total_pages: 1,
      total_results: sampleMovies.length,
    };
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
    
    // Exclude K-drama and anime from API calls
    const EXCLUDED_GENRE_IDS = [207, 16, 99]; // Korea, Anime, Documentary
    
    // Filter out excluded genres if we have a real response
    if (response.genres && Array.isArray(response.genres)) {
      response.genres = response.genres.filter((genre: Genre) => 
        !EXCLUDED_GENRE_IDS.includes(genre.id)
      );
    } else {
      // Return sample genres if no API data
      response.genres = [
        { id: 28, name: 'Action' },
        { id: 12, name: 'Adventure' },
        { id: 16, name: 'Animation' },
        { id: 35, name: 'Comedy' },
        { id: 80, name: 'Crime' },
        { id: 99, name: 'Documentary' },
        { id: 18, name: 'Drama' },
        { id: 10751, name: 'Family' },
        { id: 14, name: 'Fantasy' },
        { id: 36, name: 'History' },
        { id: 27, name: 'Horror' },
        { id: 10402, name: 'Music' },
        { id: 9648, name: 'Mystery' },
        { id: 10749, name: 'Romance' },
        { id: 878, name: 'Science Fiction' },
        { id: 10770, name: 'TV Movie' },
        { id: 53, name: 'Thriller' },
        { id: 10752, name: 'War' },
        { id: 37, name: 'Western' }
      ];
    }
    
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