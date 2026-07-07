import { motion } from 'framer-motion';

export default function SkillCategory({ category, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="bg-dark-card rounded-xl p-6 border border-white/5 hover:border-electric/30 hover:shadow-xl hover:shadow-electric/10 transition-all duration-300"
    >
      <div className="text-3xl mb-3">{category.icon}</div>
      <h3 className="text-white font-sora font-semibold text-lg mb-4">{category.name}</h3>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + i * 0.05 }}
            className="px-3 py-1.5 bg-electric/10 text-electric text-xs font-mono rounded-full border border-electric/20 hover:bg-electric/20 transition-colors"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
