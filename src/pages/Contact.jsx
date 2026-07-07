import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';

const SERVICES_LIST = [
  'Business Website',
  'Portfolio Website',
  'E-commerce Website',
  'Poster Design',
  'Flyer Design',
  'Logo Design',
  'SEO Optimization',
  'Data Entry Services',
  'AI Automation Setup',
  'Social Media Management',
];

const VALIDATION = {
  name: (v) => v.trim().length >= 2 ? '' : 'Name must be at least 2 characters',
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter a valid email address',
  message: (v) => v.trim().length >= 10 ? '' : 'Message must be at least 10 characters',
};

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = () => {
    const newErrors = {};
    Object.entries(VALIDATION).forEach(([field, fn]) => {
      const err = fn(form[field] || '');
      if (err) newErrors[field] = err;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    await base44.integrations.Core.SendEmail({
      to: 'oyiengofrankline49@gmail.com',
      from_name: form.name,
      subject: `New Inquiry from ${form.name}${form.service ? ` — ${form.service}` : ''}`,
      body: `Name: ${form.name}\nEmail: ${form.email}\nService: ${form.service || 'Not specified'}\n\nMessage:\n${form.message}`,
    });
    setSending(false);
    setSent(true);
    setForm({ name: '', email: '', service: '', message: '' });
    setErrors({});
    toast.success('Message sent! I\'ll get back to you soon.');
  };

  const handleWhatsApp = () => {
    const msg = `Hi Frankline! I found your portfolio and I'd like to discuss a project. My name is ${form.name || '[Name]'} and I need help with ${form.service || '[Service]'}. ${form.message || ''}`;
    window.open(`https://wa.me/254110124153?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="pt-16">
      <Section theme="dark" id="contact">
        <SectionHeading title="Let's Work Together" subtitle="Get In Touch" theme="dark" />

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-white/60 font-inter text-lg max-w-xl mx-auto">
            Ready to grow your business online? Let's build something amazing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-sora font-semibold text-white mb-8">Contact Details</h3>
            <div className="space-y-6">
              <a
                href="https://wa.me/254110124153"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-[#25D366]/10 rounded-xl border border-[#25D366]/20 hover:bg-[#25D366]/20 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center">
                  <Phone size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-sora font-semibold">WhatsApp</p>
                  <p className="text-white/60 text-sm font-inter">0110124153</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="w-12 h-12 rounded-full bg-electric/20 flex items-center justify-center">
                  <Mail size={20} className="text-electric" />
                </div>
                <div>
                  <p className="text-white font-sora font-semibold">Email</p>
                  <p className="text-white/60 text-sm font-inter">oyiengofrankline49@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="w-12 h-12 rounded-full bg-electric/20 flex items-center justify-center">
                  <MapPin size={20} className="text-electric" />
                </div>
                <div>
                  <p className="text-white font-sora font-semibold">Location</p>
                  <p className="text-white/60 text-sm font-inter">Ngong, Kajiado — Available for Remote Work</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <p className="text-white/40 text-sm font-mono uppercase tracking-widest mb-4">Follow Me</p>
              <div className="flex gap-3">
                {[
                  { href: 'https://wa.me/254110124153', label: 'WhatsApp' },
                  { href: 'https://facebook.com', label: 'Facebook' },
                  { href: 'https://instagram.com', label: 'Instagram' },
                  { href: 'https://tiktok.com', label: 'TikTok' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="px-4 py-2 bg-white/5 text-white/60 text-sm font-inter rounded-lg hover:bg-electric hover:text-white transition-all"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-sora font-semibold text-white mb-8">Send a Message</h3>
            {sent && (
              <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 font-inter text-sm text-center">
                ✅ Your message was sent! I'll be in touch shortly.
              </div>
            )}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <Input
                  placeholder="Your Name *"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-electric h-12 ${errors.name ? 'border-red-500/60' : ''}`}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1 ml-1">{errors.name}</p>}
              </div>
              <div>
                <Input
                  placeholder="Your Email *"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-electric h-12 ${errors.email ? 'border-red-500/60' : ''}`}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{errors.email}</p>}
              </div>
              <Select value={form.service} onValueChange={(val) => setForm({ ...form, service: val })}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white h-12">
                  <SelectValue placeholder="Service of Interest (optional)" />
                </SelectTrigger>
                <SelectContent className="bg-dark-card border-white/10">
                  {SERVICES_LIST.map((s) => (
                    <SelectItem key={s} value={s} className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div>
                <Textarea
                  placeholder="Your Message *"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  className={`bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-electric resize-none ${errors.message ? 'border-red-500/60' : ''}`}
                />
                {errors.message && <p className="text-red-400 text-xs mt-1 ml-1">{errors.message}</p>}
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-electric text-white font-semibold rounded-xl hover:bg-electric-bright transition-all hover:shadow-lg hover:shadow-electric/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                ) : (
                  <><Send size={18} /> Send Message</>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
