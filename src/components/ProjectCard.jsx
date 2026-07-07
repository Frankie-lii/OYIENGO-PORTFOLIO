import { motion } from 'framer-motion';
import { ExternalLink, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const CATEGORY_LABELS = {
  webdev: 'Web Development',
  design: 'Graphic Design',
  seo: 'SEO',
  ai: 'AI Solutions',
  branding: 'Logo & Branding',
};

export default function ProjectCard({ project, onViewDetails, index = 0 }) {
  const isDesign = project.category === 'design' || project.category === 'branding';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group bg-dark-card rounded-xl overflow-hidden border border-white/5 hover:border-electric/30 transition-all duration-300 hover:shadow-xl hover:shadow-electric/10"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-dark-secondary flex items-center justify-center">
            <span className="text-white/20 font-mono text-sm">No Preview</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Badge className="absolute top-3 left-3 bg-electric/90 text-white border-0 text-xs font-mono">
          {CATEGORY_LABELS[project.category] || project.category}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-white font-sora font-semibold text-lg mb-2">{project.name}</h3>
        <p className="text-white/50 text-sm font-inter leading-relaxed line-clamp-2 mb-4">
          {project.description || 'No description available'}
        </p>

        {/* Tech Stack */}
        {project.tech_stack?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech_stack.map((tech) => (
              <span key={tech} className="px-2 py-0.5 bg-white/5 text-white/60 text-xs font-mono rounded">
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {project.live_url && (
            <a
              href={isDesign ? project.image : project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-electric text-white text-sm font-semibold rounded-lg hover:bg-electric-bright transition-colors"
            >
              <ExternalLink size={14} /> View Live
            </a>
          )}
          <button
            onClick={() => onViewDetails(project)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-electric/30 text-electric text-sm font-semibold rounded-lg hover:bg-electric/10 transition-colors"
          >
            <Eye size={14} /> Details
          </button>
        </div>
      </div>
    </motion.div>
  );
}
