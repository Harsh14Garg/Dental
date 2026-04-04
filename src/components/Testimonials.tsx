import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { TiltCard } from './ui/TiltCard';
import { fadeInUp, fadeInStagger, revealOnScroll } from '../lib/animations';

const testimonials = [
  { name: "Aarav Sharma", role: "Business Executive", content: "The level of care and precision at De Dental Square is unmatched. Dr. Neeraj Agrawal is truly an artist when it comes to dental aesthetics.", rating: 5, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" },
  { name: "Priya Verma", role: "Fashion Designer", content: "I was looking for a clinic that understood the importance of a perfect smile. The results exceeded my expectations. Highly recommended!", rating: 5, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" },
  { name: "Vikram Singh", role: "Architect", content: "A sophisticated environment combined with cutting-edge technology. My dental procedure was seamless and completely painless.", rating: 5, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200" }
];

export default function Testimonials() {
  return (
    <section className="py-32 bg-[var(--color-bg-primary)] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[var(--color-brand-primary)]/[0.04] rounded-full blur-[150px] pointer-events-none" />
      
      <motion.div className="absolute top-20 left-20 w-4 h-4 border border-[var(--color-brand-primary)]/20 rotate-45" animate={{ rotate: [45, 135, 45] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute bottom-20 right-20 w-3 h-3 bg-[var(--color-brand-primary)]/10 rounded-full" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <motion.div className="w-8 h-[1px] bg-[var(--color-brand-primary)]" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} style={{ originX: 1 }} />
            <h2 className="text-[var(--color-brand-primary)] font-medium tracking-[0.3em] uppercase text-[10px]">Testimonials</h2>
            <motion.div className="w-8 h-[1px] bg-[var(--color-brand-primary)]" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} style={{ originX: 0 }} />
          </motion.div>
          
          <motion.p 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-serif text-[var(--color-text-primary)] mb-8"
          >
            Voices of <span className="italic text-[var(--color-brand-primary)]">Satisfaction</span>
          </motion.p>
        </div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8" 
          variants={fadeInStagger} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: '-50px' }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <TiltCard tiltAmount={5} glowColor="rgba(184, 134, 11, 0.1)">
                <motion.div className="bg-[var(--color-bg-secondary)] p-10 border border-[var(--color-brand-primary)]/10 relative group hover:border-[var(--color-brand-primary)]/30 transition-all duration-500 h-full" whileHover={{ y: -4 }}>
                  <motion.div initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}>
                    <Quote className="absolute top-8 right-8 text-[var(--color-brand-primary)]/10 w-12 h-12 group-hover:text-[var(--color-brand-primary)]/20 transition-colors" />
                  </motion.div>

                  <motion.div className="flex gap-1 mb-8" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div key={i} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}>
                        <Star size={14} className="fill-[var(--color-brand-primary)] text-[var(--color-brand-primary)]" />
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  <motion.p className="text-[var(--color-text-secondary)] text-lg leading-relaxed mb-10 font-light italic relative" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}>
                    &ldquo;{testimonial.content}&rdquo;
                  </motion.p>

                  <motion.div className="flex items-center gap-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}>
                    <div className="relative">
                      <motion.div className="absolute -inset-2 bg-[var(--color-brand-primary)]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                      <motion.img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover relative border-2 border-[var(--color-brand-primary)]/10 group-hover:border-[var(--color-brand-primary)]/30 transition-colors" referrerPolicy="no-referrer" whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }} />
                    </div>
                    <div>
                      <h4 className="text-[var(--color-text-primary)] font-medium tracking-wide group-hover:text-[var(--color-brand-primary)] transition-colors">{testimonial.name}</h4>
                      <p className="text-[var(--color-brand-primary)] text-[9px] font-medium uppercase tracking-widest">{testimonial.role}</p>
                    </div>
                  </motion.div>

                  <motion.div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[var(--color-brand-primary)] to-transparent" initial={{ width: 0 }} whileInView={{ width: '40%' }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 + index * 0.1, ease: [0.16, 1, 0.3, 1] }} />
                </motion.div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          variants={revealOnScroll}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '4.9', label: 'Average Rating' },
            { value: '2k+', label: 'Reviews' },
            { value: '98%', label: 'Would Recommend' },
            { value: '15k+', label: 'Happy Patients' },
          ].map((stat, i) => (
            <motion.div key={i} className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}>
              <motion.div className="text-3xl md:text-4xl font-serif text-[var(--color-brand-primary)] mb-2" whileHover={{ scale: 1.05 }}>{stat.value}</motion.div>
              <div className="text-[10px] uppercase tracking-[0.2em] font-medium text-[var(--color-text-muted)]">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
