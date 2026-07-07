import { motion } from 'framer-motion';

export default function SectionHeading({ title, subtitle, theme = 'dark' }) {
  const isDark = theme === 'dark';
  return (
    <div className="text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="font-mono text-electric text-sm uppercase tracking-[0.2em]">
          {subtitle}
        </span>
        <h2 className={`text-3xl md:text-5xl font-sora font-bold mt-3 ${
          isDark ? 'text-white' : 'text-dark-bg'
        }`}>
          {title}
        </h2>
        <div className="w-20 h-1 bg-electric mx-auto mt-4 rounded-full" />
      </motion.div>
    </div>
  );
}
