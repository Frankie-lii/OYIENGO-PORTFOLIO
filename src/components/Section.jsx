import { motion } from 'framer-motion';

export default function Section({ children, theme = 'dark', id, className = '' }) {
  const isDark = theme === 'dark';
  return (
    <section
      id={id}
      className={`py-20 md:py-32 px-6 md:px-12 lg:px-24 w-full ${
        isDark ? 'bg-dark-bg text-white' : 'bg-light-bg text-dark-bg'
      } ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-7xl mx-auto"
      >
        {children}
      </motion.div>
    </section>
  );
}
