import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress(Math.min((currentStep / steps) * 100, 100));
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 500); // Wait a bit after 100%
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--color-espresso)] text-[var(--color-cream)]"
      initial={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="overflow-hidden mb-4">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="text-4xl font-serif tracking-widest text-shadow"
        >
          DE DENTAL SQUARE
        </motion.div>
      </div>
      <div className="w-64 h-[1px] bg-[var(--color-latte)]/20 relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 bottom-0 bg-[var(--color-bronze)]"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-4 text-xs font-mono tracking-widest text-[var(--color-latte)]/50">
        {Math.round(progress)}%
      </div>
    </motion.div>
  );
}
