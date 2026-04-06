import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function Magnetic({ children }: { children: React.ReactElement }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
  }, []);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    if (isTouchDevice) return;
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  if (isTouchDevice) {
    return <>{children}</>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      data-magnetic="true"
    >
      {children}
    </motion.div>
  );
}
