import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const LOGO_DARK = 'https://media.base44.com/images/public/6a01a544f0f9f9e0d4e13dc9/231be797d_2.png';

export default function SplashScreen({ onComplete }) {
  const [show, setShow] = useState(true);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Fullstack Developer & Digital Solutions Specialist';

  useEffect(() => {
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setShow(false);
          setTimeout(onComplete, 800);
        }, 1000);
      }
    }, 40);
    return () => clearInterval(typeInterval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-dark-bg flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Animated particles */}
          <div className="absolute inset-0">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-electric/30 rounded-full"
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                  opacity: 0,
                }}
                animate={{
                  opacity: [0, 0.6, 0],
                  scale: [0.5, 1.5, 0.5],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Logo */}
          <motion.img
            src={LOGO_DARK}
            alt="OYIENGO"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="w-64 md:w-72 mb-8 relative z-10"
          />

          {/* Typewriter text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="font-mono text-electric text-sm md:text-base tracking-widest uppercase relative z-10"
          >
            {typedText}
            <span className="animate-pulse">|</span>
          </motion.div>

          {/* Loading bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '200px' }}
            transition={{ duration: 3, ease: 'easeInOut' }}
            className="h-[2px] bg-gradient-to-r from-transparent via-electric to-transparent mt-8 relative z-10"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
