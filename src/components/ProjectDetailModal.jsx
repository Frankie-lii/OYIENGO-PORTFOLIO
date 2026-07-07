import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Lightbulb, Wrench, TrendingUp, Code2, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const CATEGORY_LABELS = {
  webdev: 'Web Development',
  design: 'Graphic Design',
  seo: 'SEO Optimization',
  ai: 'AI Solutions',
  branding: 'Logo & Branding',
};

function GalleryViewer({ images, mainImage }) {
  const allImages = [mainImage, ...(images || [])].filter(Boolean);
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (allImages.length === 0) return null;

  return (
    <div className="mb-8">
      {/* Main image */}
      <div className="relative rounded-xl overflow-hidden aspect-video bg-white/5 group cursor-pointer" onClick={() => setLightboxOpen(true)}>
        <img src={allImages[active]} alt="Project screenshot" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <ZoomIn className="text-white w-8 h-8" />
        </div>
        {allImages.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); setActive(i => (i - 1 + allImages.length) % allImages.length); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setActive(i => (i + 1) % allImages.length); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
            <span className="absolute bottom-3 right-3 bg-black/60 text-white/80 text-xs font-mono px-2 py-1 rounded-full">
              {active + 1} / {allImages.length}
            </span>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                active === i ? 'border-electric scale-105' : 'border-white/10 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Screenshot ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button className="absolute top-4 right-4 text-white/70 hover:text-white p-2" onClick={() => setLightboxOpen(false)}>
              <X size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={allImages[active]}
              alt="Full view"
              className="max-w-full max-h-[90vh] object-contain rounded-xl"
              onClick={e => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function InfoBlock({ icon: Icon, label, content, color = 'electric' }) {
  if (!content) return null;
  const colorMap = {
    electric: 'text-electric bg-electric/10 border-electric/20',
    yellow: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
    green: 'text-green-400 bg-green-400/10 border-green-400/20',
  };
  const iconColorMap = {
    electric: 'text-electric',
    yellow: 'text-yellow-400',
    green: 'text-green-400',
  };
  return (
    <div className={`rounded-xl border p-5 ${colorMap[color]}`}>
      <div className="flex items-center gap-2 mb-3">
        <Icon size={18} className={iconColorMap[color]} />
        <span className={`font-sora font-semibold text-sm uppercase tracking-wider ${iconColorMap[color]}`}>{label}</span>
      </div>
      <p className="text-white/80 font-inter text-sm leading-relaxed whitespace-pre-line">{content}</p>
    </div>
  );
}

export default function ProjectDetailModal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-md flex items-start justify-center p-4 pt-8 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="bg-[#111111] rounded-2xl w-full max-w-3xl border border-white/10 shadow-2xl shadow-black/50 mb-8"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between p-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono text-electric uppercase tracking-widest mb-1 block">
                {CATEGORY_LABELS[project.category] || project.category}
              </span>
              <h2 className="text-2xl md:text-3xl font-sora font-bold text-white">{project.name}</h2>
              {project.description && (
                <p className="text-white/50 font-inter text-sm mt-1">{project.description}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="ml-4 flex-shrink-0 p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            {/* Gallery */}
            <GalleryViewer images={project.gallery_images} mainImage={project.image} />

            {/* Challenge / Solution / Results */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <InfoBlock
                icon={Lightbulb}
                label="The Challenge"
                content={project.challenge}
                color="yellow"
              />
              <InfoBlock
                icon={Wrench}
                label="The Solution"
                content={project.solution}
                color="electric"
              />
              <InfoBlock
                icon={TrendingUp}
                label="Results & Outcomes"
                content={project.results}
                color="green"
              />
            </div>

            {/* Full description fallback */}
            {!project.challenge && !project.solution && (project.full_description || project.description) && (
              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <p className="text-white/70 font-inter text-sm leading-relaxed">
                  {project.full_description || project.description}
                </p>
              </div>
            )}

            {/* Tech Stack */}
            {project.tech_stack?.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Code2 size={16} className="text-electric" />
                  <span className="text-white font-sora font-semibold text-sm uppercase tracking-wider">Tech Stack</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map(t => (
                    <span key={t} className="px-3 py-1.5 bg-electric/10 text-electric text-xs font-mono rounded-full border border-electric/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-3 p-6 border-t border-white/10">
            {project.live_url ? (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2.5 bg-electric text-white text-sm font-semibold rounded-xl hover:bg-electric-bright transition-colors shadow-lg shadow-electric/20"
              >
                <ExternalLink size={15} /> View Live Project
              </a>
            ) : <div />}
            <button
              onClick={onClose}
              className="px-6 py-2.5 border border-white/15 text-white/70 text-sm font-semibold rounded-xl hover:bg-white/5 hover:text-white transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
