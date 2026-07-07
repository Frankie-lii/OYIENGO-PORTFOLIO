import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X, ImagePlus, Loader2 } from 'lucide-react';

export default function TestimonialUploadForm({ onClose, onSuccess }) {
  const [form, setForm] = useState({ client_name: '', client_title: '', company: '', review: '', service_type: '', rating: 5 });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [saving, setSaving] = useState(false);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.client_name.trim() || !form.review.trim()) return;
    setSaving(true);
    let photoUrl = '';
    if (photoFile) {
      const { file_url } = await base44.integrations.Core.UploadFile({ file: photoFile });
      photoUrl = file_url;
    }
    await base44.entities.Testimonial.create({ ...form, photo: photoUrl });
    setSaving(false);
    onSuccess();
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-white font-sora font-semibold text-lg">Add Testimonial</h3>
        <button onClick={onClose} className="text-white/40 hover:text-white"><X size={20} /></button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Client Name *"
            value={form.client_name}
            onChange={e => setForm({ ...form, client_name: e.target.value })}
            required
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-11"
          />
          <Input
            placeholder="Job Title / Role"
            value={form.client_title}
            onChange={e => setForm({ ...form, client_title: e.target.value })}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-11"
          />
          <Input
            placeholder="Company Name"
            value={form.company}
            onChange={e => setForm({ ...form, company: e.target.value })}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-11"
          />
          <Input
            placeholder="Service (e.g. Web Development)"
            value={form.service_type}
            onChange={e => setForm({ ...form, service_type: e.target.value })}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-11"
          />
        </div>
        <Textarea
          placeholder="Client review / testimonial *"
          value={form.review}
          onChange={e => setForm({ ...form, review: e.target.value })}
          required
          rows={4}
          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 resize-none"
        />

        {/* Rating */}
        <div className="flex items-center gap-3">
          <span className="text-white/50 text-sm font-inter">Rating:</span>
          {[1,2,3,4,5].map(n => (
            <button type="button" key={n} onClick={() => setForm({ ...form, rating: n })}
              className={`text-xl transition-all ${n <= form.rating ? 'text-yellow-400' : 'text-white/20'}`}>★</button>
          ))}
          <span className="text-white/40 text-sm">{form.rating}/5</span>
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-white/50 text-sm mb-2 font-inter">Profile Photo (optional)</label>
          <label className="flex items-center gap-3 cursor-pointer border-2 border-dashed border-white/10 hover:border-electric/40 rounded-xl p-4 transition-all">
            {photoPreview ? (
              <img src={photoPreview} alt="preview" className="w-14 h-14 rounded-full object-cover" />
            ) : (
              <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center">
                <ImagePlus size={20} className="text-white/30" />
              </div>
            )}
            <span className="text-white/40 text-sm font-inter">{photoPreview ? 'Change photo' : 'Upload client profile photo'}</span>
            <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
          </label>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onClose}
            className="px-5 py-2.5 bg-white/5 text-white/70 rounded-xl font-semibold text-sm hover:bg-white/10 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-electric text-white rounded-xl font-semibold text-sm hover:bg-electric-bright transition-colors disabled:opacity-50">
            {saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : 'Save Testimonial'}
          </button>
        </div>
      </form>
    </div>
  );
}
