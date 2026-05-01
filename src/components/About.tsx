import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { slideInLeft, fadeInUp, fadeInStagger } from '../lib/animations';

const stats = [
  { label: 'Years of Experience', value: 12, suffix: '+' },
  { label: 'Happy Patients', value: 15, suffix: 'k+' },
  { label: 'Expert Doctors', value: 20, suffix: '+' },
  { label: 'Success Rate', value: 99, suffix: '%' },
];

function AnimatedStat({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number;
      const duration = 1000;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(ease * value));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(value);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const facilityImages = [
  "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"
];

const transformations = [
  { 
    img: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=800", 
    service: "Veneers & Smile Makeover",
    info: "Complete smile redesign using premium porcelain veneers for a flawless, natural look."
  },
  { 
    img: "https://images.unsplash.com/photo-1590625909871-33230a10aa04?auto=format&fit=crop&q=80&w=800", 
    service: "Orthodontics / Aligners",
    info: "Discreet alignment correction resulting in a perfectly straight, confident smile."
  },
  { 
    img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800", 
    service: "Dental Implants",
    info: "Permanent, secure replacements for missing teeth using advanced titanium fixtures."
  },
  { 
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800", 
    service: "Full Mouth Rehabilitation",
    info: "Comprehensive restoration of oral health, function, and aesthetics for severe cases."
  },
];

export default function About() {
  return (
    <div className="bg-[var(--color-espresso)] min-h-screen">
      {/* SECTION 1: HERO */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=2000" 
            alt="Clinic Interior"
            className="w-full h-full object-cover blur-sm opacity-30"
            width={2000}
            height={1000}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-espresso)] via-[var(--color-espresso)]/70 to-[var(--color-espresso)]"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-shadow drop-shadow-lg"
          >
            <div className="text-[var(--color-bronze)] font-medium tracking-[0.2em] uppercase text-xs mb-6">
              OUR STORY
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-[var(--color-cream)] mb-6 leading-[1.1] drop-shadow-md">
              Legacy of <span className="italic text-[var(--color-bronze)] font-normal">Excellence</span>
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-cream)] font-medium max-w-2xl mx-auto leading-relaxed drop-shadow">
              Decades of experience meeting modern innovation. Discover the art and science of premium dental care.
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <span className="text-[11px] uppercase text-[var(--color-bronze)] tracking-[0.15em] font-medium">
            Scroll to Discover
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-[1px] h-8 bg-[var(--color-bronze)]"
          />
        </motion.div>
      </section>

      {/* SECTION 2: THE LEGACY */}
      <section className="bg-[var(--color-warmgray)] py-20 md:py-32 relative">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid lg:grid-cols-[45%_55%] gap-12 lg:gap-16 items-center">
            {/* Left Column: Image */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10 overflow-hidden rounded-t-[8px] img-zoom shadow-warm">
                <img 
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=1000" 
                  alt="Dr. Neeraj Agrawal examining dental X-rays"
                  className="w-full object-cover aspect-[3/4]"
                  width={600}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Floating Badge */}
              <motion.div 
                className="absolute -bottom-6 -right-6 z-20 bg-[var(--color-espresso)] border border-[var(--color-bronze)]/20 py-4 px-6 rounded-lg shadow-warm flex items-center gap-4 py-4 px-6 rounded-lg hidden sm:flex"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="w-10 h-10 rounded-full bg-[var(--color-bronze)]/10 flex items-center justify-center text-[var(--color-bronze)] shrink-0">
                  <Award size={20} />
                </div>
                <div>
                  <div className="text-[var(--color-cream)] font-medium text-sm whitespace-nowrap">Premium Standard</div>
                  <div className="text-[var(--color-latte)]/80 text-xs whitespace-nowrap uppercase tracking-wider mt-0.5">De Dental Square</div>
                </div>
              </motion.div>

              {/* Vertical Text */}
              <div className="absolute top-1/2 -left-8 transform -translate-y-1/2 hidden xl:block">
                <div className="vertical-text text-[10px] uppercase tracking-[0.2em] text-[var(--color-latte)] font-medium opacity-60">
                  EXCELLENCE · CARE · TRUST
                </div>
              </div>
            </motion.div>

            {/* Right Column: Text */}
            <div className="py-8">
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h2 className="text-[var(--color-bronze)] font-medium tracking-[0.15em] uppercase text-xs mb-6 flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-[var(--color-bronze)]/50"></span>
                  THE LEGACY
                  <span className="w-8 h-[1px] bg-[var(--color-bronze)]/50"></span>
                </h2>
                <p className="text-4xl md:text-5xl font-serif text-[var(--color-cream)] mb-8 leading-[1.2]">
                  Crafting Smiles with <span className="italic text-[var(--color-bronze)]">Passion</span>
                </p>
                <p className="text-base text-[var(--color-latte)] mb-8 leading-[1.7] font-light max-w-[560px]">
                  De Dental Square was founded on the principle of providing high-quality, compassionate dental care to the Varanasi community. 
                </p>

                <p className="text-base text-[var(--color-latte)] mb-8 leading-[1.7] font-light max-w-[560px]">
                  Our state-of-the-art facility in Ravindrapuri is equipped with the latest technology to ensure your comfort and safety.
                </p>

                <motion.div 
                  className="grid gap-4"
                  variants={fadeInStagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[
                    'Elite team of specialized surgeons',
                    'Next-gen diagnostic technology',
                    'Bespoke aesthetic treatment plans',
                    'Premium patient experience'
                  ].map((item, i) => (
                    <motion.div key={i} variants={fadeInUp} className="flex items-center gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-bronze)] shrink-0"></div>
                      <span className="text-[var(--color-latte)] font-normal text-[15px]">{item}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: STATS BAR */}
      <section className="bg-[var(--color-warmgray)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-bronze)]/20 to-transparent"></div>
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-20">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8"
            variants={fadeInStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, i) => (
              <motion.div key={i} variants={fadeInUp} className="flex flex-col items-center text-center">
                <div className="text-5xl md:text-[56px] leading-[1] font-serif text-[var(--color-bronze)] mb-4">
                  <AnimatedStat value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[11px] text-[var(--color-latte)] uppercase tracking-[0.12em] font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: CLINIC TOUR */}
      <section className="bg-[var(--color-espresso)] py-20 md:py-32">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-[var(--color-bronze)] font-medium tracking-[0.15em] uppercase text-xs mb-6 flex items-center justify-center gap-4">
              <span className="w-10 h-[1px] bg-[var(--color-bronze)]/50"></span>
              CLINIC TOUR
              <span className="w-10 h-[1px] bg-[var(--color-bronze)]/50"></span>
            </h2>
            <p className="text-4xl md:text-[48px] font-serif text-[var(--color-cream)] mb-4">
              A World-Class <span className="italic text-[var(--color-bronze)]">Facility</span>
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={fadeInStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {facilityImages.map((img, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp} 
                className="relative overflow-hidden aspect-[4/3] group cursor-pointer bg-[var(--color-warmgray)]"
              >
                <img 
                  src={img} 
                  alt="Clinic Facility"
                  className="w-full h-full object-cover transition-transform duration-700 cubic-bezier(0.25, 0.46, 0.45, 0.94) group-hover:scale-[1.03]"
                  width={600}
                  height={450}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-[var(--color-espresso)]/0 group-hover:bg-[var(--color-espresso)]/70 transition-colors duration-500 flex items-end justify-center pb-8 opacity-0 group-hover:opacity-100">
                  <span className="text-[var(--color-cream)] font-medium text-sm flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    View Gallery <ArrowRight size={16} />
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: MEET THE EXPERTS */}
      <section className="bg-[var(--color-warmgray)] py-20 md:py-32 relative">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-[var(--color-bronze)] font-medium tracking-[0.15em] uppercase text-xs mb-6 flex items-center justify-center gap-4">
              <span className="w-10 h-[1px] bg-[var(--color-bronze)]/50"></span>
              OUR TEAM
              <span className="w-10 h-[1px] bg-[var(--color-bronze)]/50"></span>
            </h2>
            <p className="text-4xl md:text-[48px] font-serif text-[var(--color-cream)] mb-6">
              Meet the <span className="italic text-[var(--color-bronze)]">Experts</span>
            </p>
            <p className="text-base text-[var(--color-latte)]/80 font-light max-w-[500px] mx-auto">
              Our lead visionary ensuring world-class dental excellence.
            </p>
          </div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-[645px] group bg-[var(--color-espresso)] rounded-lg shadow-warm-glow border border-[var(--color-latte)]/10 transition-all duration-500 overflow-hidden flex flex-col">
              <div className="w-full aspect-[3/4] sm:aspect-square md:aspect-[4/3] overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=1000" 
                  alt="Dr. Neeraj Agrawal"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-espresso)] via-transparent to-transparent opacity-60"></div>
              </div>
              
              <div className="bg-[var(--color-espresso)] p-8 flex border-t border-[var(--color-latte)]/10 z-10 flex-col">
                <div className="text-center sm:text-left transition-all duration-500">
                  <h3 className="text-[28px] font-serif text-[var(--color-cream)] mb-2 decoration-[var(--color-bronze)]">Dr. Neeraj Agrawal</h3>
                  <p className="text-[12px] uppercase tracking-[0.1em] text-[var(--color-bronze)] font-medium">Lead Dentist & Founder</p>
                </div>
                
                <div className="pt-6 border-t border-[var(--color-latte)]/10 mt-6 transition-all duration-500 ease-in-out">
                  <div className="overflow-hidden">
                    <div className="grid sm:grid-cols-2 gap-6 text-[14px] text-[var(--color-cream)]/90 leading-relaxed font-light">
                      <div>
                        <strong className="text-[var(--color-bronze)] block text-[11px] uppercase tracking-wider mb-1 font-medium">Education</strong>
                        MDS, MISO, IAOCO, FAGE<br/>
                        <span className="text-[var(--color-cream)]/60 text-[12px]">Ex. Resident, Faculty of Dental Science IMS, BHU</span>
                      </div>
                      <div>
                        <strong className="text-[var(--color-bronze)] block text-[11px] uppercase tracking-wider mb-1 font-medium">Specializations</strong>
                        Periodontist & Oral Implantologist
                      </div>
                      <div>
                        <strong className="text-[var(--color-bronze)] block text-[11px] uppercase tracking-wider mb-1 font-medium">Achievements</strong>
                        Gold Medalist<br/>
                        <span className="text-[var(--color-cream)]/60 text-[12px]">International Associate, World Dental Council</span>
                      </div>
                      <div>
                        <strong className="text-[var(--color-bronze)] block text-[11px] uppercase tracking-wider mb-1 font-medium">Experience</strong>
                        12+ Years
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6: AESTHETIC EXCELLENCE (TRANSITION) */}
      <section className="bg-[var(--color-latte)]/10 py-20 md:py-32 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 text-center mb-12">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="text-[var(--color-bronze)] font-medium tracking-[0.15em] uppercase text-xs mb-4">
              AESTHETIC EXCELLENCE
            </div>
            <h2 className="text-4xl md:text-[42px] font-serif text-[var(--color-cream)]">
              Experience the <span className="italic text-[var(--color-bronze)]">Transformation</span>
            </h2>
          </motion.div>
        </div>
        
        <div className="w-full pb-8">
          <motion.div
            variants={fadeInStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex overflow-x-auto gap-6 px-6 md:px-16 snap-x snap-mandatory scrollbar-hide py-4"
          >
            {transformations.map((item, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                className="min-w-[300px] md:min-w-[400px] lg:min-w-[500px] snap-center rounded-lg overflow-hidden relative group border border-[var(--color-latte)]/10 shadow-warm flex-shrink-0"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={item.img} 
                    alt={item.service}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-espresso)]/95 via-[var(--color-espresso)]/60 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="absolute bottom-6 left-6 right-6 text-left">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[var(--color-bronze)] text-[10px] uppercase tracking-[0.2em] font-medium block mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 border-b border-[var(--color-bronze)]/30 pb-2 w-max">
                      Before & After
                    </span>
                    <h3 className="text-xl md:text-2xl font-serif text-[var(--color-cream)] mb-2">
                      {item.service}
                    </h3>
                    <p className="text-[13px] text-[var(--color-latte)] leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                      {item.info}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: CTA */}
      <section className="bg-[var(--color-espresso)] py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            variants={fadeInStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="text-[var(--color-bronze)] font-medium tracking-[0.15em] uppercase text-xs mb-6 flex items-center justify-center gap-4">
              <span className="w-8 h-[1px] bg-[var(--color-bronze)]/50"></span>
              BEGIN YOUR JOURNEY
              <span className="w-8 h-[1px] bg-[var(--color-bronze)]/50"></span>
            </motion.div>
            
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-[42px] font-serif text-[var(--color-cream)] mb-6 leading-tight">
              Ready for Your <span className="italic text-[var(--color-bronze)]">Smile Transformation?</span>
            </motion.h2>
            
            <motion.p variants={fadeInUp} className="text-[17px] text-[var(--color-latte)] font-light mb-10">
              Schedule a private consultation with Dr. Neeraj Agrawal today.
            </motion.p>
            
            <motion.div variants={fadeInUp}>
              <a 
                href="/appointment"
                className="inline-flex items-center gap-2 bg-[var(--color-bronze)] text-[var(--color-cream)] font-medium text-[13px] uppercase tracking-[0.08em] px-8 py-4 rounded transition-all duration-300 hover:bg-[var(--color-caramel)] hover:-translate-y-1 hover:shadow-warm-glow group"
              >
                Book a Consultation
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
