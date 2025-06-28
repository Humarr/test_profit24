import { Download } from 'lucide-react';
import Image from 'next/image';
import { getPdfThumbnail } from '@/lib/generateThumbnail';
import { Suspense } from 'react';
import Spinner from '@/components/Spinner';
// import { getRawFileUrl } from '@/lib/getRawFileUrl';
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

export default async function OthersPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/resources`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch resources');
  }

  const data = await res.json();
  const { learn, signals } = groupResources(data.resources as Resource[]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-brand-slate-700 mb-8">RESOURCES</h1>

      {/* Learn With Us */}
      <Suspense fallback={<Spinner />}>

     {learn.length > 0 && <Section title="LEARN WITH US" items={learn} />}
     {learn.length === 0 && <p className='text-bold text-brand-slate-700'>No resources found</p>}


      </Suspense>

      {/* Forex Signals */}
      <Suspense fallback={<Spinner />}>
      {signals.length > 0 && <Section title="FOREX SIGNAL" items={signals} />}
      {signals.length === 0 && <p className='text-bold text-brand-slate-700'>No resources found</p>}
      </Suspense>
    </div>
  );
}

function Section({ title, items }: { title: string; items: Resource[] }) {
  return (
    <div className="mb-16">
      <h2 className="text-xl font-bold text-brand-slate-700 mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <Image
              src={getPdfThumbnail(doc.thumbnailUrl)}
              alt="PDF Preview"
              width={300}
              height={200}
              className="w-full object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-brand-slate-700 mb-3">{doc.title}</h3>
              <a
                href={doc.fileUrl}
                // href={getRawFileUrl(doc.fileUrl)}
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
