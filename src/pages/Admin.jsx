import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2, Upload, Plus, X, FolderOpen, Award, MessageSquare } from 'lucide-react';
import TestimonialUploadForm from '../components/admin/TestimonialUploadForm';
import ProjectUploadForm from '../components/admin/ProjectUploadForm';
import CertificationUploadForm from '../components/admin/CertificationUploadForm';

// Mock API client - replace with your actual API implementation
const api = {
  entities: {
    Project: {
      list: async (sort) => [],
      delete: async (id) => {}
    },
    Testimonial: {
      list: async (sort) => [],
      delete: async (id) => {}
    },
    Certification: {
      list: async (sort) => [],
      delete: async (id) => {}
    }
  }
};

export default function Admin() {
  const [tab, setTab] = useState('projects');
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showCertForm, setShowCertForm] = useState(false);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const queryClient = useQueryClient();

  const { data: projects = [], isLoading: loadingProjects } = useQuery({
    queryKey: ['projects'],
    queryFn: () => api.entities.Project.list('-created_date'),
  });

  const { data: testimonials = [], isLoading: loadingTestimonials } = useQuery({
    queryKey: ['testimonials'],
    queryFn: () => api.entities.Testimonial.list('-created_date'),
  });

  const deleteTestimonial = useMutation({
    mutationFn: (id) => api.entities.Testimonial.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['testimonials'] }),
  });

  const { data: certs = [], isLoading: loadingCerts } = useQuery({
    queryKey: ['certifications'],
    queryFn: () => api.entities.Certification.list('-created_date'),
  });

  const deleteProject = useMutation({
    mutationFn: (id) => api.entities.Project.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  });

  const deleteCert = useMutation({
    mutationFn: (id) => api.entities.Certification.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['certifications'] }),
  });

  return (
    <div className="pt-16 min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-sora font-bold text-white mb-2">Admin Panel</h1>
        <p className="text-white/40 font-inter text-sm mb-8">Manage your portfolio projects and certifications</p>

        {/* Tabs */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setTab('projects')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              tab === 'projects' ? 'bg-electric text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            <FolderOpen size={16} /> Projects ({projects.length})
          </button>
          <button
            onClick={() => setTab('certs')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              tab === 'certs' ? 'bg-electric text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            <Award size={16} /> Certifications ({certs.length})
          </button>
          <button
            onClick={() => setTab('testimonials')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              tab === 'testimonials' ? 'bg-electric text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            <MessageSquare size={16} /> Testimonials ({testimonials.length})
          </button>
        </div>

        {/* Projects Tab */}
        {tab === 'projects' && (
          <div>
            <button
              onClick={() => setShowProjectForm(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-electric text-white rounded-xl font-semibold text-sm hover:bg-electric-bright transition-colors mb-6"
            >
              <Plus size={16} /> Add New Project
            </button>

            {showProjectForm && (
              <ProjectUploadForm
                onClose={() => setShowProjectForm(false)}
                onSuccess={() => { setShowProjectForm(false); queryClient.invalidateQueries({ queryKey: ['projects'] }); }}
              />
            )}

            {loadingProjects ? (
              <p className="text-white/40 font-mono text-sm">Loading...</p>
            ) : projects.length === 0 ? (
              <p className="text-white/30 font-inter">No projects yet. Add your first one!</p>
            ) : (
              <div className="space-y-3">
                {projects.map((p) => (
                  <div key={p.id} className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
                    {p.image && <img src={p.image} alt={p.name} className="w-16 h-12 object-cover rounded-lg flex-shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-sora font-semibold truncate">{p.name}</p>
                      <p className="text-white/40 text-xs font-mono capitalize">{p.category}</p>
                      {p.live_url && <p className="text-electric text-xs truncate mt-0.5">{p.live_url}</p>}
                    </div>
                    <button
                      onClick={() => deleteProject.mutate(p.id)}
                      disabled={deleteProject.isPending}
                      className="flex-shrink-0 p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                      title="Delete project"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Testimonials Tab */}
        {tab === 'testimonials' && (
          <div>
            <button
              onClick={() => setShowTestimonialForm(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-electric text-white rounded-xl font-semibold text-sm hover:bg-electric-bright transition-colors mb-6"
            >
              <Plus size={16} /> Add Testimonial
            </button>

            {showTestimonialForm && (
              <TestimonialUploadForm
                onClose={() => setShowTestimonialForm(false)}
                onSuccess={() => { setShowTestimonialForm(false); queryClient.invalidateQueries({ queryKey: ['testimonials'] }); }}
              />
            )}

            {loadingTestimonials ? (
              <p className="text-white/40 font-mono text-sm">Loading...</p>
            ) : testimonials.length === 0 ? (
              <p className="text-white/30 font-inter">No testimonials yet. Add your first one!</p>
            ) : (
              <div className="space-y-3">
                {testimonials.map((t) => (
                  <div key={t.id} className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
                    {t.photo ? (
                      <img src={t.photo} alt={t.client_name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-electric/10 flex items-center justify-center flex-shrink-0">
                        <MessageSquare size={18} className="text-electric/50" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-sora font-semibold truncate">{t.client_name}</p>
                      <p className="text-white/40 text-xs font-inter">{[t.client_title, t.company].filter(Boolean).join(' · ')}</p>
                      <p className="text-white/30 text-xs font-inter truncate mt-0.5 italic">\"{ t.review?.slice(0, 60)}{t.review?.length > 60 ? '...' : ''}\"</p>
                    </div>
                    <button
                      onClick={() => deleteTestimonial.mutate(t.id)}
                      disabled={deleteTestimonial.isPending}
                      className="flex-shrink-0 p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Certifications Tab */}
        {tab === 'certs' && (
          <div>
            <button
              onClick={() => setShowCertForm(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-electric text-white rounded-xl font-semibold text-sm hover:bg-electric-bright transition-colors mb-6"
            >
              <Plus size={16} /> Add Certification
            </button>

            {showCertForm && (
              <CertificationUploadForm
                onClose={() => setShowCertForm(false)}
                onSuccess={() => { setShowCertForm(false); queryClient.invalidateQueries({ queryKey: ['certifications'] }); }}
              />
            )}

            {loadingCerts ? (
              <p className="text-white/40 font-mono text-sm">Loading...</p>
            ) : certs.length === 0 ? (
              <p className="text-white/30 font-inter">No certifications yet. Upload your first one!</p>
            ) : (
              <div className="space-y-3">
                {certs.map((c) => (
                  <div key={c.id} className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
                    {c.image && <img src={c.image} alt={c.name} className="w-16 h-12 object-cover rounded-lg flex-shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-sora font-semibold truncate">{c.name}</p>
                      <p className="text-white/40 text-xs font-inter">{c.issuing_organization}</p>
                    </div>
                    <button
                      onClick={() => deleteCert.mutate(c.id)}
                      disabled={deleteCert.isPending}
                      className="flex-shrink-0 p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                      title="Delete certification"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
