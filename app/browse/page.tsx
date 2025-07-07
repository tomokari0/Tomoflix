'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/content/HeroSection';
import { ContentRow } from '@/components/content/ContentRow';
import { useAuth } from '@/components/auth/AuthProvider';
import { useAppStore } from '@/lib/store';
import { mockContent } from '@/lib/mock-data';
import { Content } from '@/lib/types';

export default function BrowsePage() {
  const [content, setContent] = useState<Content[]>([]);
  const { user } = useAuth();
  const { currentProfile, setContent: setStoreContent } = useAppStore();
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

    // Load content
    setContent(mockContent);
    setStoreContent(mockContent);
  }, [user, currentProfile, router, setStoreContent]);

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

  const featuredContent = content.filter(item => item.featured);
  const movies = content.filter(item => item.type === 'movie');
  const series = content.filter(item => item.type === 'series');
  const actionContent = content.filter(item => item.genre.includes('Action'));
  const dramaContent = content.filter(item => item.genre.includes('Drama'));

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <HeroSection featuredContent={featuredContent} />
      <div className="px-4 md:px-8 lg:px-16 pb-16">
        <ContentRow title="Trending Now" content={content.slice(0, 6)} />
        <ContentRow title="Popular Movies" content={movies} />
        <ContentRow title="TV Shows" content={series} />
        <ContentRow title="Action & Adventure" content={actionContent} />
        <ContentRow title="Dramas" content={dramaContent} />
      </div>
    </div>
  );
}