import { Variants } from 'motion/react';

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

export const fadeInStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    scale: 1, 
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    x: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    x: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

export const revealOnScroll: Variants = {
  hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
  }
};

export const hoverLift: Variants = {
  rest: { y: 0, scale: 1, boxShadow: "0 10px 40px -10px rgba(0,0,0,0.05)" },
  hover: { 
    y: -8, 
    scale: 1.02, 
    boxShadow: "0 30px 60px -20px rgba(184,134,11,0.15)",
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  }
};
