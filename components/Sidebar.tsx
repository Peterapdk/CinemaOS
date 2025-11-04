'use client';

import { Home, TrendingUp, Star, Bookmark, X } from 'lucide-react';
import Link from 'next/link';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: TrendingUp, label: 'Trending', href: '/trending' },
    { icon: Star, label: 'Popular', href: '/movies' },
    { icon: Bookmark, label: 'My List', href: '/my-list' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static w-64 h-screen bg-[#1a1a1a] border-r border-[#333333]
        transform transition-transform duration-300 z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        <div className="flex items-center justify-between p-6 border-b border-[#333333]">
          <Link href="/" className="text-2xl font-bold text-[#fbbf24] hover:text-yellow-400 transition-colors">
            CinemaOS
          </Link>
          <button onClick={onToggle} className="lg:hidden hover:bg-[#2a2a2a] p-2 rounded transition-colors">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded hover:bg-[#2a2a2a] transition-colors group"
              onClick={() => window.innerWidth < 1024 && onToggle()}
            >
              <item.icon size={20} className="group-hover:text-[#fbbf24] transition-colors" />
              <span className="group-hover:text-[#fbbf24] transition-colors">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}