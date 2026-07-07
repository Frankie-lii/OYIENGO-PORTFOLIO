import { useState, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { X, ImagePlus, Loader2, Upload } from 'lucide-react';

export default function CertificationUploadForm({ onClose, onSuccess }) {
  const [form, setForm] = useState({ name: '', issuing_organization: '', date_issued: '' });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    let imageUrl = '';
    if (imageFile) {
      const { file_url } = await base44.integrations.Core.UploadFile({ file: imageFile });
      imageUrl = file_url;
    }

    await base44.entities.Certification.create({
      name: form.name,
      issuing_organization: form.issuing_organization,
      date_issued: form.date_issued || undefined,
      image: imageUrl,
    });

    setUploading(false);
    onSuccess();
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-white font-sora font-semibold text-lg">Add Certification</h3>
        <button onClick={onClose} className="text-white/40 hover:text-white p-1"><X size={18} /></button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white/60 text-xs font-mono uppercase tracking-wider mb-1">Certificate Name *</label>
          <input
            type="text"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            placeholder="e.g. Google Analytics Certified"
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-inter focus:border-electric focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-white/60 text-xs font-mono uppercase tracking-wider mb-1">Issuing Organization</label>
          <input
            type="text"
            value={form.issuing_organization}
            onChange={e => setForm(f => ({ ...f, issuing_organization: e.target.value }))}
            placeholder="e.g. Google, Coursera, Udemy"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-inter focus:border-electric focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-white/60 text-xs font-mono uppercase tracking-wider mb-1">Date Issued</label>
          <input
            type="date"
            value={form.date_issued}
            onChange={e => setForm(f => ({ ...f, date_issued: e.target.value }))}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-inter focus:border-electric focus:outline-none"
          />
        </div>

        {/* Certificate Image */}
        <div>
          <label className="block text-white/60 text-xs font-mono uppercase tracking-wider mb-1">Certificate Image / Photo</label>
          <div
            onClick={() => fileRef.current.click()}
            className="border-2 border-dashed border-white/15 rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer hover:border-electric/40 transition-colors"
          >
            {imageFile ? (
              <div className="text-center">
                <img src={URL.createObjectURL(imageFile)} alt="preview" className="h-32 object-contain rounded-lg mx-auto mb-2" />
                <p className="text-white/60 text-xs">{imageFile.name}</p>
              </div>
            ) : (
              <>
                <ImagePlus className="text-white/20 mb-2" size={28} />
                <p className="text-white/40 text-sm">Tap to select from gallery or camera</p>
                <p className="text-white/20 text-xs mt-1">Photo of certificate — JPG, PNG</p>
              </>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => setImageFile(e.target.files[0])} />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={!form.name || uploading}
            className="flex items-center gap-2 px-6 py-2.5 bg-electric text-white rounded-xl font-semibold text-sm hover:bg-electric-bright transition-colors disabled:opacity-50"
          >
            {uploading ? <><Loader2 size={16} className="animate-spin" /> Uploading...</> : <><Upload size={16} /> Save Certificate</>}
          </button>
          <button type="button" onClick={onClose} className="px-6 py-2.5 border border-white/15 text-white/60 rounded-xl text-sm hover:bg-white/5 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
