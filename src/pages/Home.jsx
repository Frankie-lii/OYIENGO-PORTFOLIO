import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, MessageCircle } from 'lucide-react';
import Section from '../components/Section';

const HERO_IMAGES = [
  'https://media.base44.com/images/public/6a01a544f0f9f9e0d4e13dc9/ce3d652ea_image.png',
  'https://media.base44.com/images/public/6a01a544f0f9f9e0d4e13dc9/11cdc62a2_image.png',
  'https://media.base44.com/images/public/6a01a544f0f9f9e0d4e13dc9/42bf682c2_image.png',
];

const HEADLINES = [
  'Fullstack Developer & Digital Solutions Specialist',
  'Web Developer | Graphic Designer | SEO Specialist',
  'AI & Web Solutions Expert',
];

const STATS = [
  { value: '20+', label: 'Projects Completed' },
  { value: '10+', label: 'Happy Clients' },
  { value: '5+', label: 'Digital Skills' },
  { value: '100%', label: 'Client Satisfaction' },
];

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentHeadline, setCurrentHeadline] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const headline = HEADLINES[currentHeadline];
    let timeout;

    if (!isDeleting && typedText.length < headline.length) {
      timeout = setTimeout(() => setTypedText(headline.slice(0, typedText.length + 1)), 50);
    } else if (!isDeleting && typedText.length === headline.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && typedText.length > 0) {
      timeout = setTimeout(() => setTypedText(typedText.slice(0, -1)), 30);
    } else if (isDeleting && typedText.length === 0) {
      setIsDeleting(false);
      setCurrentHeadline((prev) => (prev + 1) % HEADLINES.length);
    }

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, currentHeadline]);

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative min-h-screen bg-dark-bg flex items-center overflow-hidden">
        {/* Particle Background */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-electric/20 rounded-full"
              initial={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 0.5, 0],
                scale: [0.5, 2, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-5 gap-12 items-center relative z-10">
          {/* Left Content - 3/5 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            <span className="inline-block text-electric font-mono text-sm tracking-widest mb-4">
              👋 Hello, I'm Frankline Oyiengo
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sora font-bold text-white leading-tight mb-6 min-h-[140px]">
              {typedText}
              <span className="text-electric animate-pulse">|</span>
            </h1>

            <p className="text-white/60 font-inter text-lg leading-relaxed max-w-xl mb-8">
              I design and engineer high-performance websites, intelligent AI solutions, and data-driven digital systems that help businesses launch faster, rank higher, and scale with confidence.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                to="/portfolio"
                className="flex items-center gap-2 px-6 py-3 bg-electric text-white font-semibold rounded-full hover:bg-electric-bright transition-all hover:shadow-lg hover:shadow-electric/30"
              >
                <Eye size={18} /> View My Work
              </Link>
              <a
                href="https://wa.me/254110124153?text=Hi%20Frankline!%20I'd%20like%20to%20hire%20you%20for%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 border border-electric text-electric font-semibold rounded-full hover:bg-electric/10 transition-all"
              >
                <ArrowRight size={18} /> Hire Me
              </a>
              <Link
                to="/contact"
                className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white/80 font-semibold rounded-full hover:border-white/40 hover:text-white transition-all"
              >
                <MessageCircle size={18} /> Contact Me
              </Link>
            </div>

            {/* Social icons */}
            <div className="flex gap-3">
              {[
                { href: 'https://wa.me/254110124153', label: 'WhatsApp', icon: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/> },
                { href: 'https://facebook.com', label: 'Facebook', icon: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/> },
                { href: 'https://instagram.com', label: 'Instagram', icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/> },
                { href: 'https://tiktok.com', label: 'TikTok', icon: <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/> },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-electric hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-electric/20"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">{social.icon}</svg>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right - Photo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2 flex justify-center"
          >
            <div className="relative animate-float">
              <div className="absolute -inset-2 bg-gradient-to-br from-electric/30 via-electric/10 to-transparent rounded-[2rem] blur-sm" />
              <div className="relative w-64 h-80 md:w-72 md:h-96 rounded-[2rem] overflow-hidden border-2 border-electric/20">
                {HERO_IMAGES.map((img, i) => (
                  <motion.img
                    key={img}
                    src={img}
                    alt={`Frankline Oyiengo ${i + 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: i === currentImage ? 1 : 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-dark-secondary py-12 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-sora font-bold text-electric mb-1">{stat.value}</div>
              <div className="text-white/50 text-sm font-inter">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
