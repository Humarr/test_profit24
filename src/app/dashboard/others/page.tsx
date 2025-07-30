"use client";

import { Download } from 'lucide-react';
import Image from 'next/image';
import { getPdfThumbnail } from '@/lib/generateThumbnail';
import { Suspense, useState, useEffect } from 'react';
import Spinner from '@/components/Spinner';

// Types
type Resource = {
  id: string;
  title: string;
  fileUrl: string;
  thumbnailUrl: string;
  category: 'LEARN_WITH_US' | 'FOREX_SIGNAL';
  createdAt: string;
  updatedAt: string;
};

// Helper to group by category
function groupResources(resources: Resource[]) {
  return {
    learn: resources.filter(r => r.category === 'LEARN_WITH_US'),
    signals: resources.filter(r => r.category === 'FOREX_SIGNAL'),
  };
}

export default function OthersPage() {
  const [learn, setLearn] = useState<Resource[]>([]);
  const [signals, setSignals] = useState<Resource[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResources() {
      try {
        const apiUrl = '/api/admin/resources';
        console.log('Fetching resources from:', apiUrl, 'at', new Date().toISOString());

        const res = await fetch(apiUrl, {
          cache: 'no-store',
          credentials: 'include',
        });

        if (!res.ok) {
          const errorText = await res.text().catch(() => 'No response body');
          throw new Error(`Failed to fetch resources: ${res.statusText} (Status: ${res.status}, Body: ${errorText})`);
        }

        const data = await res.json();

        if (!data.resources || !Array.isArray(data.resources)) {
          throw new Error('Invalid resources data received from API');
        }

        const { learn, signals } = groupResources(data.resources);
        setLearn(learn);
        setSignals(signals);
      } catch (err) {
        console.error('OthersPage Error:', err);
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    }
    fetchResources();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-brand-slate-700 mb-8 font-nasal">RESOURCES</h1>

      {error ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center text-brand-slate-500">
          <Image
            src="/illustrations/resources.png"
            alt="Error Illustration"
            width={200}
            height={200}
            className="mb-6"
          />
          <p className="text-lg font-bold">Error Loading Resources</p>
          <p>{error}</p>
          <p>Please try again later or contact support@spectra.ai.</p>
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="mt-4 py-2 px-4 bg-brand-purple-600 text-white rounded-lg font-medium hover:bg-brand-purple-700 transition"
          >
            Back to Dashboard
          </button>
        </div>
      ) : loading ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <Spinner />
        </div>
      ) : (
        <>
          {/* Learn With Us */}
          <Suspense fallback={<Spinner />}>
            {learn.length > 0 ? (
              <Section title="LEARN WITH US" items={learn} />
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[30vh] text-center mb-16">
                <Image
                  src="/illustrations/resources.png"
                  alt="Learning Resources Illustration"
                  width={200}
                  height={200}
                  className="mb-6"
                />
                <h2 className="text-2xl font-bold text-brand-slate-700 mb-4 font-nasal">
                  We’re Crafting New Learning Resources!
                </h2>
                <p className="text-brand-slate-500 max-w-md mb-6">
                  Our team is developing fresh content to boost your trading knowledge. Stay tuned!
                </p>
                <button
                  onClick={() => window.location.href = '/dashboard'}
                  className="py-2 px-4 bg-brand-purple-600 text-white rounded-lg font-medium hover:bg-brand-purple-700 transition"
                >
                  Check Back Soon
                </button>
              </div>
            )}
          </Suspense>

          {/* Forex Signals */}
          <Suspense fallback={<Spinner />}>
            {signals.length > 0 ? (
              <Section title="FOREX SIGNAL" items={signals} />
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[30vh] text-center mb-16">
                <Image
                  src="/illustrations/forex.png"
                  alt="Forex Signals Illustration"
                  width={200}
                  height={200}
                  className="mb-6"
                />
                <h2 className="text-2xl font-bold text-brand-slate-700 mb-4 font-nasal">
                  We’re Preparing New Forex Signals!
                </h2>
                <p className="text-brand-slate-500 max-w-md mb-6">
                  Our team is analyzing the markets for top-tier signals. Stay tuned!
                </p>
                <button
                  onClick={() => window.location.href = '/dashboard'}
                  className="py-2 px-4 bg-brand-purple-600 text-white rounded-lg font-medium hover:bg-brand-purple-700 transition"
                >
                  Check Back Soon
                </button>
              </div>
            )}
          </Suspense>
        </>
      )}
    </div>
  );
}

function Section({ title, items }: { title: string; items: Resource[] }) {
  return (
    <div className="mb-16">
      <h2 className="text-xl font-bold text-brand-slate-700 mb-6 font-nasal">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <Image
              src={getPdfThumbnail(doc.thumbnailUrl) || '/fallback-thumbnail.png'}
              alt={`${doc.title} Preview`}
              width={300}
              height={200}
              className="w-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/fallback-thumbnail.png';
              }}
            />
            <div className="p-4">
              <h3 className="font-bold text-brand-slate-700 mb-3">{doc.title}</h3>
              <a
                href={doc.fileUrl}
                download
                className="w-full py-2 bg-brand-purple-600 text-white rounded-lg font-medium hover:bg-brand-purple-700 transition flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}