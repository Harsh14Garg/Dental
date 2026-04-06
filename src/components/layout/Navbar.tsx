import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { Menu, X, Calendar, LogIn, User, LogOut, Shield } from 'lucide-react';
import { auth, signInWithGoogle, logout, db, handleFirestoreError, OperationType } from "../../firebase";
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import Magnetic from '../ui/Magnetic';

const easings = {
  smooth: [0.16, 1, 0.3, 1] as const,
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact', path: '/contact' },
  ];

  useMotionValueEvent(scrollY, 'change', (v) => setIsScrolled(v > 50));

  useEffect(() => {
    let unsubDoc: (() => void) | undefined;
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        unsubDoc = onSnapshot(doc(db, 'users', u.uid), (d) => {
          setIsAdmin(d.exists() && d.data().role === 'admin');
        }, (error) => {
          setIsAdmin(false);
          handleFirestoreError(error, OperationType.GET, `users/${u.uid}`);
        });
      } else {
        setIsAdmin(false);
        unsubDoc?.();
      }
    });
    return () => { unsubAuth(); unsubDoc?.(); };
  }, []);

  const handleLogin = async () => { 
    try { await signInWithGoogle(); } catch (e) { console.error(e); } 
  };
  
  const handleLogout = async () => { 
    try { 
      await logout(); 
      navigate('/');
      setIsOpen(false);
    } catch (e) { console.error(e); } 
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: easings.smooth }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass-nav-scrolled py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4 lg:gap-8">
        <Magnetic>
          <Link to="/" className="flex items-center gap-4 group flex-shrink-0">
            <motion.div 
              className="w-10 h-10 border border-[var(--color-brand-primary)] flex items-center justify-center text-[var(--color-brand-primary)] font-serif text-xl relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              D
            </motion.div>
            <div className="flex flex-col leading-tight">
              <span className="font-serif text-xl tracking-wide text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-primary)] transition-colors duration-300">
                DE Dental Square
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-[var(--color-text-muted)] leading-[1.4]">
                Center for Advanced<br />Dental Care
              </span>
            </div>
          </Link>
        </Magnetic>

        <nav className="hidden md:flex items-center gap-6 lg:gap-10">
          <AnimatePresence>
            {isAdmin && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Link to="/admin" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)] hover:opacity-70 transition-opacity">
                  <Shield size={12} /> Admin
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
          
          {links.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index, ease: easings.smooth }}
            >
              <Link to={link.path} className="relative text-xs uppercase tracking-[0.15em] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-brand-primary)] transition-colors duration-300 py-2">
                {link.name}
                {location.pathname === link.path && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-[2px]"
                    style={{ background: 'var(--color-brand-primary)' }}
                    transition={{ duration: 0.3, ease: easings.smooth }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <AnimatePresence mode="wait">
            {user ? (
              <motion.div key="user" className="flex items-center gap-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <Link to="/my-appointments" className="flex items-center gap-2 text-xs uppercase tracking-[0.1em] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-brand-primary)] transition-colors">
                  {user.photoURL ? (
                    <motion.img src={user.photoURL} alt="" className="w-7 h-7 rounded-full border border-[var(--color-brand-primary)]/30" referrerPolicy="no-referrer" whileHover={{ scale: 1.1 }} />
                  ) : (
                    <User size={14} />
                  )}
                  <span className="hidden lg:inline">{user.displayName?.split(' ')[0]}</span>
                </Link>
                <motion.button onClick={handleLogout} className="text-[var(--color-text-muted)] hover:text-red-400 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <LogOut size={14} />
                </motion.button>
              </motion.div>
            ) : (
              <motion.button key="login" onClick={handleLogin} className="flex items-center gap-2 text-xs uppercase tracking-[0.1em] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-brand-primary)] transition-colors" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <LogIn size={14} /> Login
              </motion.button>
            )}
          </AnimatePresence>

          <Magnetic>
            <Link to="/appointment">
              <motion.button whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} className="btn-primary flex items-center gap-2 px-6 py-3 text-xs">
                <Calendar size={14} /> Book Now
              </motion.button>
            </Link>
          </Magnetic>
        </div>

        <motion.button className="md:hidden text-[var(--color-text-primary)] p-2 relative" onClick={() => setIsOpen(!isOpen)} whileTap={{ scale: 0.95 }}>
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X size={24} strokeWidth={1.5} />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu size={24} strokeWidth={1.5} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: easings.smooth }}
            className="md:hidden absolute top-full left-0 right-0 bg-white border-t overflow-hidden"
            style={{ borderColor: 'rgba(26,26,26,0.05)' }}
          >
            <div className="py-6 px-6 flex flex-col gap-4">
              {isAdmin && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <Link to="/admin" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
                    <Shield size={14} /> Admin Panel
                  </Link>
                </motion.div>
              )}
              
              {links.map((l, i) => (
                <motion.div key={l.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link to={l.path} onClick={() => setIsOpen(false)} className="text-sm font-medium uppercase tracking-[0.15em] py-3 border-b text-[var(--color-text-secondary)] hover:text-[var(--color-brand-primary)] transition-colors" style={{ borderColor: 'rgba(26,26,26,0.05)' }}>
                    {l.name}
                  </Link>
                </motion.div>
              ))}
              
              <div className="pt-4 space-y-4">
                {user ? (
                  <div className="space-y-4">
                    <Link to="/my-appointments" onClick={() => setIsOpen(false)} className="flex items-center gap-4">
                      <img src={user.photoURL || ''} alt="" className="w-10 h-10 rounded-full" referrerPolicy="no-referrer" />
                      <div>
                        <div className="font-serif text-lg text-[var(--color-text-primary)]">{user.displayName}</div>
                        <div className="text-[10px] text-[var(--color-brand-primary)] uppercase tracking-[0.2em]">My Appointments</div>
                      </div>
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-[0.1em] text-red-400 py-4 border border-red-200">
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                ) : (
                  <button onClick={handleLogin} className="w-full flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-[0.1em] py-4 border text-[var(--color-text-secondary)]" style={{ borderColor: 'rgba(26,26,26,0.1)' }}>
                    <LogIn size={14} /> Login with Google
                  </button>
                )}
                <Link to="/appointment" onClick={() => setIsOpen(false)}>
                  <button className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-sm">
                    <Calendar size={14} /> Book Appointment
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
