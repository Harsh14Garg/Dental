import { motion, useScroll } from 'motion/react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left bg-gradient-to-r from-[--color-caramel] via-[--color-bronze] to-[--color-cream]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
