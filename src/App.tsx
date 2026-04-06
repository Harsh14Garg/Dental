import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Scene from './components/3d/Scene';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import AppointmentForm from './components/AppointmentForm';
import Contact from './components/Contact';
import MyAppointments from './components/MyAppointments';
import AdminDashboard from './components/AdminDashboard';
import ServiceDetail from './components/ServiceDetail';
import SmoothScroll from './components/layout/SmoothScroll';
import Preloader from './components/layout/Preloader';
import { PageTransition } from './components/layout/PageTransition';
import ScrollToTop from './components/layout/ScrollToTop';

function SceneWrapper() {
  const location = useLocation();
  
  const getSceneProps = (): { shapeType: 'torusKnot' | 'sphere' | 'icosahedron' | 'box'; color: string; speed: number } => {
    switch (location.pathname) {
      case '/': return { shapeType: 'torusKnot', color: '#F9F6F0', speed: 2 };
      case '/about': return { shapeType: 'sphere', color: '#B8860B', speed: 1.5 };
      case '/services': return { shapeType: 'icosahedron', color: '#F9F6F0', speed: 2.5 };
      case '/testimonials': return { shapeType: 'box', color: '#B8860B', speed: 1 };
      case '/contact': return { shapeType: 'torusKnot', color: '#D4AF37', speed: 3 };
      default: return { shapeType: 'torusKnot', color: '#F9F6F0', speed: 2 };
    }
  };

  return <Scene {...getSceneProps()} />;
}

function HomePage() {
  return (
    <PageTransition>
      <Hero />
    </PageTransition>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <SmoothScroll>
          <div className="fixed inset-0 z-0 pointer-events-none">
            <SceneWrapper />
          </div>
          
          <div className="min-h-screen flex flex-col bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] relative">
            <Navbar />
            
            <main className="flex-grow relative z-10">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={
                    <PageTransition><About /></PageTransition>
                  } />
                  <Route path="/services" element={
                    <PageTransition><Services /></PageTransition>
                  } />
                  <Route path="/services/:serviceId" element={
                    <PageTransition><ServiceDetail /></PageTransition>
                  } />
                  <Route path="/testimonials" element={
                    <PageTransition><Testimonials /></PageTransition>
                  } />
                  <Route path="/appointment" element={
                    <PageTransition><AppointmentForm /></PageTransition>
                  } />
                  <Route path="/contact" element={
                    <PageTransition><Contact /></PageTransition>
                  } />
                  <Route path="/admin" element={
                    <PageTransition><AdminDashboard /></PageTransition>
                  } />
                  <Route path="/my-appointments" element={
                    <PageTransition><MyAppointments /></PageTransition>
                  } />
                </Routes>
              </AnimatePresence>
            </main>
            
            <Footer />
          </div>
        </SmoothScroll>
      )}
    </Router>
  );
}