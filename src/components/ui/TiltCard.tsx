import { useRef, useState, ReactNode, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
  glowColor?: string;
  glareEnabled?: boolean;
}

export function TiltCard({ 
  children, 
  className = '', 
  tiltAmount = 10,
  glowColor = 'rgba(184, 134, 11, 0.3)',
  glareEnabled = true,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltAmount, -tiltAmount]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltAmount, tiltAmount]), springConfig);

  const glareX = useTransform(x, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(y, [-0.5, 0.5], ['0%', '100%']);

  const requestRef = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }

    requestRef.current = requestAnimationFrame(() => {
      const rect = cardRef.current!.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const normalizedX = (e.clientX - centerX) / (rect.width / 2);
      const normalizedY = (e.clientY - centerY) / (rect.height / 2);

      x.set(normalizedX * 0.5);
      y.set(normalizedY * 0.5);
    });
  };

  const handleMouseLeave = () => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  useEffect(() => {
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        <div className="relative z-10">{children}</div>

        <motion.div
          className="absolute inset-0 -z-10 rounded-inherit pointer-events-none"
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1.02 : 1 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(circle at 50% 50%, ${glowColor}, transparent 70%)`,
          }}
        />

        {glareEnabled && (
          <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-inherit"
            style={{
              background: useTransform(
                [glareX, glareY],
                ([latestX, latestY]) => 
                  `radial-gradient(circle at ${latestX} ${latestY}, rgba(255,255,255,0.15) 0%, transparent 50%)`
              ),
              opacity: isHovered ? 1 : 0,
            }}
          />
        )}

        <motion.div
          className="absolute inset-0 -z-10 rounded-inherit pointer-events-none"
          animate={{ opacity: isHovered ? 0.5 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ boxShadow: `0 0 30px ${glowColor}` }}
        />
      </motion.div>
    </motion.div>
  );
}

export default TiltCard;
