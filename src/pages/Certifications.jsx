import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, X } from 'lucide-react';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import CertificationCard from '../components/CertificationCard';
import Lightbox from '../components/Lightbox';

export default function Certifications() {
  const [lightbox, setLightbox] = useState({ open: false, url: '', title: '' });
  const [search, setSearch] = useState('');

  const { data: certs = [], isLoading } = useQuery({
    queryKey: ['certifications'],
    queryFn: () => base44.entities.Certification.list('-created_date'),
  });

  const filtered = useMemo(() => {
    if (!search.trim()) return certs;
    const q = search.toLowerCase();
    return certs.filter(c =>
      c.name?.toLowerCase().includes(q) ||
      c.issuing_organization?.toLowerCase().includes(q)
    );
  }, [certs, search]);

  const handleView = (cert) => {
    if (cert.image) {
      setLightbox({ open: true, url: cert.image, title: cert.name });
    }
  };

  return (
    <div className="pt-16">
      <Section theme="light" id="certifications">
        <SectionHeading title="My Certifications" subtitle="Verified Skills" theme="light" />
        <p className="text-center text-gray-500 font-inter -mt-8 mb-8 max-w-xl mx-auto">
          Verified skills and achievements
        </p>

        {/* Search */}
        <div className="max-w-md mx-auto mb-10 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by certificate name or issuer…"
            className="w-full bg-gray-100 border border-gray-200 rounded-full pl-11 pr-10 py-3 text-gray-800 text-sm font-inter placeholder-gray-400 focus:outline-none focus:border-electric focus:bg-white transition-all"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X size={16} />
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-light-secondary rounded-xl overflow-hidden">
                <Skeleton className="aspect-[4/3] bg-gray-200" />
                <div className="p-5 space-y-2">
                  <Skeleton className="h-5 w-3/4 bg-gray-200" />
                  <Skeleton className="h-4 w-1/2 bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((cert, i) => (
              <CertificationCard key={cert.id} cert={cert} index={i} onView={handleView} />
            ))}
          </div>
        ) : certs.length > 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 font-inter text-lg">No results for "{search}"</p>
            <button onClick={() => setSearch('')} className="mt-3 text-electric text-sm font-mono underline">Clear search</button>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 font-inter text-lg">Certifications coming soon</p>
            <p className="text-gray-300 font-mono text-sm mt-2">Stay tuned for verified achievements</p>
          </div>
        )}
      </Section>

      <Lightbox
        isOpen={lightbox.open}
        onClose={() => setLightbox({ open: false, url: '', title: '' })}
        imageUrl={lightbox.url}
        title={lightbox.title}
      />
    </div>
  );
}
