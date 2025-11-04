'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import AdBlocker from '@/components/AdBlocker';
import { Movie } from '@/types/movie';

// Sample data organized by genres
const GENRE_MOVIES = {
  action: [
    { id: 1, title: 'The Matrix', overview: 'A computer hacker learns about the true nature of his reality.', poster_path: null, backdrop_path: null, release_date: '1999-03-30', vote_average: 8.7, vote_count: 20000, genre_ids: [28], adult: false, original_language: 'en', original_title: 'The Matrix', popularity: 100, video: false },
    { id: 2, title: 'Inception', overview: 'A thief who steals corporate secrets.', poster_path: null, backdrop_path: null, release_date: '2010-07-16', vote_average: 8.4, vote_count: 15000, genre_ids: [28], adult: false, original_language: 'en', original_title: 'Inception', popularity: 90, video: false },
    { id: 4, title: 'The Dark Knight', overview: 'When the menace known as the Joker wreaks havoc.', poster_path: null, backdrop_path: null, release_date: '2008-07-18', vote_average: 9.0, vote_count: 25000, genre_ids: [28], adult: false, original_language: 'en', original_title: 'The Dark Knight', popularity: 95, video: false },
  ],
  drama: [
    { id: 6, title: 'The Godfather', overview: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', poster_path: null, backdrop_path: null, release_date: '1972-03-14', vote_average: 9.2, vote_count: 18000, genre_ids: [80, 18], adult: false, original_language: 'en', original_title: 'The Godfather', popularity: 75, video: false },
    { id: 7, title: 'Forrest Gump', overview: 'Forrest Gump, while not intelligent, has accidentally been present at many historic moments.', poster_path: null, backdrop_path: null, release_date: '1994-06-23', vote_average: 8.8, vote_count: 22000, genre_ids: [35, 18], adult: false, original_language: 'en', original_title: 'Forrest Gump', popularity: 85, video: false },
  ],
  scifi: [
    { id: 3, title: 'Interstellar', overview: 'A team of explorers travel through a wormhole in space.', poster_path: null, backdrop_path: null, release_date: '2014-11-07', vote_average: 8.6, vote_count: 18000, genre_ids: [878], adult: false, original_language: 'en', original_title: 'Interstellar', popularity: 85, video: false },
  ],
  thriller: [
    { id: 5, title: 'Pulp Fiction', overview: 'The lives of two mob hitmen, a boxer, a gangster and his wife.', poster_path: null, backdrop_path: null, release_date: '1994-10-14', vote_average: 8.9, vote_count: 17000, genre_ids: [53], adult: false, original_language: 'en', original_title: 'Pulp Fiction', popularity: 80, video: false },
    { id: 8, title: 'Fight Club', overview: 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club.', poster_path: null, backdrop_path: null, release_date: '1999-10-15', vote_average: 8.8, vote_count: 25000, genre_ids: [53, 28], adult: false, original_language: 'en', original_title: 'Fight Club', popularity: 90, video: false },
  ],
};

const GENRES = [
  { id: 'action', name: 'Action', emoji: '💥', color: 'bg-red-600' },
  { id: 'drama', name: 'Drama', emoji: '🎭', color: 'bg-blue-600' },
  { id: 'scifi', name: 'Sci-Fi', emoji: '🚀', color: 'bg-purple-600' },
  { id: 'thriller', name: 'Thriller', emoji: '🕵️', color: 'bg-green-600' },
  { id: 'comedy', name: 'Comedy', emoji: '😂', color: 'bg-yellow-600' },
  { id: 'horror', name: 'Horror', emoji: '👻', color: 'bg-gray-800' },
  { id: 'romance', name: 'Romance', emoji: '💕', color: 'bg-pink-600' },
  { id: 'fantasy', name: 'Fantasy', emoji: '🧙‍♂️', color: 'bg-indigo-600' },
];

export default function Genres() {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const currentMovies = selectedGenre ? GENRE_MOVIES[selectedGenre as keyof typeof GENRE_MOVIES] || [] : [];

  return (
    <main className="min-h-screen bg-black">
      <AdBlocker />
      <Header />
      
      <div className="pt-20 px-4 md:px-8">
        <h1 className="text-white text-3xl font-bold mb-8">Browse by Genre</h1>
        
        {/* Genre Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-12">
          {GENRES.map((genre) => (
            <button
              key={genre.id}
              onClick={() => setSelectedGenre(selectedGenre === genre.id ? null : genre.id)}
              className={`p-4 rounded-lg transition-all hover:scale-105 ${
                selectedGenre === genre.id 
                  ? `${genre.color} text-white ring-2 ring-white` 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <div className="text-2xl mb-2">{genre.emoji}</div>
              <div className="text-sm font-semibold">{genre.name}</div>
            </button>
          ))}
        </div>

        {/* Movies Grid */}
        {selectedGenre ? (
          <div>
            <h2 className="text-white text-2xl font-bold mb-6">
              {GENRES.find(g => g.id === selectedGenre)?.name} Movies
            </h2>
            
            {currentMovies.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {currentMovies.map((movie) => (
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
              <div className="text-gray-400">No movies found in this genre yet.</div>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-400">
            <p className="text-lg mb-4">Select a genre to browse movies</p>
            <div className="text-4xl">🎬</div>
          </div>
        )}
      </div>
    </main>
  );
}