import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, Zap, Sparkles, 
  Check, ArrowRight, Loader2, RefreshCcw 
} from 'lucide-react';

type ServiceType = 'implants' | 'ortho' | 'veneers';

interface EstimatorState {
  currentPhase: number;
  selectedService: ServiceType | null;
}

const PRICING = {
  implants: 45000,
  ortho: 150000,
  veneers: 22000,
};

const SERVICE_NAMES = {
  implants: 'Advanced Implants',
  ortho: 'Invisible Ortho',
  veneers: 'Aesthetic Veneers'
};

export default function Estimator() {
  const [state, setState] = useState<EstimatorState>(() => {
    const saved = localStorage.getItem('de_dental_estimator_state_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return {
      currentPhase: 1,
      selectedService: null,
    };
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Calculate Progress (now out of 2)
  const progressPercent = (state.currentPhase / 2) * 100;

  useEffect(() => {
    if (state.currentPhase < 2) {
      localStorage.setItem('de_dental_estimator_state_v2', JSON.stringify(state));
    }
  }, [state]);

  const updateState = (updates: Partial<EstimatorState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (state.currentPhase === 1 && !state.selectedService) return;
    
    if (state.currentPhase === 1) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        updateState({ currentPhase: 2 });
      }, 1000);
      return;
    }
  };

  const handleBack = () => {
    updateState({ currentPhase: Math.max(1, state.currentPhase - 1) });
  };

  const startOver = () => {
    localStorage.removeItem('de_dental_estimator_state_v2');
    setState({
      currentPhase: 1,
      selectedService: null,
    });
  };

  const calculateEstimate = () => {
    if (!state.selectedService) return null;
    
    const basePrice = PRICING[state.selectedService];
    const subtotal = basePrice;
    
    let additionalFees = [];
    
    if (state.selectedService === 'implants') {
      additionalFees.push({ label: 'Surgical Guide', cost: 5000 });
    }
    
    if (state.selectedService === 'ortho') {
      additionalFees.push({ label: 'Retention Appliances', cost: 5000 });
    }
    
    additionalFees.push({ label: 'Digital Smile Design', cost: 5000 });
    additionalFees.push({ label: 'Consultation & Diagnostics', cost: 2000 });
    
    const totalAdditional = additionalFees.reduce((sum, fee) => sum + fee.cost, 0);
    const total = subtotal + totalAdditional;
    
    return {
      total,
      breakdown: [
        { label: `${SERVICE_NAMES[state.selectedService]}`, cost: subtotal },
        ...additionalFees,
        { label: 'TOTAL ESTIMATE', cost: total, isTotal: true }
      ]
    };
  };

  const estimate = calculateEstimate();

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  const OptionCard = ({ 
    selected, onClick, icon: Icon, title, description, priceLabel, badge 
  }: { 
    selected: boolean; onClick: () => void; icon: React.ElementType; title: string; description: string; priceLabel?: string; badge?: string 
  }) => (
    <motion.div
      onClick={onClick}
      className={`relative cursor-pointer rounded-xl p-7 border transition-all duration-300 ${
        selected 
        ? 'bg-[var(--color-espresso)] border-[var(--color-bronze)] shadow-[0_8px_24px_rgba(192,157,89,0.15)] ring-1 ring-[var(--color-bronze)]'
        : 'bg-[var(--color-espresso)]/40 border-[var(--color-latte)]/10 hover:border-[var(--color-latte)]/30 hover:-translate-y-1 hover:shadow-xl hover:bg-[var(--color-espresso)]/80'
      }`}
    >
      {badge && (
        <div className="absolute top-4 right-4 bg-[var(--color-bronze)]/15 text-[var(--color-bronze)] text-[10px] font-semibold tracking-wider px-2.5 py-1 rounded-full uppercase">
          {badge}
        </div>
      )}
      
      {selected && (
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="absolute top-4 right-4 text-[var(--color-bronze)]"
        >
          <Check size={20} />
        </motion.div>
      )}

      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-colors duration-300 ${
        selected ? 'bg-[var(--color-bronze)]/10 text-[var(--color-bronze)]' : 'bg-[var(--color-warmgray)] text-[var(--color-latte)]'
      }`}>
        <Icon size={24} strokeWidth={selected ? 2 : 1.5} />
      </div>

      <h3 className={`font-semibold text-base mb-2 transition-colors duration-300 ${selected ? 'text-[var(--color-cream)]' : 'text-[var(--color-cream)]'}`}>
        {title}
      </h3>
      <p className="text-[var(--color-latte)] text-[13px] leading-relaxed opacity-80 uppercase tracking-wide">
        {description}
      </p>
      
      {priceLabel && (
        <div className="mt-6 text-[12px] font-medium text-[var(--color-latte)]/80 pt-4 border-t border-[var(--color-latte)]/10">
          {priceLabel}
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="py-24 md:py-32 bg-[var(--color-warmgray)] relative overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-10 bg-[var(--color-latte)]/30"></div>
            <span className="text-[12px] font-medium text-[var(--color-latte)] uppercase tracking-[0.2em]">Standard Guidance</span>
            <div className="h-[1px] w-10 bg-[var(--color-latte)]/30"></div>
          </div>
          <h2 className="text-4xl md:text-[48px] font-serif text-[var(--color-cream)] mb-4 leading-tight">
            Treatment Value <span className="italic text-[var(--color-bronze)]">Estimator</span>
          </h2>
          <p className="text-base text-[var(--color-latte)] font-normal leading-relaxed">
            Receive a curated laboratory fee estimation for our signature treatments instantly.
          </p>
        </div>

        {/* Main Estimator Card */}
        <div className="bg-[var(--color-espresso)] border border-[var(--color-latte)]/10 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-[var(--color-latte)]/5">
            <motion.div 
              className="h-full bg-gradient-to-r from-[var(--color-caramel)] to-[var(--color-bronze)]"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>

          <AnimatePresence mode="wait">
            {/* PHASE 1: Service Selection */}
            {state.currentPhase === 1 && (
              <motion.div 
                key="phase1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-10 text-center md:text-left">
                  <div className="text-[12px] font-semibold text-[var(--color-latte)] tracking-[0.15em] mb-2 uppercase">Phase <span className="text-[var(--color-bronze)] font-bold">01</span></div>
                  <h3 className="text-3xl font-serif text-[var(--color-cream)]">What service are you considering?</h3>
                </div>

                <div className="grid md:grid-cols-3 gap-5">
                  <OptionCard
                    icon={ShieldCheck}
                    title="Advanced Implants"
                    description="PERMANENT SOLUTION FOR MISSING TEETH WITH PREMIUM TITANIUM OR ZIRCONIA."
                    selected={state.selectedService === 'implants'}
                    onClick={() => updateState({ selectedService: 'implants' })}
                  />
                  <OptionCard
                    icon={Zap}
                    title="Invisible Ortho"
                    description="CLEAR ALIGNERS AND CERAMIC SYSTEMS FOR A PERFECT, DISCREET ALIGNMENT."
                    selected={state.selectedService === 'ortho'}
                    onClick={() => updateState({ selectedService: 'ortho' })}
                  />
                  <OptionCard
                    icon={Sparkles}
                    title="Aesthetic Veneers"
                    description="PRECISION-CRAFTED PORCELAIN VENEERS FOR A FLAWLESS CELEBRITY-GRADE SMILE."
                    selected={state.selectedService === 'veneers'}
                    onClick={() => updateState({ selectedService: 'veneers' })}
                  />
                </div>
              </motion.div>
            )}

            {/* PHASE 2: Result */}
            {state.currentPhase === 2 && estimate && (
              <motion.div 
                key="phase2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className="text-[12px] font-medium text-[var(--color-bronze)] tracking-[0.15em] mb-4 uppercase">YOUR ESTIMATE</div>
                <h3 className="text-4xl font-serif text-[var(--color-cream)] mb-4">Your Curated Estimate</h3>
                <p className="text-[15px] text-[var(--color-latte)] max-w-lg mx-auto mb-10 opacity-80">
                  Based on your selections, here is your personalized laboratory fee estimation.
                </p>

                <div className="mb-12">
                  <div className="text-5xl md:text-6xl font-serif text-[var(--color-bronze)] mb-3">
                    {formatCurrency(estimate.total)}
                  </div>
                  <div className="text-[12px] font-medium text-[var(--color-latte)] uppercase tracking-[0.12em]">ESTIMATED LABORATORY FEE</div>
                  <p className="text-[13px] text-[var(--color-latte)]/60 italic max-w-[400px] mx-auto mt-4">
                    Final costs may vary after clinical examination. This is a preliminary estimate.
                  </p>
                </div>

                <div className="max-w-md mx-auto text-left mb-12">
                  {estimate.breakdown.map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className={`flex justify-between items-center py-3.5 ${item.isTotal ? 'border-t-2 border-[var(--color-bronze)] mt-4 pt-4' : 'border-b border-[var(--color-latte)]/10'}`}
                    >
                      <span className={`text-[14px] ${item.isTotal ? 'font-bold text-[var(--color-bronze)]' : 'text-[var(--color-latte)] opacity-90'}`}>{item.label}</span>
                      <span className={`text-[14px] ${item.isTotal ? 'font-bold text-[var(--color-bronze)]' : 'text-[var(--color-cream)] font-medium'}`}>{formatCurrency(item.cost)}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <a 
                    href="/appointment"
                    className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-[var(--color-bronze)] hover:bg-[var(--color-caramel)] text-white font-semibold text-[13px] uppercase tracking-[0.1em] px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:-translate-y-1"
                  >
                    BOOK CONSULTATION <ArrowRight size={16} />
                  </a>
                  <button 
                    onClick={startOver}
                    className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-transparent hover:bg-[var(--color-latte)]/5 border border-[var(--color-latte)]/20 text-[var(--color-cream)] font-semibold text-[13px] uppercase tracking-[0.1em] px-8 py-4 rounded-lg transition-all duration-300"
                  >
                    START OVER <RefreshCcw size={16} />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Controls */}
          {state.currentPhase < 2 && (
            <div className="mt-12 flex items-center justify-between pt-6 border-t border-[var(--color-latte)]/10">
              <div>
                {/* Back button not needed on Phase 1 */}
              </div>
              <button 
                onClick={handleNext}
                disabled={(state.currentPhase === 1 && !state.selectedService) || isSubmitting}
                className="inline-flex items-center gap-2 bg-[var(--color-bronze)] hover:bg-[var(--color-caramel)] text-white font-semibold text-[13px] uppercase tracking-[0.1em] px-8 py-3.5 rounded-md transition-all duration-300 shadow-lg hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isSubmitting ? (
                  <>CALCULATING... <Loader2 size={16} className="animate-spin" /></>
                ) : (
                  <>GET MY ESTIMATE <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
            </div>
          )}
          
        </div>
      </div>
      
    </div>
  );
}
