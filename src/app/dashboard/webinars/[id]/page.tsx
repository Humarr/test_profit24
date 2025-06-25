'use client'

import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

// interface Webinar {
//   id: string
//   title: string
//   videoUrl: string
//   description?: string
//   thumbnail: string
//   duration: string
// }

export default function WebinarPlayerPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const title = searchParams?.get('title') || 'Untitled'
  const videoUrl = searchParams?.get('videoUrl') || ''
  const thumbnail = searchParams?.get('thumbnail') || ''
  const duration = searchParams?.get('duration') || ''
  const description = searchParams?.get('description') || ''

  const extractYouTubeId = (url: string) => {
    const match = url.match(/(?:\?v=|\/embed\/|\.be\/)([^&\n?#]+)/)
    return match ? match[1] : ''
  }

  const videoId = extractYouTubeId(videoUrl)


  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button 
        onClick={() => router.push('/dashboard/webinars')} 
        className="flex items-center space-x-1 text-brand-purple-600 hover:text-brand-purple-800 mb-4 cursor-pointer"
      >
        <ArrowLeft size={20} /> <span>Back to Webinars</span>
      </button>

      {/* Title */}
      <h1 className="text-3xl font-bold text-brand-slate-800 mb-6">
        {title}
      </h1>

      {/* Video Player */}
      <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg mb-6 bg-black">
        {videoId ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          // Fallback display
          <div className="flex items-center justify-center h-full bg-gray-900 text-white">
            Video unavailable
          </div>
        )}
      </div>

      {/* Details Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <Image
            src={thumbnail}
            alt={title}
            width={120}
            height={68}
            className="rounded-lg object-cover shadow-md"
          />
          <span className="text-sm text-gray-600 font-medium">
            Duration: {duration}
          </span>
        </div>
      </div>

      {/* Description */}
      {description && (
        <div className="prose prose-slate dark:prose-invert">
          <h2 className="text-xl font-semibold mb-2">About this webinar</h2>
          <p>{description}</p>
        </div>
      )}
    </div>
  )
}
