import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { Menu, X, Calendar, LogIn, User, LogOut, Shield, Sun, Moon } from 'lucide-react';
import { auth, signInWithGoogle, logout, db, handleFirestoreError, OperationType } from "../../firebase";
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Default to light mode
  const { scrollY } = useScroll();
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact', path: '/contact' },
  ];

  useMotionValueEvent(scrollY, 'change', (v) => setIsScrolled(v > 50));

  useEffect(() => {
    // Theme toggle logic
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

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

  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = async () => { 
    setLoginError(null);
    try { 
      await signInWithGoogle(); 
    } catch (e: any) { 
      console.error(e); 
      setLoginError(e.message || "Failed to sign in.");
    } 
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
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-['Inter'] ${
        isScrolled ? 'glass-nav-scrolled' : 'glass-nav'
      }`}
    >
      {loginError && (
        <div className="absolute top-full left-0 right-0 bg-[#EF4444]/10 text-[#EF4444] p-3 text-center text-xs font-medium border-b border-[#EF4444]/20 backdrop-blur-md">
          {loginError}
        </div>
      )}
      
      <div className="max-w-[1280px] w-full mx-auto px-4 md:px-6 h-[72px] flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-[32px] h-[32px] border border-[var(--color-latte)]/20 group-hover:border-[var(--color-caramel)] transition-colors flex items-center justify-center rounded-sm">
            <span className="text-[var(--color-caramel)] font-serif text-[18px]">D</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-[16px] text-[var(--color-cream)] leading-none mb-1">DE Dental Square</span>
            <span className="text-[9px] uppercase tracking-[0.15em] text-[var(--color-text-muted)] leading-none">Center for Advanced Dental Care</span>
          </div>
        </Link>
        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-8">
          <AnimatePresence>
            {isAdmin && (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                <Link to="/admin" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--color-caramel)] hover:opacity-70 transition-opacity">
                  <Shield size={12} /> Admin
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
          
          {links.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="text-[13px] font-medium uppercase tracking-[0.06em] text-[var(--color-cream)] hover:text-[var(--color-caramel)] transition-colors relative py-2 group"
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[var(--color-caramel)]"
                  initial={false}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-6">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-[var(--color-latte)]/10 text-[var(--color-cream)] transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <AnimatePresence mode="wait">
            {user ? (
              <motion.div key="user" className="flex items-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Link to="/my-appointments" className="flex items-center gap-2 text-[13px] font-medium text-[var(--color-cream)] hover:text-[var(--color-caramel)] transition-colors uppercase tracking-[0.06em]">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="" className="w-6 h-6 rounded-full border border-[var(--color-latte)]/20" referrerPolicy="no-referrer" />
                  ) : (
                    <User size={16} />
                  )}
                  <span>{user.displayName?.split(' ')[0]}</span>
                </Link>
                <button onClick={handleLogout} className="text-[var(--color-text-muted)] hover:text-[#EF4444] transition-colors" aria-label="Logout">
                  <LogOut size={16} />
                </button>
              </motion.div>
            ) : (
              <motion.button 
                key="login" 
                onClick={handleLogin} 
                className="flex items-center gap-2 text-[13px] font-medium text-[var(--color-cream)] hover:text-[var(--color-caramel)] transition-colors uppercase tracking-[0.06em]"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              >
                <LogIn size={16} /> Login
              </motion.button>
            )}
          </AnimatePresence>

          <Link to="/appointment">
            <button className="btn-primary px-6 py-3 flex items-center justify-center gap-2 text-[13px] uppercase">
              <Calendar size={16} /> Book Now
            </button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-[var(--color-cream)] p-2" onClick={() => setIsOpen(!isOpen)}>
          <AnimatePresence mode="wait">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-[var(--color-espresso)] border-t border-[var(--color-latte)]/10 overflow-hidden shadow-xl"
          >
            <div className="py-6 px-6 flex flex-col gap-2">
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.15em] text-[var(--color-cream)] p-3 mb-2 bg-[var(--color-latte)]/10 rounded-lg"
              >
                {isDarkMode ? <Sun size={16} /> : <Moon size={16} />} {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>

              {isAdmin && (
                <Link to="/admin" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.15em] text-[var(--color-caramel)] p-3 mb-2 bg-[var(--color-caramel)]/5 rounded-lg">
                  <Shield size={16} /> Admin Panel
                </Link>
              )}
              
              {links.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path} 
                  onClick={() => setIsOpen(false)} 
                  className="text-[14px] font-medium uppercase tracking-[0.1em] py-4 border-b border-[var(--color-latte)]/10 text-[var(--color-cream)] hover:text-[var(--color-caramel)] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-6 space-y-4">
                {user ? (
                  <div className="space-y-4">
                    <Link to="/my-appointments" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                      <img src={user.photoURL || ''} alt="" className="w-10 h-10 rounded-full border border-[var(--color-latte)]/20" referrerPolicy="no-referrer" />
                      <div>
                        <div className="font-semibold text-[15px] text-[var(--color-cream)]">{user.displayName}</div>
                        <div className="text-[11px] text-[var(--color-caramel)] uppercase tracking-[0.1em] font-medium">My Appointments &rarr;</div>
                      </div>
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#EF4444] py-3 bg-[#EF4444]/10 rounded-lg">
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                ) : (
                  <button onClick={handleLogin} className="w-full flex items-center justify-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] py-3 bg-[var(--color-warmgray)] border border-[var(--color-latte)]/10 rounded-lg text-[var(--color-cream)]">
                    <LogIn size={16} /> Login
                  </button>
                )}
                <Link to="/appointment" onClick={() => setIsOpen(false)} className="block w-full">
                  <button className="btn-primary w-full py-3 flex items-center justify-center gap-2 text-[13px] uppercase">
                    <Calendar size={16} /> Book Appointment
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
