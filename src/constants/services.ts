import { Sparkles, HeartPulse, ShieldCheck, Microscope, Smile, Activity } from 'lucide-react';

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
    process: [
      { 
        title: "Initial Consultation", 
        description: "We begin by listening to your needs and utilizing state-of-the-art tools to thoroughly evaluate your oral health in a comfortable environment."
      },
      { 
        title: "Comprehensive Exam", 
        description: "Dr. Neeraj Agrawal and our expert team perform an intricate examination, ensuring no detail is overlooked to provide the highest standard of preventative care."
      },
      { 
        title: "Professional Cleaning", 
        description: "Experience our meticulous and gentle cleaning procedures designed to leave your smile radiant while promoting long-term dental wellness."
      },
      { 
        title: "Treatment Planning", 
        description: "We craft a personalized, proactive care plan tailored specifically for you, delivering world-class dental excellence to safeguard your future smiles."
      }
    ],
    faq: [
      { q: "How often should I visit?", a: "We recommend an expert evaluation every 6 months to ensure your smile maintains its pristine condition with our preventative excellence." },
      { q: "Is cleaning painful?", a: "Not at all. Our premium cleanings use the latest gentle techniques to guarantee a soothing, pain-free experience with sparkling results." },
      { q: "Do you offer digital X-rays?", a: "Yes, we utilize advanced digital radiography, ensuring maximum precision, instant results, and minimal radiation for your absolute safety." },
      { q: "Why choose De Dental Square for checkups?", a: "Our unparalleled attention to detail, led by Dr. Neeraj Agrawal, ensures your preventative care is nothing short of exceptional and perfectly customized." },
      { q: "What if I haven't been to the dentist in years?", a: "You will be welcomed with absolute compassion. We specialize in comfortable, judgment-free care to help you reclaim your oral health confidently." },
      { q: "How long does a routine visit take?", a: "A thorough, world-class exam and cleaning typically takes 45-60 minutes, respecting your time while delivering flawless care." },
      { q: "Do you screen for oral cancer?", a: "Absolutely. Every comprehensive exam includes a meticulous screening utilizing advanced techniques for your total peace of mind." }
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
    process: [
      { 
        title: "Consultation & Design", 
        description: "We begin with an in-depth conversation about your aesthetic goals, paired with advanced digital imaging to visualize your perfect smile."
      },
      { 
        title: "Trial Smile", 
        description: "Experience a temporary preview of your new smile, expertly crafted to ensure absolute satisfaction before permanent changes are made."
      },
      { 
        title: "Preparation", 
        description: "Our team uses minimally invasive, precision techniques to prepare your teeth ensuring the utmost comfort and perfect bonding."
      },
      { 
        title: "Final Placement", 
        description: "Your customized, premium veneers or enhancements are masterfully bonded, revealing a flawless, natural, and breathtaking smile."
      }
    ],
    faq: [
      { q: "How long do veneers last?", a: "With our premium materials and expert application, your stunning new smile can last 10-15 years or longer with proper care." },
      { q: "Is whitening safe?", a: "Yes. We offer professional, high-grade whitening that is clinically proven to be safe, protecting your enamel while delivering transformative brightness." },
      { q: "Will my results look natural?", a: "Absolutely. Our hallmark is crafting bespoke smiles that perfectly complement your facial structure for a naturally beautiful, seamless result." },
      { q: "Can I combine multiple cosmetic treatments?", a: "Yes! We specialize in comprehensive smile makeovers, meticulously combining treatments for the ultimate transformation you deserve." },
      { q: "Do procedures cause discomfort?", a: "Your comfort is our priority. We employ state-of-the-art pain management to ensure your aesthetic journey is as relaxing as it is rewarding." },
      { q: "How do you customize my perfect smile?", a: "We analyze your facial symmetry, skin tone, and preferences to architect a smile that is uniquely and perfectly yours." },
      { q: "Are financing options available for cosmetic work?", a: "Yes, we provide flexible payment solutions to make our world-class aesthetic treatments accessible to everyone desiring a confident smile." }
    ]
  },
  { 
    id: "orthodontics",
    title: "Orthodontics", 
    description: "Braces and clear aligners to straighten your teeth and improve your bite.",
    longDescription: "Achieve a straighter, healthier smile with our orthodontic treatments. We offer both traditional braces and modern clear aligner solutions tailored to your specific needs, focusing on both aesthetics and functionality.",
    icon: Activity, 
    color: "from-blue-500/10 to-blue-600/5",
    image: "/orthodontics.jpg",
    benefits: ["Traditional braces", "Clear aligners", "Bite correction", "Improved oral function"],
    process: [
      { 
        title: "Digital Scan", 
        description: "We capture highly accurate 3D impressions of your mouth instantly and comfortably, completely eliminating messy traditional molds."
      },
      { 
        title: "Treatment Plan", 
        description: "Dr. Agrawal meticulously designs a custom orthodontic roadmap, predicting every tooth movement for optimal aesthetic and functional results."
      },
      { 
        title: "Fitting", 
        description: "Whether premium aligners or modern braces, your appliances are fitted with absolute precision to initiate your seamless transformation."
      },
      { 
        title: "Regular Adjustments", 
        description: "We monitor your progress through focused milestone visits, ensuring your treatment stays on track for a flawlessly straight smile."
      }
    ],
    faq: [
      { q: "How long does treatment take?", a: "Every smile is unique, but our advanced planning typically delivers outstanding results in 12-24 months." },
      { q: "Are aligners better than braces?", a: "Aligners offer unparalleled discretion and convenience, though we expertly recommend the absolute best solution for your unique clinical needs." },
      { q: "Are the treatments painful?", a: "You may feel mild pressure during adjustments, but our modern techniques ensure a highly comfortable process from start to finish." },
      { q: "Can adults get orthodontic treatment?", a: "Absolutely. We specialize in adult orthodontics, crafting elegant, discreet solutions so you can achieve the perfect smile at any age." },
      { q: "How often are the milestone visits?", a: "Depending on your specific premium treatment plan, we carefully schedule visits every 4-8 weeks to ensure flawless progression." },
      { q: "Will I need to wear a retainer?", a: "Yes, we provide custom-fitted, premium retainers to protect your beautifully aligned smile for a lifetime." },
      { q: "Do you offer clear or ceramic braces?", a: "Yes, we offer aesthetically pleasing ceramic brackets that blend beautifully with your teeth for a discreet, elegant treatment." }
    ]
  },
  { 
    id: "oral-surgery",
    title: "Oral Surgery", 
    description: "Expert surgical procedures including wisdom teeth removal and implants.",
    longDescription: "Our skilled oral surgeons provide expert care for complex dental procedures, including wisdom teeth extractions, dental implants, and corrective jaw surgeries, all in a comfortable environment with advanced sedation options.",
    icon: Microscope, 
    color: "from-emerald-500/10 to-emerald-600/5",
    image: "/oral-surgery.webp",
    benefits: ["Wisdom teeth removal", "Dental implants", "Corrective jaw surgery", "Bone grafting"],
    process: [
      { 
        title: "Pre-surgical Assessment", 
        description: "We perform a robust diagnostic evaluation using 3D imaging, ensuring your surgical procedure is planned with uncompromising precision."
      },
      { 
        title: "Sedation Planning", 
        description: "Your comfort is paramount. We customize a safe, effective sedation plan to guarantee a completely stress-free, painless experience."
      },
      { 
        title: "Procedure", 
        description: "Our expert surgeons execute the procedure with masterful skill and the finest technology, minimizing invasiveness and promoting swift healing."
      },
      { 
        title: "Post-op Care", 
        description: "We provide dedicated, compassionate follow-up care and detailed guidance, ensuring your recovery is smooth, comfortable, and flawlessly successful."
      }
    ],
    faq: [
      { q: "Will I be in pain?", a: "Our sophisticated sedation and pain management protocols ensure your surgical experience is completely comfortable and virtually pain-free." },
      { q: "How long is recovery?", a: "Thanks to our minimally invasive surgical techniques, most patients experience an accelerated, comfortable recovery within just a few days." },
      { q: "Are dental implants permanent?", a: "Yes. We use only top-tier, premium titanium implants designed to provide a secure, lifelong foundation for your new teeth." },
      { q: "Is it safe to be sedated?", a: "Absolutely. Your safety is our highest priority, with expert monitoring and tailored sedation protocols ensuring complete safety throughout." },
      { q: "What should I expect during wisdom teeth removal?", a: "Expect a smooth, expertly handled procedure followed by comprehensive instructions to ensure a fast, uncomplicated recovery." },
      { q: "Do you perform bone grafting?", a: "Yes, our experts perform advanced bone grafting procedures with precision to create the ideal foundation for lasting dental implants." },
      { q: "Will someone check on me after the surgery?", a: "Yes. Our team is committed to post-operative excellence, actively monitoring your recovery and remaining available for any concerns." }
    ]
  },
  { 
    id: "pediatric-care",
    title: "Pediatric Care", 
    description: "Gentle dental care specifically designed for our youngest patients.",
    longDescription: "We provide a welcoming and gentle environment for children's dental care. Our focus is on making every visit positive, educational, and comfortable for your little ones, setting them up for a lifetime of good oral health.",
    icon: Smile, 
    color: "from-purple-500/10 to-purple-600/5",
    image: "/pediatric-care.jpg",
    benefits: ["Child-friendly environment", "Preventative care", "Education", "Early intervention"],
    process: [
      { 
        title: "Friendly Introduction", 
        description: "We welcome your child into a warm, joyful environment, taking time to build trust and ensure they feel completely safe."
      },
      { 
        title: "Gentle Exam", 
        description: "Our pediatric experts perform a tender, comprehensive examination, making the process fun while identifying needs with the highest precision."
      },
      { 
        title: "Cleaning & Fluoride", 
        description: "We provide gentle preventative cleanings and premium fluoride treatments to strengthen and protect your child’s developing, beautiful smile."
      },
      { 
        title: "Education", 
        description: "We empower both parent and child with engaging, essential hygiene tips, building exceptional oral care habits that last a lifetime."
      }
    ],
    faq: [
      { q: "When should they start?", a: "We recommend scheduling their first joyful visit by age 1 or when the first tooth magnificently appears, ensuring a perfect start." },
      { q: "How do you make visits fun?", a: "Our caring team utilizes positive reinforcement, engaging explanations, and a kid-friendly atmosphere to make every visit a delightful adventure." },
      { q: "Can parents stay in the room?", a: "Absolutely. We encourage parents to be present, fostering absolute comfort and transparency during our world-class pediatric care." },
      { q: "Are dental X-rays safe for children?", a: "Yes. We use ultra-low-radiation digital imaging meticulously calibrated for children, ensuring maximum safety and diagnostic excellence." },
      { q: "What if my child is extremely anxious?", a: "Our compassionate experts specialize in alleviating pediatric anxiety through patience, gentle techniques, and comforting, positive engagement." },
      { q: "Do you offer sealants?", a: "Yes, we provide premium dental sealants which act as completely painless, outstanding protective shields against childhood cavities." },
      { q: "How do you handle pediatric dental emergencies?", a: "We provide immediate, calm, and expert care for any unexpected dental injury or pain, ensuring your child's immediate comfort." }
    ]
  },
  { 
    id: "emergency-care",
    title: "Emergency Care", 
    description: "Rapid response for dental emergencies when you need us most.",
    longDescription: "Dental emergencies can happen unexpectedly. We offer rapid response and expert care to alleviate pain and address urgent dental issues promptly, ensuring you get the care you need when it matters most.",
    icon: ShieldCheck, 
    color: "from-red-500/10 to-red-600/5",
    image: "/emergency-care.jpg",
    benefits: ["Same-day appointments", "Pain relief", "Urgent care", "Expert diagnosis"],
    process: [
      { 
        title: "Immediate Triage", 
        description: "Your urgent call is prioritized immediately, and our team swiftly prepares to deliver exceptional, targeted care the moment you arrive."
      },
      { 
        title: "Urgent Assessment", 
        description: "We rapidly and accurately diagnose the source of your pain using advanced diagnostics, ensuring no time is wasted in your treatment."
      },
      { 
        title: "Pain Management", 
        description: "We utilize highly effective, compassionate pain relief techniques to immediately restore your comfort and peace of mind."
      },
      { 
        title: "Definitive Treatment", 
        description: "Our expert clinicians execute the necessary procedure with absolute mastery, flawlessly resolving the emergency to protect your oral health."
      }
    ],
    faq: [
      { q: "What is an emergency?", a: "Severe, unmanageable pain, significant swelling, or structural trauma requires our immediate, exceptional intervention." },
      { q: "Can I walk in?", a: "Please call ahead so we can prioritize your arrival and instantly prepare our cutting-edge suite for your immediate care." },
      { q: "Will my issue be fixed the same day?", a: "We prioritize same-day relief and strive to offer a complete, flawless resolution whenever clinically possible during your emergency visit." },
      { q: "How do you manage emergency fear?", a: "Our calming environment, compassionate team, and expert sedation techniques guarantee a soothing, reassuring experience despite the urgency." },
      { q: "Are your emergency doctors experienced?", a: "Led by Dr. Neeraj Agrawal, our distinguished team is highly trained to masterfully handle complex emergencies with calm, clinical excellence." },
      { q: "Do you handle knocked-out teeth?", a: "Yes, immediate expert intervention can often save a knocked-out tooth. Call us instantly for precise, guided instructions before you arrive." },
      { q: "Is emergency care more expensive?", a: "We maintain our transparent, fair pricing even during emergencies, ensuring you receive world-class urgent care without unexpected stress." }
    ]
  }
];

