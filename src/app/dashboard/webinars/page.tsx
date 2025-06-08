'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Play } from 'lucide-react';

export default function WebinarsPage() {
  const webinars = [
    {
      id: 1,
      title: 'Introduction to Automated Trading',
      thumbnail: 'https://images.pexels.com/photos/3183196/pexels-photo-3183196.jpeg',
      duration: '12:45',
    },
    {
      id: 2,
      title: 'Advanced Bot Strategies',
      thumbnail: 'https://images.pexels.com/photos/3183198/pexels-photo-3183198.jpeg',
      duration: '18:30',
    },
    {
      id: 3,
      title: 'Risk Management Techniques',
      thumbnail: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg',
      duration: '10:12',
    },
    {
      id: 4,
      title: 'Market Analysis Fundamentals',
      thumbnail: 'https://images.pexels.com/photos/3183196/pexels-photo-3183196.jpeg',
      duration: '15:50',
    },
    {
      id: 5,
      title: 'Portfolio Diversification',
      thumbnail: 'https://images.pexels.com/photos/3183195/pexels-photo-3183195.jpeg',
      duration: '9:45',
    },
    {
      id: 6,
      title: 'Trading Psychology',
      thumbnail: 'https://images.pexels.com/photos/3183194/pexels-photo-3183194.jpeg',
      duration: '11:22',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-brand-slate-700 mb-8">WEBINAR</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {webinars.map((webinar) => (
          <div
            key={webinar.id}
            className="rounded-xl overflow-hidden shadow hover:shadow-md transition-shadow"
          >
            <div className="relative w-full h-48">
              <Image
                src={webinar.thumbnail}
                alt={webinar.title}
                fill
                className="object-cover"
                priority
              />

              {/* Overlay: bottom-left WATCH button */}
              <Link
                href={`/dashboard/webinars/${webinar.id}`}
                className="absolute bottom-2 left-2 bg-brand-purple-100 text-brand-purple-700 px-3 py-1 text-xs font-medium rounded-md hover:bg-brand-purple-200 transition"
              >
                <div className="flex items-center gap-1">
                  <Play className="w-3.5 h-3.5" />
                  WATCH
                </div>
              </Link>

              {/* Overlay: bottom-right duration */}
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                {webinar.duration}
              </div>
            </div>

            <div className="p-3 bg-white">
              <h3 className="text-sm font-semibold text-brand-slate-800">
                {webinar.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
