import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Clock, CheckCircle2, Users } from 'lucide-react';
import { HeroFloatingShapes } from './3d/FloatingShapes';
import Magnetic from './ui/Magnetic';
import { useRef } from 'react';
import { fadeInUp, fadeInStagger, scaleIn, slideInLeft, slideInRight, revealOnScroll, hoverLift } from '../lib/animations';
import { SplitText } from './ui/SplitText';

const stats = [
  { value: '15k+', label: 'Patients Treated' },
  { value: '12+', label: 'Years Experience' },
  { value: '99%', label: 'Success Rate' },
  { value: '50+', label: 'Procedures' },
];

function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      className="bg-gradient-to-r from-[var(--color-brand-primary)] via-[var(--color-brand-accent)] to-[var(--color-brand-primary)] bg-clip-text text-transparent bg-[length:200%_auto]"
      animate={{ backgroundPosition: ['0% center', '200% center'] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
    >
      {children}
    </motion.span>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <div ref={containerRef}>
      <section className="relative min-h-[100vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
        <HeroFloatingShapes />

        <motion.div 
          className="container mx-auto px-6 relative z-10"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-2xl">
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="inline-flex items-center gap-3 mb-8"
              >
                <motion.div 
                  className="w-8 h-[1px] bg-[var(--color-brand-primary)]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{ originX: 0 }}
                />
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: 'var(--color-brand-primary)' }}>
                  Center for Advanced Dental Care
                </span>
                <motion.div 
                  className="w-8 h-[1px] bg-[var(--color-brand-primary)]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{ originX: 1 }}
                />
              </motion.div>

              <div className="mb-8">
                <SplitText 
                  text="Precision" 
                  className="text-6xl md:text-8xl font-serif leading-[0.9] text-[var(--color-text-primary)]" 
                  delay={0.2} 
                />
                <SplitText 
                  text="meets" 
                  className="text-6xl md:text-8xl font-serif leading-[0.9] italic font-light text-[var(--color-text-secondary)]" 
                  delay={0.4} 
                />
                <div className="text-6xl md:text-8xl font-serif leading-[0.9]">
                  <GradientText>Artistry</GradientText>
                </div>
              </div>

              <motion.p
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="text-lg md:text-xl mb-12 font-light leading-relaxed max-w-lg"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Experience world-class dental care powered by advanced technology
                and the gentle expertise of <strong className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Dr. Neeraj Agrawal</strong>.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="flex flex-col sm:flex-row items-center gap-6"
              >
                <Magnetic>
                  <Link to="/appointment">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -4, boxShadow: "0 20px 30px -10px rgba(197, 160, 89, 0.4)" }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="btn-primary flex items-center gap-3 px-10 py-5 text-xs group"
                    >
                      Book Consultation 
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <ArrowRight size={16} />
                      </motion.span>
                    </motion.button>
                  </Link>
                </Magnetic>

                <Magnetic>
                  <Link to="/services">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -4, boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.1)" }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="btn-secondary flex items-center gap-3 px-10 py-5 text-xs"
                    >
                      Our Services
                    </motion.button>
                  </Link>
                </Magnetic>
              </motion.div>
            </div>

            <div className="relative hidden lg:block">
              <motion.div
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                className="relative z-10"
              >
                <motion.div
                  className="relative oval-mask overflow-hidden aspect-[3/4] max-w-md ml-auto"
                >
                  <motion.img 
                    src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800" 
                    alt="Dental Clinic" 
                    className="w-full h-full object-cover"
                    style={{ scale: imageScale }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="absolute top-1/4 -right-8 vertical-text"
                variants={slideInRight}
                initial="hidden"
                animate="visible"
              >
                Est. 2012 — Varanasi
              </motion.div>

              <motion.div 
                className="absolute -bottom-12 right-20 w-48 h-48 rounded-full border border-[var(--color-brand-primary)] opacity-30 -z-10"
                animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                transition={{ rotate: { duration: 30, repeat: Infinity, ease: 'linear' }, scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
              />

              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="absolute -bottom-6 left-0 glass-card p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="w-10 h-10 rounded-full bg-[var(--color-brand-primary)]/10 flex items-center justify-center text-[var(--color-brand-primary)]"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Star size={18} />
                  </motion.div>
                  <div>
                    <div className="font-serif text-sm" style={{ color: 'var(--color-text-primary)' }}>Award Winning</div>
                    <div className="text-[9px] uppercase tracking-[0.15em] font-bold" style={{ color: 'var(--color-text-muted)' }}>Dental Excellence</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Scroll</span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-[var(--color-brand-primary)] to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      <section className="border-y border-[var(--color-brand-dark)]/10 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-brand-primary)]/[0.02] to-transparent" />
        
        <div className="container mx-auto px-6 relative">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--color-brand-dark)]/10"
            variants={fadeInStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((s, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
              >
                <div className="py-12 text-center group cursor-default">
                  <motion.div 
                    className="text-4xl md:text-5xl font-serif mb-2" 
                    style={{ color: 'var(--color-brand-primary)' }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    {s.value}
                  </motion.div>
                  <div className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: 'var(--color-text-muted)' }}>
                    {s.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-[var(--color-base-bg)] relative">
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle, var(--color-brand-primary) 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        />

        <div className="container mx-auto px-6 relative">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={fadeInStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {[
              { title: 'Our Services', desc: 'Comprehensive treatments', icon: Shield, link: '/services' },
              { title: 'Meet the Doctor', desc: 'Dr. Neeraj Agrawal', icon: Star, link: '/about' },
              { title: 'Book Online', desc: 'Schedule your visit', icon: Clock, link: '/appointment' },
              { title: 'Our Patients', desc: 'Real stories', icon: Users, link: '/testimonials' },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <motion.div
                  variants={hoverLift}
                  initial="rest"
                  whileHover="hover"
                  className="h-full"
                >
                  <Link to={item.link} data-cursor data-cursor-text="Explore">
                    <div className="dental-card p-8 flex flex-col gap-6 h-full group cursor-pointer">
                      <motion.div 
                        className="w-12 h-12 rounded-full border border-[var(--color-brand-primary)]/30 flex items-center justify-center text-[var(--color-brand-primary)] group-hover:bg-[var(--color-brand-primary)] group-hover:text-white transition-all duration-500"
                        whileHover={{ rotate: 5 }}
                      >
                        <item.icon size={20} strokeWidth={1.5} />
                      </motion.div>
                      <div>
                        <h3 className="font-serif text-2xl mb-2 group-hover:text-[var(--color-brand-primary)] transition-colors"
                          style={{ color: 'var(--color-text-primary)' }}>
                          {item.title}
                        </h3>
                        <p className="text-sm font-light" style={{ color: 'var(--color-text-secondary)' }}>{item.desc}</p>
                      </div>
                      <motion.div 
                        className="mt-auto flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all"
                        style={{ color: 'var(--color-brand-primary)' }}
                      >
                        Explore 
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          <ArrowRight size={14} />
                        </motion.span>
                      </motion.div>
                    </div>
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-brand-primary)]/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-brand-primary)]/[0.02] rounded-full blur-3xl" />

        <div className="container mx-auto px-6 relative">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="lg:w-1/2 relative">
              <motion.div
                variants={slideInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div
                  variants={hoverLift}
                  initial="rest"
                  whileHover="hover"
                >
                  <div className="relative aspect-[4/5] max-w-md mx-auto">
                    <motion.img
                      src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800"
                      alt="Modern dental clinic"
                      className="w-full h-full object-cover rounded-sm"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.5 }}
                      referrerPolicy="no-referrer"
                    />
                    <motion.div 
                      className="absolute -inset-4 border border-[var(--color-brand-primary)]/30 -z-10"
                      initial={{ x: 20, y: 20 }}
                      whileInView={{ x: 40, y: 40 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  animate={{ y: [0, -10, 0] }}
                  className="absolute -bottom-8 -left-8 glass-card p-6 shadow-xl max-w-[260px]"
                >
                  <div className="flex items-center gap-4">
                    <motion.div 
                      className="w-12 h-12 rounded-full border border-[var(--color-brand-primary)] flex items-center justify-center text-[var(--color-brand-primary)]"
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Star size={20} />
                    </motion.div>
                    <div>
                      <div className="font-serif text-lg" style={{ color: 'var(--color-text-primary)' }}>Gold Medalist</div>
                      <div className="text-[10px] uppercase tracking-[0.1em] font-bold" style={{ color: 'var(--color-text-muted)' }}>Dr. Neeraj Agrawal</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            <div className="lg:w-1/2">
              <motion.div
                variants={slideInRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div 
                  className="inline-flex items-center gap-3 mb-8"
                  variants={fadeInUp}
                >
                  <motion.div 
                    className="w-8 h-[1px] bg-[var(--color-brand-primary)]"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{ originX: 0 }}
                  />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: 'var(--color-brand-primary)' }}>
                    Why Choose Us
                  </span>
                </motion.div>
                
                <motion.h2 
                  className="text-5xl md:text-6xl font-serif leading-[1.1] mb-8"
                  style={{ color: 'var(--color-text-primary)' }}
                  variants={fadeInUp}
                >
                  Excellence in Every
                  <br />
                  <span className="italic text-[var(--color-brand-primary)]">Dental Procedure</span>
                </motion.h2>
                
                <motion.p 
                  className="text-lg mb-10 font-light leading-relaxed"
                  style={{ color: 'var(--color-text-secondary)' }}
                  variants={fadeInUp}
                >
                  At DE Dental Square, we combine state-of-the-art technology
                  with artistic precision. Every procedure is performed with
                  clinical excellence and a gentle touch.
                </motion.p>
                
                <motion.ul 
                  className="space-y-6 mb-12"
                  variants={fadeInStagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[
                    'Advanced Dental Implants & Prosthetics',
                    'Painless Laser Root Canal Treatments',
                    'Customized Smile Architecture',
                    'Strict ISO-Grade Sterilization',
                    '3D Digital Imaging Diagnostics',
                  ].map((item, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-center gap-4 font-light text-lg group cursor-default"
                      style={{ color: 'var(--color-text-primary)' }}
                      variants={fadeInUp}
                    >
                      <motion.div 
                        className="w-2 h-2 rounded-full bg-[var(--color-brand-primary)] group-hover:scale-150 transition-transform"
                      />
                      <span className="group-hover:text-[var(--color-brand-primary)] transition-colors">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
                
                <Magnetic>
                  <Link to="/about">
                    <motion.button 
                      whileHover={{ scale: 1.05, y: -4, boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.1)" }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="btn-secondary px-10 py-4 text-xs"
                    >
                      Learn More About Us
                    </motion.button>
                  </Link>
                </Magnetic>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 overflow-hidden border-y border-[var(--color-brand-dark)]/10 bg-[var(--color-base-bg)] relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--color-base-bg)] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--color-base-bg)] to-transparent z-10" />
        
        <motion.div 
          className="flex animate-marquee whitespace-nowrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {[...Array(3)].flatMap((_, arrayIndex) =>
            ['Dental Implants', 'Smile Makeover', 'Root Canal', 'Teeth Whitening', 'Orthodontics', 'Oral Surgery', 'Pediatric Care', 'Gum Treatment'].map((s, i) => (
              <motion.span 
                key={`${arrayIndex}-${i}`} 
                className="inline-flex items-center gap-6 mx-8 text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: 'var(--color-text-muted)' }}
                whileHover={{ color: 'var(--color-brand-primary)' }}
              >
                <motion.span 
                  className="w-2 h-2 rounded-full bg-[var(--color-brand-primary)]"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                />
                {s}
              </motion.span>
            ))
          )}
        </motion.div>
      </section>
    </div>
  );
}
