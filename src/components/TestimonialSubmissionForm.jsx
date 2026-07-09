import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/api/Base44Client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ImagePlus, Loader2, Send, CheckCircle2 } from 'lucide-react';

export default function TestimonialSubmissionForm() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ client_name: '', company: '', review: '', rating: 5 });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.client_name.trim() || !form.review.trim()) {
      setError('Please enter your name and your review.');
      return;
    }
    setSaving(true);
    try {
      let photoUrl = '';
      if (photoFile) {
        const { file_url } = await apiClient.integrations.Core.UploadFile({ file: photoFile });
        photoUrl = file_url;
      }
      await apiClient.entities.Testimonial.create({ ...form, photo: photoUrl });
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      setSubmitted(true);
      setForm({ client_name: '', company: '', review: '', rating: 5 });
      setPhotoFile(null);
      setPhotoPreview('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-light-secondary rounded-2xl p-8 border border-gray-200 text-center">
        <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-dark-bg font-sora font-bold text-xl mb-2">Thank You!</h3>
        <p className="text-gray-500 font-inter text-sm mb-6">
          Your testimonial has been submitted and is now live for everyone to see.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-6 py-2.5 bg-electric text-white rounded-xl font-semibold text-sm hover:bg-electric-bright transition-colors"
        >
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <div className="bg-light-secondary rounded-2xl p-6 md:p-8 border border-gray-200">
      <h3 className="text-dark-bg font-sora font-bold text-xl mb-2">Share Your Experience</h3>
      <p className="text-gray-500 font-inter text-sm mb-6">
        Worked with me? Leave a review — your photo and words help other businesses find quality digital services.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Your Name *"
            value={form.client_name}
            onChange={e => setForm({ ...form, client_name: e.target.value })}
            className="bg-white border-gray-200 text-dark-bg placeholder:text-gray-400 h-11"
          />
          <Input
            placeholder="Company (optional)"
            value={form.company}
            onChange={e => setForm({ ...form, company: e.target.value })}
            className="bg-white border-gray-200 text-dark-bg placeholder:text-gray-400 h-11"
          />
        </div>

        <Textarea
          placeholder="Write your testimonial here *"
          value={form.review}
          onChange={e => setForm({ ...form, review: e.target.value })}
          rows={5}
          className="bg-white border-gray-200 text-dark-bg placeholder:text-gray-400 resize-none"
        />

        {/* Rating */}
        <div className="flex items-center gap-3">
          <span className="text-gray-500 text-sm font-inter">Your Rating:</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(n => (
              <button
                type="button"
                key={n}
                onClick={() => setForm({ ...form, rating: n })}
                className={`text-2xl transition-all ${n <= form.rating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'}`}
              >
                ★
              </button>
            ))}
          </div>
          <span className="text-gray-400 text-sm font-mono">{form.rating}/5</span>
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-gray-500 text-sm mb-2 font-inter">Your Photo (optional)</label>
          <label className="flex items-center gap-4 cursor-pointer border-2 border-dashed border-gray-200 hover:border-electric/40 rounded-xl p-4 transition-all">
            {photoPreview ? (
              <img src={photoPreview} alt="preview" className="w-16 h-16 rounded-full object-cover" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                <ImagePlus size={22} className="text-gray-400" />
              </div>
            )}
            <div>
              <p className="text-dark-bg font-inter font-medium text-sm">{photoPreview ? 'Change photo' : 'Upload your profile photo'}</p>
              <p className="text-gray-400 text-xs font-inter">JPG or PNG · shows next to your name</p>
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
          </label>
        </div>

        {error && <p className="text-red-500 text-sm font-inter">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-electric text-white font-semibold rounded-xl hover:bg-electric-bright transition-all hover:shadow-lg hover:shadow-electric/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? <><Loader2 size={18} className="animate-spin" /> Submitting...</> : <><Send size={18} /> Submit Testimonial</>}
        </button>
      </form>
    </div>
  );
}
