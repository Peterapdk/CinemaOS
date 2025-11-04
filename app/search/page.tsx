'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import MovieGrid from '@/components/MovieGrid';
import AdBlocker from '@/components/AdBlocker';

export default function Search() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex min-h-screen bg-[#0f0f0f] text-white">
      <AdBlocker />
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1">
        <Header 
          onSearch={setSearchQuery} 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
        />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-4">Search Movies</h1>
            {searchQuery && (
              <p className="text-gray-400">Results for "{searchQuery}"</p>
            )}
          </div>
          <MovieGrid searchQuery={searchQuery} title="Search Results" />
        </main>
      </div>
    </div>
  );
}