'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import AdBlocker from '@/components/AdBlocker';
import { Movie } from '@/types/movie';

// Sample data for initial build - will be replaced with TMDB API calls
const SAMPLE_MOVIES = [
  { id: 1, title: 'The Matrix', overview: 'A computer hacker learns about the true nature of his reality.', poster_path: null, backdrop_path: null, release_date: '1999-03-30', vote_average: 8.7, vote_count: 20000, genre_ids: [28], adult: false, original_language: 'en', original_title: 'The Matrix', popularity: 100, video: false },
  { id: 2, title: 'Inception', overview: 'A thief who steals corporate secrets.', poster_path: null, backdrop_path: null, release_date: '2010-07-16', vote_average: 8.4, vote_count: 15000, genre_ids: [28], adult: false, original_language: 'en', original_title: 'Inception', popularity: 90, video: false },
  { id: 3, title: 'Interstellar', overview: 'A team of explorers travel through a wormhole in space.', poster_path: null, backdrop_path: null, release_date: '2014-11-07', vote_average: 8.6, vote_count: 18000, genre_ids: [878], adult: false, original_language: 'en', original_title: 'Interstellar', popularity: 85, video: false },
  { id: 4, title: 'The Dark Knight', overview: 'When the menace known as the Joker wreaks havoc.', poster_path: null, backdrop_path: null, release_date: '2008-07-18', vote_average: 9.0, vote_count: 25000, genre_ids: [28], adult: false, original_language: 'en', original_title: 'The Dark Knight', popularity: 95, video: false },
  { id: 5, title: 'Pulp Fiction', overview: 'The lives of two mob hitmen, a boxer, a gangster and his wife.', poster_path: null, backdrop_path: null, release_date: '1994-10-14', vote_average: 8.9, vote_count: 17000, genre_ids: [53], adult: false, original_language: 'en', original_title: 'Pulp Fiction', popularity: 80, video: false },
];

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>(SAMPLE_MOVIES);
  const [popularMovies, setPopularMovies] = useState<Movie[]>(SAMPLE_MOVIES.slice(1));
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>(SAMPLE_MOVIES.slice(2));
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>(SAMPLE_MOVIES.slice(0, 3));

  return (
    <main className="min-h-screen bg-black">
      <AdBlocker />
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              CinemaOS
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Your Netflix-Style Movie Library
            </p>
            <div className="flex space-x-4 justify-center">
              <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                Browse Movies
              </button>
              <button className="bg-gray-600/80 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-500/80 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Sections */}
      <div className="space-y-12 pb-20">
        {/* Trending Now */}
        <div className="px-4 md:px-8">
          <h2 className="text-white text-2xl font-bold mb-4">Trending Now</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {trendingMovies.map((movie) => (
              <div key={movie.id} className="bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-transform">
                <div className="aspect-[2/3] bg-gray-800 flex items-center justify-center">
                  <div className="text-4xl text-gray-600">🎬</div>
                </div>
                <div className="p-3">
                  <h3 className="text-white font-semibold text-sm mb-1">{movie.title}</h3>
                  <p className="text-gray-400 text-xs">{new Date(movie.release_date).getFullYear()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Movies */}
        <div className="px-4 md:px-8">
          <h2 className="text-white text-2xl font-bold mb-4">Popular Movies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {popularMovies.map((movie) => (
              <div key={movie.id} className="bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-transform">
                <div className="aspect-[2/3] bg-gray-800 flex items-center justify-center">
                  <div className="text-4xl text-gray-600">🎬</div>
                </div>
                <div className="p-3">
                  <h3 className="text-white font-semibold text-sm mb-1">{movie.title}</h3>
                  <p className="text-gray-400 text-xs">{new Date(movie.release_date).getFullYear()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Rated */}
        <div className="px-4 md:px-8">
          <h2 className="text-white text-2xl font-bold mb-4">Top Rated</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {topRatedMovies.map((movie) => (
              <div key={movie.id} className="bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-transform">
                <div className="aspect-[2/3] bg-gray-800 flex items-center justify-center">
                  <div className="text-4xl text-gray-600">🎬</div>
                </div>
                <div className="p-3">
                  <h3 className="text-white font-semibold text-sm mb-1">{movie.title}</h3>
                  <p className="text-gray-400 text-xs">{new Date(movie.release_date).getFullYear()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coming Soon */}
        <div className="px-4 md:px-8">
          <h2 className="text-white text-2xl font-bold mb-4">Coming Soon</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {upcomingMovies.map((movie) => (
              <div key={movie.id} className="bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-transform">
                <div className="aspect-[2/3] bg-gray-800 flex items-center justify-center">
                  <div className="text-4xl text-gray-600">🎬</div>
                </div>
                <div className="p-3">
                  <h3 className="text-white font-semibold text-sm mb-1">{movie.title}</h3>
                  <p className="text-gray-400 text-xs">{new Date(movie.release_date).getFullYear()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
