'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import HeroSection from '@/components/HeroSection';
import MovieGrid from '@/components/MovieGrid';
import AdBlocker from '@/components/AdBlocker';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
          <HeroSection />
          <MovieGrid searchQuery={searchQuery} />
        </main>
      </div>
    </div>
  );
}
