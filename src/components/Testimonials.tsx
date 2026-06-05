import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import TestimonialForm from './TestimonialForm';
import { Loader2, Star, StarHalf } from 'lucide-react';

export default function Testimonials() {
  const [user, setUser] = useState(auth.currentUser);
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    // Inject the tagembed script when the component mounts
    const script = document.createElement('script');
    script.src = 'https://widget.tagembed.com/embed.min.js';
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    
    // Once the script is loaded, set a timeout to assume the widget is rendered
    script.onload = () => {
      setTimeout(() => setWidgetLoaded(true), 1500); 
    };

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    return () => {
      if (containerRef.current && script.parentNode) {
        containerRef.current.removeChild(script);
      }
    };
  }, []);

  return (
    <section className="py-32 bg-[var(--color-espresso)] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-5xl font-serif text-[var(--color-cream)] mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Patient Reviews
          </motion.h2>
          <motion.p 
            className="text-[var(--color-latte)] text-sm uppercase tracking-widest font-semibold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Real experiences from our clinic
          </motion.p>
        </div>

        <motion.div 
          className="flex flex-col md:flex-row items-center justify-center gap-12 mb-16 bg-[var(--color-latte)]/5 p-8 sm:p-10 rounded-2xl border border-[var(--color-latte)]/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center md:text-left flex flex-col items-center md:items-start shrink-0">
            <div className="text-7xl font-serif text-[var(--color-cream)] mb-3 leading-none">4.9</div>
            <div className="flex items-center gap-1 text-[var(--color-caramel)] mb-3">
              <Star fill="currentColor" size={24} strokeWidth={0} />
              <Star fill="currentColor" size={24} strokeWidth={0} />
              <Star fill="currentColor" size={24} strokeWidth={0} />
              <Star fill="currentColor" size={24} strokeWidth={0} />
              <StarHalf fill="currentColor" size={24} strokeWidth={0} />
            </div>
            <div className="text-[var(--color-latte)] text-sm font-medium tracking-wide">Based on 150+ reviews</div>
          </div>
          
          <div className="hidden md:block w-px h-32 bg-[var(--color-latte)]/20"></div>
          
          <div className="flex-1 w-full max-w-sm flex flex-col gap-3">
            {[
              { stars: 5, percentage: 92 },
              { stars: 4, percentage: 6 },
              { stars: 3, percentage: 2 },
              { stars: 2, percentage: 0 },
              { stars: 1, percentage: 0 },
            ].map((row) => (
              <div key={row.stars} className="flex items-center gap-4">
                <div className="text-[var(--color-cream)] text-sm font-medium w-3">{row.stars}</div>
                <div className="flex-1 h-2.5 bg-[var(--color-latte)]/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-[var(--color-caramel)] rounded-full" 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${row.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {user && (
          <motion.div 
            className="mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <TestimonialForm />
          </motion.div>
        )}

        <motion.div 
          className="w-full relative min-h-[600px] flex justify-center bg-[var(--color-espresso)] rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          ref={containerRef}
        >
          {/* Loading Indicator */}
          {!widgetLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-[var(--color-bronze)] z-0">
              <Loader2 className="w-10 h-10 animate-spin mb-4" />
              <div className="text-sm font-bold uppercase tracking-widest text-[var(--color-latte)] animate-pulse">Loading Reviews...</div>
            </div>
          )}

          {/* Tagembed Widget Container */}
          <div 
            className="tagembed-widget relative z-10 w-full" 
            style={{ width: '100%', height: '100%', overflow: 'hidden' }} 
            data-widget-id="327393" 
            data-website="1"
          ></div>
        </motion.div>
      </div>
    </section>
  );
}
