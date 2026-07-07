import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

export default function CertificationCard({ cert, index = 0, onView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="bg-light-secondary rounded-xl overflow-hidden border border-gray-100 hover:border-electric/30 hover:shadow-xl hover:shadow-electric/5 transition-all duration-300"
    >
      {cert.image ? (
        <div className="aspect-[4/3] overflow-hidden cursor-pointer" onClick={() => onView(cert)}>
          <img
            src={cert.image}
            alt={cert.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
          <Award className="w-16 h-16 text-gray-300" />
        </div>
      )}
      <div className="p-5">
        <h3 className="text-dark-bg font-sora font-semibold mb-1">{cert.name}</h3>
        <p className="text-gray-500 text-sm font-inter mb-1">{cert.issuing_organization}</p>
        {cert.date_issued && (
          <p className="text-gray-400 text-xs font-mono mb-3">
            {format(new Date(cert.date_issued), 'MMM yyyy')}
          </p>
        )}
        <button
          onClick={() => onView(cert)}
          className="flex items-center gap-2 text-electric text-sm font-semibold hover:underline"
        >
          <ExternalLink size={14} /> View Certificate
        </button>
      </div>
    </motion.div>
  );
}
