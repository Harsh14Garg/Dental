import { Sparkles, HeartPulse, ShieldCheck, Microscope, Smile, Activity } from 'lucide-react';
import orthodonticsImage from '../assets/orthodontics.jpg';
import oralSurgeryImage from '../assets/oral-surgery.webp';
import pediatricCareImage from '../assets/pediatric-care.jpg';
import emergencyCareImage from '../assets/emergency-care.jpg';

export const services = [
  { 
    id: "general-dentistry",
    title: "General Dentistry", 
    description: "Routine checkups, cleanings, and preventative care to keep your smile healthy.",
    longDescription: "Our general dentistry services focus on maintaining your oral health through regular checkups, professional cleanings, and preventative care. We believe in early intervention to prevent more complex issues down the line. Our team ensures a comfortable and thorough examination process.",
    icon: HeartPulse, 
    color: "from-rose-500/10 to-rose-600/5",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
    benefits: ["Regular checkups", "Professional cleaning", "Early cavity detection", "Oral cancer screening"],
    process: ["Initial Consultation", "Comprehensive Exam", "Professional Cleaning", "Treatment Planning"],
    faq: [
      { q: "How often should I visit?", a: "We recommend a checkup every 6 months." },
      { q: "Is cleaning painful?", a: "No, it's a routine and comfortable procedure." }
    ]
  },
  { 
    id: "cosmetic-dentistry",
    title: "Cosmetic Dentistry", 
    description: "Teeth whitening, veneers, and smile makeovers to boost your confidence.",
    longDescription: "Enhance the natural beauty of your smile with our cosmetic dentistry solutions. From professional teeth whitening to custom-crafted veneers, we help you achieve the smile you've always wanted. We focus on natural-looking results.",
    icon: Sparkles, 
    color: "from-amber-500/10 to-amber-600/5",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=800",
    benefits: ["Teeth whitening", "Porcelain veneers", "Smile makeovers", "Bonding"],
    process: ["Consultation & Design", "Trial Smile", "Preparation", "Final Placement"],
    faq: [
      { q: "How long do veneers last?", a: "With proper care, they can last 10-15 years." },
      { q: "Is whitening safe?", a: "Yes, our professional whitening is safe and effective." }
    ]
  },
  { 
    id: "orthodontics",
    title: "Orthodontics", 
    description: "Braces and clear aligners to straighten your teeth and improve your bite.",
    longDescription: "Achieve a straighter, healthier smile with our orthodontic treatments. We offer both traditional braces and modern clear aligner solutions tailored to your specific needs, focusing on both aesthetics and functionality.",
    icon: Activity, 
    color: "from-blue-500/10 to-blue-600/5",
    image: orthodonticsImage,
    benefits: ["Traditional braces", "Clear aligners", "Bite correction", "Improved oral function"],
    process: ["Digital Scan", "Treatment Plan", "Fitting", "Regular Adjustments"],
    faq: [
      { q: "How long does treatment take?", a: "It varies, typically 12-24 months." },
      { q: "Are aligners better?", a: "They offer more convenience and aesthetics." }
    ]
  },
  { 
    id: "oral-surgery",
    title: "Oral Surgery", 
    description: "Expert surgical procedures including wisdom teeth removal and implants.",
    longDescription: "Our skilled oral surgeons provide expert care for complex dental procedures, including wisdom teeth extractions, dental implants, and corrective jaw surgeries, all in a comfortable environment with advanced sedation options.",
    icon: Microscope, 
    color: "from-emerald-500/10 to-emerald-600/5",
    image: oralSurgeryImage,
    benefits: ["Wisdom teeth removal", "Dental implants", "Corrective jaw surgery", "Bone grafting"],
    process: ["Pre-surgical Assessment", "Sedation Planning", "Procedure", "Post-op Care"],
    faq: [
      { q: "Will I be in pain?", a: "We use effective sedation to ensure comfort." },
      { q: "How long is recovery?", a: "Depends on the procedure, usually a few days." }
    ]
  },
  { 
    id: "pediatric-care",
    title: "Pediatric Care", 
    description: "Gentle dental care specifically designed for our youngest patients.",
    longDescription: "We provide a welcoming and gentle environment for children's dental care. Our focus is on making every visit positive, educational, and comfortable for your little ones, setting them up for a lifetime of good oral health.",
    icon: Smile, 
    color: "from-purple-500/10 to-purple-600/5",
    image: pediatricCareImage,
    benefits: ["Child-friendly environment", "Preventative care", "Education", "Early intervention"],
    process: ["Friendly Introduction", "Gentle Exam", "Cleaning & Fluoride", "Education"],
    faq: [
      { q: "When should they start?", a: "By age 1 or when the first tooth appears." },
      { q: "How to make it fun?", a: "We use games and positive reinforcement." }
    ]
  },
  { 
    id: "emergency-care",
    title: "Emergency Care", 
    description: "Rapid response for dental emergencies when you need us most.",
    longDescription: "Dental emergencies can happen unexpectedly. We offer rapid response and expert care to alleviate pain and address urgent dental issues promptly, ensuring you get the care you need when it matters most.",
    icon: ShieldCheck, 
    color: "from-red-500/10 to-red-600/5",
    image: emergencyCareImage,
    benefits: ["Same-day appointments", "Pain relief", "Urgent care", "Expert diagnosis"],
    process: ["Immediate Triage", "Urgent Assessment", "Pain Management", "Definitive Treatment"],
    faq: [
      { q: "What is an emergency?", a: "Severe pain, swelling, or trauma." },
      { q: "Can I walk in?", a: "Please call ahead so we can prepare." }
    ]
  }
];
