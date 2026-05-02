import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User, Mail, Phone, MessageSquare,
  ArrowRight, ArrowLeft, Calendar, Clock, ChevronDown,
  Check, AlertCircle, Loader2, Sparkles, MapPin, ExternalLink, CheckCircle2
} from 'lucide-react';
import { bookAppointment } from '../firebase';
import { Link } from 'react-router-dom';

const servicesList = [
  { id: 'General Dentistry', label: 'General Dentistry', icon: '🦷' },
  { id: 'Cosmetic Dentistry', label: 'Cosmetic Dentistry', icon: '✨' },
  { id: 'Dental Implants', label: 'Dental Implants', icon: '🔩' },
  { id: 'Orthodontics', label: 'Orthodontics', icon: '📐' },
  { id: 'Oral Surgery', label: 'Oral Surgery', icon: '🔪' },
  { id: 'Pediatric Care', label: 'Pediatric Care', icon: '👶' },
  { id: 'Emergency Care', label: 'Emergency Care', icon: '🚨' },
  { id: 'Not Sure - Need Guidance', label: 'Not Sure — Need Guidance', icon: '❓' }
];

const InputField = ({ label, name, type, icon: Icon, placeholder, addon, formData, handleChange, handleBlur, errors, touched }: any) => {
  const error = errors[name];
  const isTouched = touched[name];
  const showSuccess = isTouched && !error && formData[name as keyof typeof formData] !== '';

  return (
    <div className="space-y-2 flex-1 w-full">
      <label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-heading)] flex items-center gap-2">
        <Icon size={14} className="text-[var(--copper)]" /> {label}
      </label>
      <div className="relative flex">
        {addon && (
          <div className="flex items-center justify-center bg-[var(--input-bg)] border-y border-l border-[var(--input-border)] rounded-l-xl px-4 text-[var(--text-heading)] font-medium z-10 border-r border-r-gray-200 dark:border-r-gray-700">
            {addon}
          </div>
        )}
        <input
          name={name}
          type={type}
          value={formData[name as keyof typeof formData]}
          onChange={(e) => handleChange(name, e.target.value)}
          onBlur={() => handleBlur(name)}
          placeholder={placeholder}
          className={`w-full bg-[var(--input-bg)] text-[var(--input-text)] border ${
            error ? 'border-[var(--error)]' : 'border-[var(--input-border)]'
          } ${addon ? 'rounded-r-xl' : 'rounded-xl'} px-4 py-4 text-[15px] transition-all duration-250 focus:border-[var(--copper)] focus:ring-4 focus:ring-[var(--copper)]/10 outline-none`}
        />
        {showSuccess && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--success)]">
            <Check size={18} />
          </div>
        )}
        {error && isTouched && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--error)]">
            <AlertCircle size={18} />
          </div>
        )}
      </div>
      {error && isTouched && (
        <div className="text-[13px] font-medium text-[var(--error)]">{error}</div>
      )}
    </div>
  );
};

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: ''
  });

  const [phase, setPhase] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [clockMode, setClockMode] = useState<'hour' | 'minute'>('hour');
  const [selectedHour, setSelectedHour] = useState<number>(10);
  const [selectedMinute, setSelectedMinute] = useState<number>(0);
  const [clockAmpm, setClockAmpm] = useState<'AM' | 'PM'>('AM');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isShake, setIsShake] = useState(false);
  const [globalError, setGlobalError] = useState('');
  const [refNum, setRefNum] = useState('');

  // Dropdown refs for click outside
  const serviceRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (serviceRef.current && !serviceRef.current.contains(event.target as Node)) {
        setIsServiceDropdownOpen(false);
      }
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setIsDatePickerOpen(false);
      }
      if (timeRef.current && !timeRef.current.contains(event.target as Node)) {
        setIsTimePickerOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const applyTime = (h: number, m: number, ap: 'AM'|'PM') => {
    let hour24 = h;
    if (ap === 'PM' && h !== 12) hour24 += 12;
    if (ap === 'AM' && h === 12) hour24 = 0;
    handleChange('time', `${String(hour24).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
  }

  const handleHourSelect = (h: number) => {
    setSelectedHour(h);
    setClockMode('minute');
    applyTime(h, selectedMinute, clockAmpm);
  };

  const handleMinuteSelect = (m: number) => {
    setSelectedMinute(m);
    applyTime(selectedHour, m, clockAmpm);
  }

  const handleAmpmSelect = (ap: 'AM' | 'PM') => {
    setClockAmpm(ap);
    applyTime(selectedHour, selectedMinute, ap);
  }

  useEffect(() => {
    if (isTimePickerOpen) {
      setClockMode('hour');
      if (formData.time) {
         const [h24, m] = formData.time.split(':').map(Number);
         setClockAmpm(h24 >= 12 ? 'PM' : 'AM');
         setSelectedHour(h24 % 12 || 12);
         setSelectedMinute(m);
      }
    }
  }, [isTimePickerOpen]);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        return value.trim().length >= 2 ? '' : 'Please enter your full name';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? '' : 'Please enter a valid email address';
      case 'phone':
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(value) ? '' : 'Please enter a valid 10-digit mobile number';
      case 'service':
        return value ? '' : 'Please select a service';
      case 'date':
        return value ? '' : 'Please select a valid date';
      case 'time':
        return value ? '' : 'Please select a time';
      default:
        return '';
    }
  };

  const handleBlur = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field as keyof typeof formData]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  }, [formData, validateField]);

  const handleChange = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  }, [touched, validateField]);

  const triggerShake = () => {
    setIsShake(false);
    setTimeout(() => setIsShake(true), 10);
  };

  const attemptAdvancePhase = () => {
    const fieldsToValidate = ['name', 'email', 'phone', 'service'];
    let newErrors: Record<string, string> = {};
    let allValid = true;

    fieldsToValidate.forEach((field) => {
      const error = validateField(field, formData[field as keyof typeof formData]);
      newErrors[field] = error;
      if (error) allValid = false;
    });

    setErrors((prev) => ({ ...prev, ...newErrors }));
    setTouched((prev) => {
      const newTouched = { ...prev };
      fieldsToValidate.forEach((f) => newTouched[f] = true);
      return newTouched;
    });

    if (allValid) {
      setPhase(2);
    } else {
      triggerShake();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phase === 1) {
      attemptAdvancePhase();
      return;
    }

    const fieldsToValidate = ['date', 'time'];
    let newErrors: Record<string, string> = {};
    let allValid = true;

    fieldsToValidate.forEach((field) => {
      const error = validateField(field, formData[field as keyof typeof formData]);
      newErrors[field] = error;
      if (error) allValid = false;
    });

    setErrors((prev) => ({ ...prev, ...newErrors }));
    setTouched((prev) => {
      const newTouched = { ...prev };
      fieldsToValidate.forEach((f) => newTouched[f] = true);
      return newTouched;
    });

    if (!allValid) {
      triggerShake();
      return;
    }

    setIsSubmitting(true);
    setGlobalError('');
    try {
      // Create identical payload required by backend
      await bookAppointment({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        date: formData.date,
        time: formData.time,
        message: formData.message || ''
      });
      setRefNum(`REF: DDS-${Math.floor(100000 + Math.random() * 900000)}`);
      setIsSuccess(true);
    } catch (error) {
      console.error('Form submission error:', error);
      setGlobalError('There was an error booking your appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if phase 1 is completely valid for button state
  const isPhase1Valid = formData.name.length >= 2 && 
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && 
    /^\d{10}$/.test(formData.phone) && 
    formData.service;

  // Calendar Helpers
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 90);

  const currentMonthStart = new Date();
  currentMonthStart.setDate(1);
  const [displayMonth, setDisplayMonth] = useState(new Date(currentMonthStart));

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setDisplayMonth(new Date(displayMonth.getFullYear(), displayMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setDisplayMonth(new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1, 1));
  };

  const renderCalendar = () => {
    const year = displayMonth.getFullYear();
    const month = displayMonth.getMonth();
    const numDays = daysInMonth(year, month);
    const firstDay = firstDayOfMonth(year, month);
    
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Day headers
    dayNames.forEach(day => {
      days.push(<div key={`header-${day}`} className="text-[10px] font-semibold uppercase tracking-wider text-center py-2 text-[var(--text-body)]">{day}</div>);
    });

    // Blanks
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`blank-${i}`} className="p-2" />);
    }

    // Days
    for (let i = 1; i <= numDays; i++) {
      const currentDate = new Date(year, month, i);
      const isPast = currentDate < today;
      const isSunday = currentDate.getDay() === 0;
      const isAfterMax = currentDate > maxDate;
      const isUnavailable = isPast || isSunday || isAfterMax;
      
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const isSelected = formData.date === dateString;

      let cellClass = "w-8 h-8 mx-auto flex items-center justify-center rounded-full text-sm transition-colors ";
      if (isUnavailable) {
        cellClass += "text-[var(--text-body)] opacity-50 cursor-not-allowed line-through";
      } else if (isSelected) {
        cellClass += "bg-[var(--copper)] text-white";
      } else {
        cellClass += "text-[var(--text-heading)] hover:bg-[var(--copper)] hover:bg-opacity-10 cursor-pointer";
      }

      const isToday = currentDate.getTime() === today.getTime();
      if (isToday && !isSelected) {
        cellClass += " border border-[var(--copper)]";
      }

      days.push(
        <div key={dateString} className="p-1">
          <button 
            type="button"
            className={cellClass}
            disabled={isUnavailable}
            onClick={() => {
              handleChange('date', dateString);
              setIsDatePickerOpen(false);
            }}
          >
            {i}
          </button>
        </div>
      );
    }
    return days;
  };

  const timeSlots = [];
  for (let h = 10; h < 20; h++) {
    ['00', '15', '30', '45'].forEach(m => {
      timeSlots.push(`${String(h).padStart(2, '0')}:${m}`);
    });
  }

  const formatTime = (time24: string) => {
    if (!time24) return '';
    const [h, m] = time24.split(':');
    const hour = parseInt(h, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${m} ${ampm}`;
  };

  return (
    <div className="appointment-page min-h-screen bg-[var(--bg-page)] transition-colors duration-300 font-sans relative pt-[72px]">
      <style>{`
        .appointment-page {
          --bg-page: #F5F0EB;
          --bg-card: #FFFFFF;
          --card-border: rgba(31, 28, 27, 0.06);
          --copper: #A34B0E;
          --copper-hover: #8A3F0C;
          --text-heading: #1F1C1B;
          --text-body: #747778;
          --input-bg: #FAFAFA;
          --input-border: #E5E5E5;
          --input-focus: #A34B0E;
          --input-text: #1F1C1B;
          --placeholder: #A9A6A2;
          --success: #22C55E;
          --error: #EF4444;
          --phase-active: #A34B0E;
          --phase-inactive: #D4CFC9;
          --clock-face: #FFFFFF;
          --clock-hand: #A34B0E;
          --clock-number: #1F1C1B;
          --clock-selected: rgba(163, 75, 14, 0.1);
          --card-shadow: 0 8px 32px rgba(31, 28, 27, 0.08), 0 2px 8px rgba(31, 28, 27, 0.04);
        }

        html.dark .appointment-page, .appointment-page.dark {
          --bg-page: #0F0E0D;
          --bg-card: #1A1918;
          --card-border: rgba(255, 255, 255, 0.06);
          --copper: #C09D59;
          --copper-hover: #D4AF37;
          --text-heading: #F5F0EB;
          --text-body: #A1A5AC;
          --input-bg: #252422;
          --input-border: #3A3836;
          --input-focus: #C09D59;
          --input-text: #F5F0EB;
          --placeholder: #6B6864;
          --success: #4ADE80;
          --error: #F87171;
          --phase-active: #C09D59;
          --phase-inactive: #4A4744;
          --clock-face: #1A1918;
          --clock-hand: #C09D59;
          --clock-number: #F5F0EB;
          --clock-selected: rgba(192, 157, 89, 0.15);
          --card-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2);
        }
        
        .shake {
          animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        
        input::placeholder, textarea::placeholder {
          color: var(--placeholder);
        }
      `}</style>

      {/* Global Error Toast */}
      <AnimatePresence>
        {globalError && (
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[var(--error)] text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-4"
          >
            <AlertCircle size={20} />
            <span className="font-medium text-sm">{globalError}</span>
            <button onClick={() => setGlobalError('')} className="ml-4 font-bold text-xs uppercase tracking-wider hover:opacity-80">Dismiss</button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1200px] mx-auto px-6 pt-24 pb-32">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="w-8 h-[1px] bg-[var(--copper)]"></div>
            <span className="text-[12px] font-semibold text-[var(--copper)] uppercase tracking-[0.2em] font-sans">— RESERVATIONS —</span>
            <div className="w-8 h-[1px] bg-[var(--copper)]"></div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-[40px] md:text-[56px] font-serif font-normal text-[var(--text-heading)] leading-[1.1] mb-6"
          >
            Begin Your <span className="italic text-[var(--copper)]">Transformation</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-[16px] md:text-[18px] font-normal text-[var(--text-body)] max-w-[480px] mx-auto font-sans leading-relaxed"
          >
            Secure your private consultation today. Our elite team is ready to provide you with a bespoke dental experience.
          </motion.p>
        </div>

        {/* Form Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className={`max-w-[680px] w-full mx-auto bg-[var(--bg-card)] border border-[var(--card-border)] rounded-[24px] shadow-[var(--card-shadow)] relative ${isShake ? 'shake' : ''}`}
        >
          {/* Success Overlay */}
          <AnimatePresence>
            {isSuccess && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-[var(--bg-card)]/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-12 text-center rounded-[24px]"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.5, duration: 0.6, delay: 0.1 }}
                  className="w-16 h-16 bg-[var(--success)] rounded-full flex items-center justify-center text-white mb-8"
                >
                  <Check size={32} strokeWidth={3} />
                </motion.div>
                <motion.h2 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="text-[32px] font-serif text-[var(--text-heading)] mb-4"
                >
                  Appointment Requested!
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-[16px] text-[var(--text-body)] max-w-[400px] mb-8 leading-relaxed"
                >
                  We've received your request for <span className="font-medium text-[var(--text-heading)]">{formData.service}</span> on <span className="font-medium text-[var(--text-heading)]">{new Date(formData.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span> at <span className="font-medium text-[var(--text-heading)]">{formatTime(formData.time)}</span>. Our team will confirm within 2 hours via <span className="font-medium text-[var(--text-heading)]">{formData.email}</span>.
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 }}
                  className="text-[14px] font-semibold text-[var(--copper)] tracking-[0.1em] mb-12 bg-[var(--copper)]/5 px-6 py-3 rounded-full border border-[var(--copper)]/20"
                >
                  {refNum}
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-col sm:flex-row gap-4 w-full justify-center"
                >
                  <button 
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({ name: '', email: '', phone: '', service: '', date: '', time: '', message: '' });
                      setPhase(1);
                      setTouched({});
                    }}
                    className="px-8 py-4 bg-transparent border border-[var(--input-border)] text-[var(--text-heading)] rounded-xl font-semibold text-[14px] uppercase tracking-[0.08em] hover:border-[var(--copper)] transition-colors"
                  >
                    Book Another →
                  </button>
                  <Link 
                    to="/"
                    className="px-8 py-4 bg-[var(--copper)] hover:bg-[var(--copper-hover)] text-white rounded-xl font-semibold text-[14px] uppercase tracking-[0.08em] transition-colors shadow-lg shadow-[var(--copper)]/20"
                  >
                    Back to Home →
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress Indicator */}
          <div className="px-6 md:px-12 pt-8">
            <div className="relative flex items-center justify-between mb-8">
              <div className="absolute left-0 top-[20px] w-full h-[2px] bg-[var(--phase-inactive)] -z-10 rounded-full" />
              <div 
                className="absolute left-0 top-[20px] h-[2px] bg-[var(--phase-active)] -z-10 transition-all duration-400 ease-out rounded-full" 
                style={{ width: phase === 1 ? '0%' : '100%' }}
              />

              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-[15px] transition-colors duration-300 ${phase === 1 ? 'bg-[var(--copper)] text-white ring-[3px] ring-[var(--copper)]/20' : 'bg-[var(--success)] text-white'}`}>
                  {phase === 2 ? <Check size={20} className="w-5 h-5" /> : '1'}
                </div>
                <span className="mt-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-heading)]">Your Details</span>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-[15px] transition-colors duration-300 ${phase === 2 ? 'bg-[var(--copper)] text-white ring-[3px] ring-[var(--copper)]/20' : 'bg-[var(--phase-inactive)] text-[var(--text-heading)]'}`}>
                  2
                </div>
                <span className="mt-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-heading)]">Schedule</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <form onSubmit={handleSubmit} className="px-6 md:px-12 pb-10">
              <AnimatePresence mode="wait">
                {/* PHASE 1: YOUR DETAILS */}
                {phase === 1 && (
                  <motion.div
                    key="phase1"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -40, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-8">
                      <h2 className="text-[32px] font-serif text-[var(--text-heading)] leading-[1.2] tracking-[-0.01em]">Your Information</h2>
                      <p className="text-[15px] text-[var(--text-body)] mt-2">Tell us a bit about yourself so we can prepare for your visit.</p>
                    </div>

                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <InputField label="FULL NAME" name="name" type="text" placeholder="John Doe" icon={User} formData={formData} handleChange={handleChange} handleBlur={handleBlur} errors={errors} touched={touched} />
                        <InputField label="EMAIL ADDRESS" name="email" type="email" placeholder="john@example.com" icon={Mail} formData={formData} handleChange={handleChange} handleBlur={handleBlur} errors={errors} touched={touched} />
                      </div>

                      <div className="flex flex-col md:flex-row gap-6">
                        <InputField 
                          label="PHONE NUMBER" 
                          name="phone" 
                          type="tel" 
                          placeholder="98765 43210" 
                          icon={Phone} 
                          addon="🇮🇳 +91"
                          formData={formData} 
                          handleChange={handleChange} 
                          handleBlur={handleBlur} 
                          errors={errors} 
                          touched={touched}
                        />

                        {/* Custom Service Dropdown */}
                        <div className="space-y-2 flex-1 w-full relative" ref={serviceRef}>
                          <label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-heading)] flex items-center gap-2">
                            <Sparkles size={14} className="text-[var(--copper)]" /> SERVICE
                          </label>
                          <div 
                            onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                            className={`w-full flex items-center justify-between bg-[var(--input-bg)] ${formData.service ? 'text-[var(--input-text)]' : 'text-[var(--placeholder)]'} border ${
                              errors.service && touched.service ? 'border-[var(--error)]' : 'border-[var(--input-border)]'
                            } rounded-xl px-4 py-4 text-[15px] cursor-pointer transition-colors focus:border-[var(--copper)]`}
                          >
                            <span>{formData.service ? servicesList.find(s => s.id === formData.service)?.label : 'Select a service'}</span>
                            <div className="flex items-center gap-2">
                              {touched.service && !errors.service && formData.service && <Check size={18} className="text-[var(--success)]" />}
                              {touched.service && errors.service && <AlertCircle size={18} className="text-[var(--error)]" />}
                              <ChevronDown size={18} className={`text-[var(--placeholder)] transition-transform duration-300 ${isServiceDropdownOpen ? 'rotate-180' : ''}`} />
                            </div>
                          </div>
                          
                          <AnimatePresence>
                            {isServiceDropdownOpen && (
                              <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute w-full mt-2 bg-[var(--bg-card)] border border-[var(--card-border)] rounded-xl shadow-[var(--card-shadow)] z-20 py-2 max-h-[300px] overflow-y-auto"
                              >
                                {servicesList.map(s => (
                                  <div 
                                    key={s.id}
                                    onClick={() => {
                                      handleChange('service', s.id);
                                      setIsServiceDropdownOpen(false);
                                    }}
                                    className={`px-4 py-3 flex items-center gap-3 cursor-pointer transition-colors ${formData.service === s.id ? 'bg-[var(--copper)]/5 text-[var(--copper)] border-l-2 border-[var(--copper)]' : 'text-[var(--text-heading)] hover:bg-[var(--copper)]/5'}`}
                                  >
                                    <span className="text-xl">{s.icon}</span>
                                    <span className="font-medium">{s.label}</span>
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                          {errors.service && touched.service && (
                            <div className="text-[13px] font-medium text-[var(--error)]">{errors.service}</div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-heading)] flex items-center gap-2">
                          <MessageSquare size={14} className="text-[var(--copper)]" /> MESSAGE (OPTIONAL)
                        </label>
                        <div className="relative">
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={(e) => {
                              if (e.target.value.length <= 500) handleChange('message', e.target.value);
                            }}
                            placeholder="Tell us about your dental concerns, previous treatments, or what you hope to achieve..."
                            className="w-full bg-[var(--input-bg)] text-[var(--input-text)] border border-[var(--input-border)] rounded-xl px-4 py-4 text-[15px] transition-colors focus:border-[var(--copper)] focus:ring-4 focus:ring-[var(--copper)]/10 outline-none resize-y min-h-[100px]"
                          />
                          <div className="absolute bottom-4 right-4 text-[12px] text-[var(--text-body)] font-medium">
                            {formData.message.length} / 500
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={attemptAdvancePhase}
                        className={`w-full mt-6 bg-[var(--copper)] text-white py-[18px] rounded-xl font-semibold text-[14px] uppercase tracking-[0.08em] flex items-center justify-center gap-2 transition-all duration-300 group ${!isPhase1Valid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[var(--copper-hover)] hover:-translate-y-[2px] shadow-lg shadow-[var(--copper)]/20'}`}
                      >
                        CONTINUE <ArrowRight size={18} className={`transition-transform duration-300 ${isPhase1Valid ? 'group-hover:translate-x-1' : ''}`} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* PHASE 2: SCHEDULE & CONFIRM */}
                {phase === 2 && (
                  <motion.div
                    key="phase2"
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 30, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <button 
                      type="button"
                      onClick={() => setPhase(1)}
                      className="text-[13px] font-medium text-[var(--copper)] flex items-center gap-1 hover:underline mb-6"
                    >
                      <ArrowLeft size={14} /> Back to Details
                    </button>
                    
                    <div className="mb-8">
                      <h2 className="text-[32px] font-serif text-[var(--text-heading)] leading-[1.2] tracking-[-0.01em]">Schedule Your Visit</h2>
                      <p className="text-[15px] text-[var(--text-body)] mt-2">Choose your preferred date and time. We'll confirm within 2 hours.</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 mb-8">
                      {/* Date Picker */}
                      <div className="space-y-2 flex-1 relative" ref={dateRef}>
                        <label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-heading)] flex items-center gap-2">
                          <Calendar size={14} className="text-[var(--copper)]" /> PREFERRED DATE
                        </label>
                        <div 
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                          className={`w-full flex items-center justify-between bg-[var(--input-bg)] ${formData.date ? 'text-[var(--input-text)]' : 'text-[var(--placeholder)]'} border ${
                            errors.date && touched.date ? 'border-[var(--error)]' : 'border-[var(--input-border)]'
                          } rounded-xl px-4 py-4 text-[15px] cursor-pointer transition-colors focus:border-[var(--copper)]`}
                        >
                          <span>{formData.date ? new Date(formData.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Select a date'}</span>
                          <div className="flex items-center gap-2">
                             {touched.date && !errors.date && formData.date && <Check size={18} className="text-[var(--success)]" />}
                             {touched.date && errors.date && <AlertCircle size={18} className="text-[var(--error)]" />}
                          </div>
                        </div>

                        <AnimatePresence>
                          {isDatePickerOpen && (
                            <motion.div 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute w-full mt-2 bg-[var(--bg-card)] border border-[var(--card-border)] rounded-xl shadow-[var(--card-shadow)] z-30 p-4"
                            >
                              <div className="flex items-center justify-between mb-4">
                                <button type="button" onClick={handlePrevMonth} className="p-1 hover:bg-[var(--input-bg)] rounded-md text-[var(--text-heading)]">
                                  <ArrowLeft size={16} />
                                </button>
                                <div className="font-semibold text-[14px] text-[var(--text-heading)]">
                                  {displayMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
                                </div>
                                <button type="button" onClick={handleNextMonth} className="p-1 hover:bg-[var(--input-bg)] rounded-md text-[var(--text-heading)]">
                                  <ArrowRight size={16} />
                                </button>
                              </div>
                              <div className="grid grid-cols-7 gap-1">
                                {renderCalendar()}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        {errors.date && touched.date && (
                          <div className="text-[13px] font-medium text-[var(--error)]">{errors.date}</div>
                        )}
                      </div>

                      {/* Time Picker */}
                      <div className="space-y-2 flex-1 relative" ref={timeRef}>
                        <label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-heading)] flex items-center gap-2">
                          <Clock size={14} className="text-[var(--copper)]" /> PREFERRED TIME
                        </label>
                        <div 
                          onClick={() => setIsTimePickerOpen(!isTimePickerOpen)}
                          className={`w-full flex items-center justify-between bg-[var(--input-bg)] ${formData.time ? 'text-[var(--input-text)]' : 'text-[var(--placeholder)]'} border ${
                            errors.time && touched.time ? 'border-[var(--error)]' : 'border-[var(--input-border)]'
                          } rounded-xl px-4 py-4 text-[15px] cursor-pointer transition-colors focus:border-[var(--copper)]`}
                        >
                          <span>{formData.time ? formatTime(formData.time) : 'Select a time'}</span>
                          <div className="flex items-center gap-2">
                             {touched.time && !errors.time && formData.time && <Check size={18} className="text-[var(--success)]" />}
                             {touched.time && errors.time && <AlertCircle size={18} className="text-[var(--error)]" />}
                          </div>
                        </div>

                        <AnimatePresence>
                          {isTimePickerOpen && (
                            <motion.div 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute w-full mt-2 bg-[var(--bg-card)] border border-[var(--card-border)] rounded-xl shadow-[var(--card-shadow)] z-50 p-6 flex flex-col items-center"
                            >
                              <div className="flex gap-4 mb-4 text-[28px] font-serif text-[var(--text-heading)]">
                                <button 
                                  type="button"
                                  onClick={() => setClockMode('hour')} 
                                  className={clockMode === 'hour' ? 'text-[var(--copper)] font-medium' : 'opacity-50 hover:opacity-80'}
                                >
                                  {String(selectedHour).padStart(2, '0')}
                                </button>
                                <span className="opacity-50">:</span>
                                <button 
                                  type="button"
                                  onClick={() => setClockMode('minute')}
                                  className={clockMode === 'minute' ? 'text-[var(--copper)] font-medium' : 'opacity-50 hover:opacity-80'}
                                >
                                  {String(selectedMinute).padStart(2, '0')}
                                </button>
                              </div>

                              <div className="relative w-[240px] h-[240px] bg-[var(--clock-face)] border border-[var(--card-border)] rounded-full shadow-inner mx-auto select-none overflow-hidden">
                                <div className="absolute top-1/2 left-1/2 w-2 h-2 -ml-1 -mt-1 bg-[var(--copper)] rounded-full z-20" />
                                
                                <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                                  {clockMode === 'hour' ? (
                                    <line 
                                      x1="120" y1="120" 
                                      x2={120 + 70 * Math.cos(((selectedHour % 12) * 30 - 90) * Math.PI / 180)} 
                                      y2={120 + 70 * Math.sin(((selectedHour % 12) * 30 - 90) * Math.PI / 180)} 
                                      stroke="var(--copper)" strokeWidth="2" strokeLinecap="round" 
                                    />
                                  ) : (
                                    <line 
                                      x1="120" y1="120" 
                                      x2={120 + 90 * Math.cos((selectedMinute * 6 - 90) * Math.PI / 180)} 
                                      y2={120 + 90 * Math.sin((selectedMinute * 6 - 90) * Math.PI / 180)} 
                                      stroke="var(--copper)" strokeWidth="2" strokeLinecap="round" 
                                    />
                                  )}

                                  <circle 
                                    cx={120 + (clockMode === 'hour' ? 70 : 90) * Math.cos(((clockMode === 'hour' ? (selectedHour % 12) * 30 : selectedMinute * 6) - 90) * Math.PI / 180)} 
                                    cy={120 + (clockMode === 'hour' ? 70 : 90) * Math.sin(((clockMode === 'hour' ? (selectedHour % 12) * 30 : selectedMinute * 6) - 90) * Math.PI / 180)} 
                                    r="14" fill="var(--copper)" fillOpacity="0.2" 
                                  />
                                </svg>

                                {(clockMode === 'hour' ? [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] : [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]).map((num) => {
                                  const angle = ((clockMode === 'hour' ? num * 30 : num * 6) - 90) * Math.PI / 180;
                                  const radius = clockMode === 'hour' ? 85 : 95;
                                  const x = 120 + radius * Math.cos(angle);
                                  const y = 120 + radius * Math.sin(angle);
                                  const isSelected = clockMode === 'hour' ? selectedHour === num : selectedMinute === num;

                                  return (
                                    <div 
                                      key={num}
                                      className={`absolute w-8 h-8 -ml-4 -mt-4 flex items-center justify-center rounded-full text-[13px] font-medium cursor-pointer z-20 transition-colors ${isSelected ? 'bg-[var(--copper)] text-white' : 'text-[var(--text-heading)] hover:bg-[var(--copper)] hover:bg-opacity-10'}`}
                                      style={{ left: x, top: y }}
                                      onClick={() => {
                                        if (clockMode === 'hour') {
                                          handleHourSelect(num);
                                        } else {
                                          handleMinuteSelect(num);
                                        }
                                      }}
                                    >
                                      {clockMode === 'minute' ? String(num).padStart(2, '0') : num}
                                    </div>
                                  );
                                })}
                              </div>

                              <div className="flex bg-[var(--input-bg)] border border-[var(--input-border)] rounded-lg mt-6 p-1 relative w-[180px]">
                                <button 
                                  type="button"
                                  onClick={() => handleAmpmSelect('AM')}
                                  className={`flex-1 py-1.5 text-[13px] font-semibold rounded-md z-10 transition-colors ${clockAmpm === 'AM' ? 'text-white' : 'text-[var(--text-body)] hover:text-[var(--text-heading)]'}`}
                                >
                                  AM
                                </button>
                                <button 
                                  type="button"
                                  onClick={() => handleAmpmSelect('PM')}
                                  className={`flex-1 py-1.5 text-[13px] font-semibold rounded-md z-10 transition-colors ${clockAmpm === 'PM' ? 'text-white' : 'text-[var(--text-body)] hover:text-[var(--text-heading)]'}`}
                                >
                                  PM
                                </button>
                                <div 
                                  className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[var(--copper)] rounded-md transition-all duration-300 ${clockAmpm === 'AM' ? 'left-1' : 'left-[calc(50%+2px)]'}`}
                                />
                              </div>
                              
                              {clockMode === 'minute' && (
                                <button type="button" onClick={() => setIsTimePickerOpen(false)} className="mt-6 w-[180px] py-2 bg-[var(--copper)]/10 text-[var(--copper)] rounded-lg text-[13px] font-semibold tracking-[0.1em] uppercase hover:bg-[var(--copper)]/20 transition-colors">
                                  Done
                                </button>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                        {errors.time && touched.time && (
                          <div className="text-[13px] font-medium text-[var(--error)]">{errors.time}</div>
                        )}
                      </div>
                    </div>

                    {/* Appointment Summary */}
                    {formData.date && formData.time && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[var(--copper)]/5 border border-[var(--copper)]/20 rounded-2xl p-6 mb-8"
                      >
                        <h4 className="text-[14px] font-semibold uppercase tracking-[0.06em] text-[var(--copper)] mb-4">Appointment Summary</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[15px] font-medium text-[var(--text-heading)]">{formData.name}</span>
                            <button type="button" onClick={() => setPhase(1)} className="text-[12px] font-medium text-[var(--copper)] hover:underline">Edit</button>
                          </div>
                          <div className="flex items-center gap-2 text-[15px] text-[var(--text-body)]">
                            <Sparkles size={14} /> <span>{servicesList.find(s=>s.id===formData.service)?.label}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 pt-2">
                            <div className="flex items-center gap-2 text-[15px] text-[var(--text-body)]">
                              <Calendar size={14} className="text-[var(--copper)]" /> {new Date(formData.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </div>
                            <div className="flex items-center gap-2 text-[15px] font-medium text-[var(--copper)]">
                              <Clock size={14} /> {formatTime(formData.time)}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-[14px] text-[var(--text-body)] border-t border-[var(--card-border)] pt-3 mt-3">
                            <MapPin size={14} /> DE Dental Square, Ravindrapuri, Varanasi
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-[var(--copper)] text-white py-[18px] rounded-xl font-semibold text-[14px] uppercase tracking-[0.08em] flex items-center justify-center gap-2 transition-all duration-300 group ${isSubmitting || !formData.date || !formData.time ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[var(--copper-hover)] hover:-translate-y-[2px] shadow-lg shadow-[var(--copper)]/20'}`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" /> SENDING...
                        </>
                      ) : (
                        <>
                          CONFIRM APPOINTMENT <ArrowRight size={18} className={`transition-transform duration-300 ${formData.date && formData.time ? 'group-hover:translate-x-1' : ''}`} />
                        </>
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </motion.div>

        {/* Contact Cards Section */}
        <div className="mt-20 max-w-[680px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="group bg-[var(--bg-card)] border border-[var(--card-border)] rounded-[16px] p-8 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-full border-[1.5px] border-[var(--copper)]/20 flex items-center justify-center mb-6 group-hover:border-[var(--copper)] transition-colors">
              <Phone size={20} className="text-[var(--copper)]" />
            </div>
            <div className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--copper)] mb-2">Direct Line</div>
            <div className="text-[20px] font-medium text-[var(--text-heading)] mb-2">+91 (884) 006-6719</div>
            <div className="text-[14px] text-[var(--text-body)] mb-6">Mon–Sat: 10 AM – 8 PM</div>
            
            <div className="flex items-center justify-between border-t border-[var(--card-border)] pt-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse"></span>
                <span className="text-[12px] font-medium text-[var(--text-body)]">We're Open Now</span>
              </div>
              <a href="tel:+918840066719" className="text-[13px] font-semibold text-[var(--copper)] flex items-center gap-1 group-hover:underline">
                CALL NOW <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="group bg-[var(--bg-card)] border border-[var(--card-border)] rounded-[16px] p-8 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-full border-[1.5px] border-[var(--copper)]/20 flex items-center justify-center mb-6 group-hover:border-[var(--copper)] transition-colors">
              <Mail size={20} className="text-[var(--copper)]" />
            </div>
            <div className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--copper)] mb-2">Email Concierge</div>
            <div className="text-[20px] font-medium text-[var(--text-heading)] mb-2 truncate">hello@dedentalsquare.com</div>
            <div className="text-[14px] text-[var(--text-body)] mb-6">Response within 12 hours</div>
            
            <div className="flex items-center justify-end border-t border-[var(--card-border)] pt-6">
              <a href="mailto:hello@dedentalsquare.com" className="text-[13px] font-semibold text-[var(--copper)] flex items-center gap-1 group-hover:underline">
                SEND EMAIL <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
