'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import AdBlocker from '@/components/AdBlocker';
import { Movie } from '@/types/movie';

// Sample data for search results
const SAMPLE_MOVIES = [
  { id: 1, title: 'The Matrix', overview: 'A computer hacker learns about the true nature of his reality.', poster_path: null, backdrop_path: null, release_date: '1999-03-30', vote_average: 8.7, vote_count: 20000, genre_ids: [28], adult: false, original_language: 'en', original_title: 'The Matrix', popularity: 100, video: false },
  { id: 2, title: 'Inception', overview: 'A thief who steals corporate secrets.', poster_path: null, backdrop_path: null, release_date: '2010-07-16', vote_average: 8.4, vote_count: 15000, genre_ids: [28], adult: false, original_language: 'en', original_title: 'Inception', popularity: 90, video: false },
  { id: 3, title: 'Interstellar', overview: 'A team of explorers travel through a wormhole in space.', poster_path: null, backdrop_path: null, release_date: '2014-11-07', vote_average: 8.6, vote_count: 18000, genre_ids: [878], adult: false, original_language: 'en', original_title: 'Interstellar', popularity: 85, video: false },
  { id: 4, title: 'The Dark Knight', overview: 'When the menace known as the Joker wreaks havoc.', poster_path: null, backdrop_path: null, release_date: '2008-07-18', vote_average: 9.0, vote_count: 25000, genre_ids: [28], adult: false, original_language: 'en', original_title: 'The Dark Knight', popularity: 95, video: false },
];

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => {
      // Filter sample data based on search query
      const results = SAMPLE_MOVIES.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.overview.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };

  return (
    <main className="min-h-screen bg-black">
      <AdBlocker />
      <Header />
      
      <div className="pt-20 px-4 md:px-8">
        <h1 className="text-white text-3xl font-bold mb-8">Search Movies</h1>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative max-w-2xl">
            <input
              type="text"
              placeholder="Search for movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 text-white px-6 py-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="absolute right-2 top-2 bottom-2 px-6 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {/* Search Results */}
        {searchQuery && (
          <div>
            <h2 className="text-white text-xl font-semibold mb-4">
              {isSearching ? 'Searching...' : `Results for "${searchQuery}"`}
            </h2>
            
            {isSearching ? (
              <div className="text-gray-400">Loading search results...</div>
            ) : searchResults.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {searchResults.map((movie) => (
                  <div key={movie.id} className="bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer">
                    <div className="aspect-[2/3] bg-gray-800 flex items-center justify-center">
                      <div className="text-4xl text-gray-600">🎬</div>
                    </div>
                    <div className="p-3">
                      <h3 className="text-white font-semibold text-sm mb-1">{movie.title}</h3>
                      <p className="text-gray-400 text-xs mb-2">{new Date(movie.release_date).getFullYear()}</p>
                      <p className="text-yellow-400 text-xs">★ {movie.vote_average.toFixed(1)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-400">No movies found for "{searchQuery}"</div>
            )}
          </div>
        )}

        {/* Popular Searches */}
        {!searchQuery && (
          <div>
            <h2 className="text-white text-xl font-semibold mb-4">Popular Searches</h2>
            <div className="flex flex-wrap gap-2">
              {['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller'].map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSearchQuery(genre)}
                  className="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors"
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}