'use client';

import { Play, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Movie } from '@/types/movie';

export default function HeroSection() {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    // Set a featured movie from sample data
    const sampleMovie: Movie = {
      id: 1,
      title: 'The Matrix',
      overview: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
      poster_path: null,
      backdrop_path: null,
      release_date: '1999-03-30',
      vote_average: 8.7,
      vote_count: 20000,
      genre_ids: [28, 878],
      adult: false,
      original_language: 'en',
      original_title: 'The Matrix',
      popularity: 100,
      video: false,
    };
    setFeaturedMovie(sampleMovie);
  }, []);

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden mb-8 group">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/80 to-transparent"
        style={{
          backgroundImage: 'url(/placeholder-poster.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-8">
        <h2 className="text-4xl font-bold mb-2 text-white">
          {featuredMovie?.title || 'Featured Movie'}
        </h2>
        <p className="text-gray-300 max-w-md mb-6">
          {featuredMovie?.overview || 'Experience the ultimate cinematic adventure with stunning visuals and compelling storytelling.'}
        </p>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-[#fbbf24] text-black px-6 py-3 rounded font-semibold hover:bg-yellow-400 transition-colors">
            <Play size={20} />
            Watch Now
          </button>
          <button className="flex items-center gap-2 border-2 border-[#fbbf24] text-[#fbbf24] px-6 py-3 rounded font-semibold hover:bg-[#fbbf24] hover:text-black transition-colors">
            <Plus size={20} />
            Add to List
          </button>
        </div>
      </div>
    </div>
  );
}