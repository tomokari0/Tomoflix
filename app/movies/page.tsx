'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { ContentRow } from '@/components/content/ContentRow';
import { useAuth } from '@/components/auth/AuthProvider';
import { useAppStore } from '@/lib/store';
import { mockContent } from '@/lib/mock-data';
import { Content } from '@/lib/types';

export default function MoviesPage() {
  const [content, setContent] = useState<Content[]>([]);
  const { user } = useAuth();
  const { currentProfile } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (!currentProfile) {
      router.push('/profiles');
      return;
    }

    const movies = mockContent.filter(item => item.type === 'movie');
    setContent(movies);
  }, [user, currentProfile, router]);

  if (!user || !currentProfile) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-600 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    );
  }

  const actionMovies = content.filter(item => item.genre.includes('Action'));
  const dramaMovies = content.filter(item => item.genre.includes('Drama'));
  const sciFiMovies = content.filter(item => item.genre.includes('Sci-Fi'));

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-16 px-4 md:px-8 lg:px-16 pb-16">
        <h1 className="text-4xl font-bold text-white mb-8">Movies</h1>
        <ContentRow title="Popular Movies" content={content} />
        <ContentRow title="Action Movies" content={actionMovies} />
        <ContentRow title="Drama Movies" content={dramaMovies} />
        <ContentRow title="Sci-Fi Movies" content={sciFiMovies} />
      </div>
    </div>
  );
}