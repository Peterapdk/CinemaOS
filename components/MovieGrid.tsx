'use client';

import { Play, Star } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { Movie } from '@/types/movie';
import { tmdbAPI } from '@/lib/tmdb';

interface MovieGridProps {
  searchQuery: string;
  title?: string;
}

export default function MovieGrid({ searchQuery, title = "Popular Movies" }: MovieGridProps) {
  const [movies, setMovies] = useState<Movie[]>([]);

  // Sample data to use as fallback when API is not available
  const sampleMovies: Movie[] = [
    { id: 1, title: 'The Matrix', overview: 'A computer hacker learns about the true nature of his reality.', poster_path: null, backdrop_path: null, release_date: '1999-03-30', vote_average: 8.7, vote_count: 20000, genre_ids: [28], adult: false, original_language: 'en', original_title: 'The Matrix', popularity: 100, video: false },
    { id: 2, title: 'Inception', overview: 'A thief who steals corporate secrets.', poster_path: null, backdrop_path: null, release_date: '2010-07-16', vote_average: 8.4, vote_count: 15000, genre_ids: [28], adult: false, original_language: 'en', original_title: 'Inception', popularity: 90, video: false },
    { id: 3, title: 'Interstellar', overview: 'A team of explorers travel through a wormhole in space.', poster_path: null, backdrop_path: null, release_date: '2014-11-07', vote_average: 8.6, vote_count: 18000, genre_ids: [878], adult: false, original_language: 'en', original_title: 'Interstellar', popularity: 85, video: false },
    { id: 4, title: 'The Dark Knight', overview: 'When the menace known as the Joker wreaks havoc.', poster_path: null, backdrop_path: null, release_date: '2008-07-18', vote_average: 9.0, vote_count: 25000, genre_ids: [28], adult: false, original_language: 'en', original_title: 'The Dark Knight', popularity: 95, video: false },
    { id: 5, title: 'Pulp Fiction', overview: 'The lives of two mob hitmen, a boxer, a gangster and his wife.', poster_path: null, backdrop_path: null, release_date: '1994-10-14', vote_average: 8.9, vote_count: 17000, genre_ids: [53], adult: false, original_language: 'en', original_title: 'Pulp Fiction', popularity: 80, video: false },
    { id: 6, title: 'The Godfather', overview: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', poster_path: null, backdrop_path: null, release_date: '1972-03-14', vote_average: 9.2, vote_count: 18000, genre_ids: [80, 18], adult: false, original_language: 'en', original_title: 'The Godfather', popularity: 75, video: false },
    { id: 7, title: 'Forrest Gump', overview: 'Forrest Gump, while not intelligent, has accidentally been present at many historic moments.', poster_path: null, backdrop_path: null, release_date: '1994-06-23', vote_average: 8.8, vote_count: 22000, genre_ids: [35, 18], adult: false, original_language: 'en', original_title: 'Forrest Gump', popularity: 85, video: false },
    { id: 8, title: 'Fight Club', overview: 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club.', poster_path: null, backdrop_path: null, release_date: '1999-10-15', vote_average: 8.8, vote_count: 25000, genre_ids: [53, 28], adult: false, original_language: 'en', original_title: 'Fight Club', popularity: 90, video: false },
  ];

  // Initialize with sample data
  useEffect(() => {
    setMovies(sampleMovies);
  }, []);

  const filteredMovies = useMemo(() => {
    if (!searchQuery.trim()) return movies;
    return movies.filter(movie =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.overview.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [movies, searchQuery]);

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-white">{title}</h3>
      
      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {filteredMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-12">
          <p className="text-lg">No movies found</p>
          {searchQuery && <p className="text-sm mt-2">Try searching for something else</p>}
        </div>
      )}
    </div>
  );
}

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Poster Image */}
      <div className="relative h-64 rounded-lg overflow-hidden mb-3 bg-[#2a2a2a]">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl text-gray-600 bg-[#1a1a1a]">
            🎬
          </div>
        )}

        {/* Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <button className="bg-[#fbbf24] text-black p-4 rounded-full hover:bg-yellow-400 transition-colors">
              <Play size={24} fill="currentColor" />
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <h4 className="font-semibold text-sm text-white mb-1 group-hover:text-[#fbbf24] transition-colors line-clamp-2">
        {movie.title}
      </h4>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-[#fbbf24]">
          <Star size={14} fill="currentColor" />
          <span className="text-xs">{movie.vote_average.toFixed(1)}</span>
        </div>
        <span className="text-xs text-gray-400">
          {new Date(movie.release_date).getFullYear()}
        </span>
      </div>
    </div>
  );
}