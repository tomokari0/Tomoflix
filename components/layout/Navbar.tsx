'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Search, Bell, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';
import { useAppStore } from '@/lib/store';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();
  const { currentProfile } = useAppStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isActive = (path: string) => pathname === path;

  if (!user) return null;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/95 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="text-red-600 text-2xl font-bold cursor-pointer" onClick={() => router.push('/browse')}>
              NETFLIX
            </div>
            <div className="hidden md:flex space-x-6">
              <Button
                variant="ghost"
                className={`text-white hover:text-gray-300 ${isActive('/browse') ? 'font-semibold' : ''}`}
                onClick={() => router.push('/browse')}
              >
                Home
              </Button>
              <Button
                variant="ghost"
                className={`text-white hover:text-gray-300 ${isActive('/tv-shows') ? 'font-semibold' : ''}`}
                onClick={() => router.push('/tv-shows')}
              >
                TV Shows
              </Button>
              <Button
                variant="ghost"
                className={`text-white hover:text-gray-300 ${isActive('/movies') ? 'font-semibold' : ''}`}
                onClick={() => router.push('/movies')}
              >
                Movies
              </Button>
              <Button
                variant="ghost"
                className={`text-white hover:text-gray-300 ${isActive('/my-list') ? 'font-semibold' : ''}`}
                onClick={() => router.push('/my-list')}
              >
                My List
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search titles, people, genres"
                className="pl-10 bg-black/50 border-gray-600 text-white placeholder-gray-400 w-64"
              />
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:text-gray-300">
              <Bell className="w-5 h-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 text-white hover:text-gray-300">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-red-600 text-white">
                      {currentProfile?.name?.charAt(0) || user.displayName?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-black/95 border-gray-700">
                <DropdownMenuItem onClick={() => router.push('/profiles')} className="text-white hover:bg-gray-800">
                  <User className="w-4 h-4 mr-2" />
                  Manage Profiles
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/settings')} className="text-white hover:bg-gray-800">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut} className="text-white hover:bg-gray-800">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}