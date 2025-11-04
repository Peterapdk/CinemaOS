'use client';

import { Search, Menu, User } from 'lucide-react';

interface HeaderProps {
  onSearch: (query: string) => void;
  onMenuClick: () => void;
}

export default function Header({ onSearch, onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#1a1a1a] border-b border-[#333333] px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        <button 
          onClick={onMenuClick} 
          className="lg:hidden p-2 hover:bg-[#2a2a2a] rounded transition-colors"
        >
          <Menu size={24} />
        </button>
        
        <div className="flex-1 max-w-md">
          <div className="flex items-center bg-[#2a2a2a] rounded px-4 py-2">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search movies..."
              onChange={(e) => onSearch(e.target.value)}
              className="ml-2 bg-transparent outline-none w-full text-white placeholder-gray-500"
            />
          </div>
        </div>

        <button className="p-2 hover:bg-[#2a2a2a] rounded transition-colors">
          <User size={24} />
        </button>
      </div>
    </header>
  );
}