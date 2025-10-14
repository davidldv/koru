import Link from 'next/link';
import { Search, Plus, Heart, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-teal-500">
          Koru
        </Link>
        
        <nav className="flex items-center gap-6">
          <button className="hover:text-teal-500 cursor-pointer transition-colors" aria-label="Search">
            <Search size={24} />
          </button>
          <button className="hover:text-teal-500 cursor-pointer transition-colors" aria-label="Upload">
            <Plus size={24} />
          </button>
          <button className="hover:text-teal-500 cursor-pointer transition-colors" aria-label="Favorites">
            <Heart size={24} />
          </button>
          <button className="hover:text-teal-500 cursor-pointer transition-colors" aria-label="Profile">
            <User size={24} />
          </button>
        </nav>
      </div>
    </header>
  );
}
