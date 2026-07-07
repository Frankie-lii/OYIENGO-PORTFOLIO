import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function Lightbox({ isOpen, onClose, imageUrl, title }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-4xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 text-white/80 hover:text-white p-2"
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>
            {title && (
              <h3 className="text-white font-sora font-semibold mb-3 text-center">{title}</h3>
            )}
            <img
              src={imageUrl}
              alt={title || 'Preview'}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
