import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/api/Base44Client';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, X } from 'lucide-react';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import Lightbox from '../components/Lightbox';
import ProjectDetailModal from '../components/ProjectDetailModal';

const FILTERS = [
  { key: 'all', label: '🗂️ All' },
  { key: 'webdev', label: '💻 Web Dev' },
  { key: 'design', label: '🎨 Design' },
  { key: 'seo', label: '🔍 SEO' },
  { key: 'ai', label: '🤖 AI' },
  { key: 'branding', label: '✏️ Branding' },
];

export default function Portfolio() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [lightbox, setLightbox] = useState({ open: false, url: '', title: '' });

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => apiClient.entities.Project.list('-created_date'),
  });

  const results = useMemo(() => {
    let list = filter === 'all' ? projects : projects.filter(p => p.category === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.tech_stack?.some(t => t.toLowerCase().includes(q))
      );
    }
    return [...list].sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
  }, [projects, filter, search]);

  const handleViewDetails = (project) => setSelectedProject(project);
  const clearSearch = () => setSearch('');

  return (
    <div className="pt-16">
      <Section theme="dark" id="portfolio">
        <SectionHeading title="My Work" subtitle="Portfolio" theme="dark" />
        <p className="text-center text-white/50 font-inter -mt-8 mb-10 max-w-xl mx-auto">
          A selection of projects I've built and delivered
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by project name or technology (e.g. React, SEO, MySQL…)"
            className="w-full bg-white/5 border border-white/10 rounded-full pl-11 pr-10 py-3 text-white text-sm font-inter placeholder-white/25 focus:outline-none focus:border-electric focus:bg-white/10 transition-all"
          />
          {search && (
            <button onClick={clearSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">
              <X size={16} />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold font-inter transition-all duration-200 border ${
                filter === f.key
                  ? 'bg-electric text-white border-electric shadow-lg shadow-electric/30 scale-105'
                  : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Results Summary */}
        <div className="text-center mb-8">
          <span className="text-white/30 text-sm font-mono">
            {search ? (
              <>Searching <span className="text-electric">\"{ search}\"</span> · </>
            ) : (
              <>Showing <span className="text-electric">{FILTERS.find(f => f.key === filter)?.label}</span> · </>
            )}
            <span className="text-white/50">{results.length} project{results.length !== 1 ? 's' : ''}</span>
            {(search || filter !== 'all') && (
              <button
                onClick={() => { setSearch(''); setFilter('all'); }}
                className="ml-3 text-electric/70 hover:text-electric underline text-xs"
              >
                Clear all
              </button>
            )}
          </span>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-dark-card rounded-xl overflow-hidden">
                <Skeleton className="aspect-video bg-white/5" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-5 w-3/4 bg-white/5" />
                  <Skeleton className="h-4 w-full bg-white/5" />
                  <Skeleton className="h-8 w-1/2 bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} onViewDetails={handleViewDetails} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-white/30 font-inter text-lg">
              {search ? `No projects found for "${search}"` : 'No projects in this category yet'}
            </p>
            <button onClick={() => { setSearch(''); setFilter('all'); }} className="mt-4 text-electric text-sm font-mono underline">
              Clear filters
            </button>
          </div>
        )}
      </Section>

      {/* Details Modal */}
      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      <Lightbox
        isOpen={lightbox.open}
        onClose={() => setLightbox({ open: false, url: '', title: '' })}
        imageUrl={lightbox.url}
        title={lightbox.title}
      />
    </div>
  );
}
