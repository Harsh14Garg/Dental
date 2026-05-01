import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { services } from '../constants/services';
import { ArrowLeft, ArrowRight, ChevronDown, ChevronRight, Phone, Mail, MapPin, Sparkles, Activity, Microscope } from 'lucide-react';

export default function ServiceDetail() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = services.find(s => s.id === serviceId);
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  if (!service) {
    return (
      <div className="py-32 text-center bg-[var(--color-espresso)] min-h-screen">
        <h2 className="text-3xl font-serif text-[var(--color-cream)]">Service not found</h2>
        <Link to="/services" className="text-[var(--color-bronze)] mt-4 inline-block hover:text-[var(--color-caramel)] hover:underline">Back to Services</Link>
      </div>
    );
  }

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index);
  };

  const otherServices = services.filter(s => s.id !== serviceId).slice(0, 3);

  return (
    <div className="bg-[var(--color-espresso)] min-h-screen font-sans text-[var(--color-cream)]">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[75vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={service.image} 
            alt={service.title} 
            className="w-full h-full object-cover" 
            width={1920}
            height={1080}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80"></div>
        </div>

        <div className="absolute top-24 left-8 md:left-16 z-20">
          <Link to="/services" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-[11px] uppercase tracking-[0.15em] transition-all duration-300">
            <ArrowLeft size={14} /> <span>Back to Services</span>
          </Link>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-[var(--color-bronze)]/60"></div>
            <span className="text-[10px] text-[var(--color-bronze)] uppercase tracking-[0.3em] font-medium">DE DENTAL SQUARE</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 drop-shadow-lg tracking-tight">
            {service.title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
            {service.description}
          </p>
        </div>
      </section>

      {/* 2. OVERVIEW SECTION */}
      <section className="py-24 md:py-32 px-6 relative bg-[var(--color-warmgray)] overflow-hidden">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-[var(--color-bronze)]/5 rounded-full blur-[80px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <div className="hidden md:flex flex-col items-center pt-2">
              <div className="w-12 h-12 rounded-full border border-[var(--color-coffee)] flex items-center justify-center text-[var(--color-bronze)] bg-[var(--color-espresso)]">
                <Sparkles size={20} strokeWidth={1.5} />
              </div>
              <div className="w-px h-full bg-gradient-to-b from-[var(--color-coffee)] to-transparent mt-6 min-h-[120px]"></div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <span className="hidden md:block absolute -left-10 -top-6 text-7xl text-[var(--color-bronze)]/10 font-serif leading-none font-bold">"</span>
                <p className="text-xl md:text-2xl text-[var(--color-latte)] leading-[1.8] font-light relative z-10">
                  {service.longDescription}
                </p>
              </div>
              <div className="flex items-center gap-4 mt-10 md:mt-12">
                <div className="w-12 h-px bg-[var(--color-bronze)]"></div>
                <span className="text-[var(--color-latte)]/80 font-medium tracking-[0.2em] uppercase text-[11px] bg-[var(--color-warmgray)] px-2">The De Dental Standard</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. KEY BENEFITS */}
      <section className="py-24 px-6 bg-[var(--color-espresso)]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[var(--color-bronze)]"></div>
              <span className="text-[10px] text-[var(--color-bronze)] uppercase tracking-[0.2em] font-bold">KEY BENEFITS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-[var(--color-cream)]">
              Why Choose <span className="italic text-[var(--color-bronze)]">This Treatment</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {service.benefits.map((benefit, i) => (
              <div key={i} className="bg-[var(--color-card-bg)] p-8 rounded-xl flex items-center gap-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] border border-[var(--color-latte)]/10">
                <div className="w-14 h-14 rounded-full border border-[var(--color-latte)]/20 text-[var(--color-bronze)] flex-shrink-0 flex items-center justify-center font-serif text-xl">
                  {i + 1}
                </div>
                <h3 className="text-lg text-[var(--color-cream)] font-medium">{benefit}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROCESS STREAMLINE */}
      <section className="py-24 px-6 bg-[var(--color-warmgray)] overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[var(--color-bronze)]"></div>
              <span className="text-[10px] text-[var(--color-bronze)] uppercase tracking-[0.2em] font-bold">OUR PROCESS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-[var(--color-cream)]">
              Your Journey to <span className="italic text-[var(--color-bronze)]">Recovery</span>
            </h2>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-px bg-[var(--color-coffee)] text-[var(--color-coffee)]"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
              {service.process.map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="w-14 h-14 rounded-full bg-[var(--color-card-bg)] border border-[var(--color-bronze)] text-[var(--color-bronze)] flex items-center justify-center font-serif text-xl mb-6 shadow-sm group-hover:bg-[var(--color-bronze)] group-hover:text-white transition-colors duration-300">
                    {i + 1}
                  </div>
                  <h4 className="text-sm font-semibold text-[var(--color-cream)] uppercase tracking-wide mb-3">{step.title}</h4>
                  <p className="text-[13px] text-[var(--color-latte)] font-light leading-relaxed max-w-[200px]">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRICING SECTION */}
      <section className="py-24 px-6 bg-[var(--color-espresso)]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-[var(--color-bronze)]"></div>
            <span className="text-[10px] text-[var(--color-bronze)] uppercase tracking-[0.2em] font-bold">INVESTMENT</span>
            <div className="w-8 h-px bg-[var(--color-bronze)]"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-[var(--color-cream)] mb-6">
            Transparent <span className="italic text-[var(--color-bronze)]">Pricing</span>
          </h2>
          <p className="text-base text-[var(--color-latte)] mb-16 max-w-xl mx-auto font-light">
            Select a tier that best fits your requirements. Custom packages available upon consultation.
          </p>

          <div className="grid md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
            {/* Essential */}
            <div className="bg-[var(--color-card-bg)] p-10 rounded-2xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] border border-[var(--color-coffee)]">
              <h3 className="text-xl text-[var(--color-cream)] font-medium mb-2">Essential</h3>
              <div className="text-3xl font-serif text-[var(--color-bronze)] mb-8">₹1,500+</div>
              <ul className="space-y-4 text-sm text-[var(--color-latte)] text-left">
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[var(--color-latte)]/30"></span> Standard materials</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[var(--color-latte)]/30"></span> Routine procedure</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[var(--color-latte)]/30"></span> 3 month warranty</li>
              </ul>
            </div>

            {/* Premium */}
            <div className="bg-[var(--card-bg)] p-12 rounded-2xl shadow-2xl relative transform md:-translate-y-4 border border-[var(--color-latte)]/10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-bronze)] text-white text-[10px] font-bold uppercase tracking-[0.1em] px-4 py-1.5 rounded-full">
                MOST CHOICE
              </div>
              <h3 className="text-xl text-white font-medium mb-2">Premium</h3>
              <div className="text-4xl font-serif text-[var(--color-bronze)] mb-8">₹4,500+</div>
              <ul className="space-y-5 text-sm text-white/80 text-left">
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[var(--color-bronze)]"></span> Advanced biomaterials</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[var(--color-bronze)]"></span> Priority booking</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[var(--color-bronze)]"></span> 1 year warranty</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[var(--color-bronze)]"></span> Free consultation</li>
              </ul>
            </div>

            {/* Signature */}
            <div className="bg-[var(--color-card-bg)] p-10 rounded-2xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] border border-[var(--color-coffee)]">
              <h3 className="text-xl text-[var(--color-cream)] font-medium mb-2">Signature</h3>
              <div className="text-3xl font-serif text-[var(--color-bronze)] mb-8">₹12,000+</div>
              <ul className="space-y-4 text-sm text-[var(--color-latte)] text-left">
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[var(--color-latte)]/30"></span> Imported premium materials</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[var(--color-latte)]/30"></span> Executive lounge access</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[var(--color-latte)]/30"></span> Lifetime warranty*</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="py-24 px-6 bg-[var(--color-warmgray)]">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-[var(--color-bronze)]"></div>
            <span className="text-[10px] text-[var(--color-bronze)] uppercase tracking-[0.2em] font-bold">FAQ</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-[var(--color-cream)]">
            Common <span className="italic text-[var(--color-bronze)]">Questions</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {service.faq.map((item, i) => (
            <div key={i} className="border border-[var(--color-coffee)] rounded-lg bg-[var(--color-card-bg)] overflow-hidden shadow-sm">
              <button 
                onClick={() => toggleFaq(i)}
                className="w-full text-left px-8 py-6 flex items-center justify-between font-medium text-[var(--color-cream)] hover:bg-[var(--color-espresso)]/40 transition-colors"
              >
                <span>{item.q}</span>
                <ChevronDown size={18} className={`text-[var(--color-bronze)] transform transition-transform duration-300 ${openFaqIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openFaqIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6 text-[var(--color-latte)] font-light text-sm leading-relaxed border-t border-[var(--color-latte)]/10 pt-4">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CTA BANNER */}
      <section className="py-24 px-6 bg-[color-mix(in srgb,var(--color-espresso) 80%,transparent)] relative overflow-hidden">
        {/* Subtle radial sheen */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[var(--color-bronze)]/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-[var(--color-bronze)]"></div>
            <span className="text-[10px] text-[var(--color-bronze)] uppercase tracking-[0.2em] font-bold">TAKE THE NEXT STEP</span>
            <div className="w-8 h-px bg-[var(--color-bronze)]"></div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
            Ready to Begin Your <span className="italic text-[var(--color-bronze)]">Journey?</span>
          </h2>
          <p className="text-lg text-white/70 mb-12 font-light">
            Book a private consultation for <strong className="text-white font-medium">{service.title}</strong> with Dr. Neeraj Agrawal today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/appointment" className="w-full sm:w-auto bg-[var(--color-bronze)] hover:bg-[var(--color-caramel)] text-white px-8 py-4 rounded font-bold text-[11px] uppercase tracking-[0.15em] transition-colors flex items-center justify-center gap-2 group">
              BOOK THIS TREATMENT <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/services" className="w-full sm:w-auto border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded font-bold text-[11px] uppercase tracking-[0.15em] transition-colors flex items-center justify-center">
              ALL SERVICES
            </Link>
          </div>
        </div>
      </section>

      {/* 8. OTHER TREATMENTS */}
      <section className="py-24 px-6 bg-[var(--color-espresso)]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[var(--color-bronze)]"></div>
              <span className="text-[10px] text-[var(--color-bronze)] uppercase tracking-[0.2em] font-bold">YOU MAY ALSO LIKE</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-[var(--color-cream)]">
              Other <span className="italic text-[var(--color-bronze)]">Treatments</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {otherServices.map((other, i) => (
              <div key={i} className="bg-[var(--color-card-bg)] p-10 rounded-xl group hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] transition-all duration-300 border border-[var(--color-coffee)]">
                <div className="mb-6 text-[var(--color-bronze)]">
                  <other.icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-serif text-[var(--color-cream)] mb-3">{other.title}</h3>
                <p className="text-sm text-[var(--color-latte)] font-light leading-relaxed mb-8">{other.description}</p>
                <Link to={`/services/${other.id}`} className="text-[11px] font-bold text-[var(--color-bronze)] uppercase tracking-[0.15em] flex items-center gap-2 group/link">
                  LEARN MORE <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

