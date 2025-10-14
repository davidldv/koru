import Link from 'next/link';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { Search, Plus, Heart } from 'lucide-react';

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
          
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-teal-500 text-white px-4 py-2 rounded-full hover:bg-teal-600 cursor-pointer transition-colors font-medium">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          
            <SignedIn>
            <UserButton
              appearance={{
              elements: {
                avatarBox: "w-10 h-10 cursor-pointer",
              },
              }}
            />
            </SignedIn>
        </nav>
      </div>
    </header>
  );
}
