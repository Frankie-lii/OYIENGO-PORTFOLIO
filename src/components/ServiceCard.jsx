import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function ServiceCard({ service, index = 0 }) {
  const whatsappMsg = encodeURIComponent(
    `Hi Frankline! I'm interested in your ${service.name} service. Please share more details.`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group bg-light-secondary rounded-xl p-6 border border-gray-100 hover:border-electric/30 hover:shadow-xl hover:shadow-electric/5 transition-all duration-300"
    >
      <div className="text-3xl mb-4">{service.icon}</div>
      <h3 className="text-dark-bg font-sora font-semibold text-lg mb-2">{service.name}</h3>
      <p className="text-gray-500 text-sm font-inter leading-relaxed mb-4">{service.description}</p>
      <div className="mb-4">
        <span className="text-electric font-sora font-bold text-lg">{service.priceRange}</span>
      </div>
      <a
        href={`https://wa.me/254110124153?text=${whatsappMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-electric text-white text-sm font-semibold rounded-lg hover:bg-electric-bright transition-colors"
      >
        <MessageCircle size={16} /> Get a Quote
      </a>
    </motion.div>
  );
}
