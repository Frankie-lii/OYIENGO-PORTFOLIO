import { useState, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { X, Upload, ImagePlus, Loader2 } from 'lucide-react';

const CATEGORIES = [
  { value: 'webdev', label: '💻 Web Development' },
  { value: 'design', label: '🎨 Graphic Design' },
  { value: 'seo', label: '🔍 SEO Optimization' },
  { value: 'ai', label: '🤖 AI Solutions' },
  { value: 'branding', label: '✏️ Logo & Branding' },
];

export default function ProjectUploadForm({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: '', category: 'webdev', description: '', live_url: '',
    challenge: '', solution: '', results: '', tech_stack: '', is_featured: false,
  });
  const [mainImage, setMainImage] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const mainRef = useRef();
  const galleryRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    let imageUrl = '';
    let galleryUrls = [];

    if (mainImage) {
      const { file_url } = await base44.integrations.Core.UploadFile({ file: mainImage });
      imageUrl = file_url;
    }

    for (const file of galleryFiles) {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      galleryUrls.push(file_url);
    }

    await base44.entities.Project.create({
      name: form.name,
      category: form.category,
      description: form.description,
      live_url: form.live_url,
      challenge: form.challenge,
      solution: form.solution,
      results: form.results,
      tech_stack: form.tech_stack ? form.tech_stack.split(',').map(s => s.trim()).filter(Boolean) : [],
      is_featured: form.is_featured,
      image: imageUrl,
      gallery_images: galleryUrls,
    });

    setUploading(false);
    onSuccess();
  };

  const field = (label, key, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-white/60 text-xs font-mono uppercase tracking-wider mb-1">{label}</label>
      {type === 'textarea' ? (
        <textarea
          value={form[key]}
          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
          placeholder={placeholder}
          rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-inter focus:border-electric focus:outline-none resize-none"
        />
      ) : (
        <input
          type={type}
          value={form[key]}
          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
          placeholder={placeholder}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-inter focus:border-electric focus:outline-none"
        />
      )}
    </div>
  );

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-white font-sora font-semibold text-lg">Add New Project</h3>
        <button onClick={onClose} className="text-white/40 hover:text-white p-1"><X size={18} /></button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {field('Project Name *', 'name', 'text', 'e.g. My Portfolio Website')}
          <div>
            <label className="block text-white/60 text-xs font-mono uppercase tracking-wider mb-1">Category *</label>
            <select
              value={form.category}
              onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-inter focus:border-electric focus:outline-none"
            >
              {CATEGORIES.map(c => <option key={c.value} value={c.value} className="bg-[#111]">{c.label}</option>)}
            </select>
          </div>
        </div>

        {field('Short Description', 'description', 'text', 'Brief overview of the project')}
        {field('Live URL / Website Link', 'live_url', 'url', 'https://mywebsite.com')}
        {field('Tech Stack (comma-separated)', 'tech_stack', 'text', 'React, Node.js, MySQL')}
        {field('Challenge', 'challenge', 'textarea', 'What problem did this project solve?')}
        {field('Solution', 'solution', 'textarea', 'How did you approach and solve it?')}
        {field('Results', 'results', 'textarea', 'What were the outcomes?')}

        {/* Main Image */}
        <div>
          <label className="block text-white/60 text-xs font-mono uppercase tracking-wider mb-1">Main Screenshot / Photo</label>
          <div
            onClick={() => mainRef.current.click()}
            className="border-2 border-dashed border-white/15 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-electric/40 transition-colors"
          >
            {mainImage ? (
              <div className="text-center">
                <img src={URL.createObjectURL(mainImage)} alt="preview" className="h-24 object-contain rounded-lg mx-auto mb-2" />
                <p className="text-white/60 text-xs">{mainImage.name}</p>
              </div>
            ) : (
              <>
                <ImagePlus className="text-white/20 mb-2" size={28} />
                <p className="text-white/40 text-sm">Tap to select from gallery or camera</p>
                <p className="text-white/20 text-xs mt-1">JPG, PNG, WEBP</p>
              </>
            )}
          </div>
          <input ref={mainRef} type="file" accept="image/*" className="hidden" onChange={e => setMainImage(e.target.files[0])} />
        </div>

        {/* Gallery Images */}
        <div>
          <label className="block text-white/60 text-xs font-mono uppercase tracking-wider mb-1">Additional Screenshots (optional)</label>
          <div
            onClick={() => galleryRef.current.click()}
            className="border-2 border-dashed border-white/15 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-electric/40 transition-colors"
          >
            {galleryFiles.length > 0 ? (
              <div className="flex gap-2 flex-wrap justify-center">
                {galleryFiles.map((f, i) => (
                  <img key={i} src={URL.createObjectURL(f)} alt="" className="h-16 w-24 object-cover rounded-lg" />
                ))}
                <p className="w-full text-center text-white/40 text-xs mt-1">{galleryFiles.length} file(s) selected</p>
              </div>
            ) : (
              <>
                <Upload className="text-white/20 mb-2" size={24} />
                <p className="text-white/40 text-sm">Select multiple images</p>
              </>
            )}
          </div>
          <input ref={galleryRef} type="file" accept="image/*" multiple className="hidden" onChange={e => setGalleryFiles(Array.from(e.target.files))} />
        </div>

        {/* Featured */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.is_featured}
            onChange={e => setForm(f => ({ ...f, is_featured: e.target.checked }))}
            className="w-4 h-4 accent-electric"
          />
          <span className="text-white/60 text-sm font-inter">Mark as Featured Project</span>
        </label>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={!form.name || uploading}
            className="flex items-center gap-2 px-6 py-2.5 bg-electric text-white rounded-xl font-semibold text-sm hover:bg-electric-bright transition-colors disabled:opacity-50"
          >
            {uploading ? <><Loader2 size={16} className="animate-spin" /> Uploading...</> : <><Upload size={16} /> Save Project</>}
          </button>
          <button type="button" onClick={onClose} className="px-6 py-2.5 border border-white/15 text-white/60 rounded-xl text-sm hover:bg-white/5 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
