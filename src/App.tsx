import { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import SmoothScroll from './components/layout/SmoothScroll';
import Preloader from './components/layout/Preloader';
import { PageTransition } from './components/layout/PageTransition';
import ScrollToTop from './components/layout/ScrollToTop';
import ScrollProgress from './components/layout/ScrollProgress';
import Hero from './components/Hero';

const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Services'));
const Gallery = lazy(() => import('./components/Gallery'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const AppointmentForm = lazy(() => import('./components/AppointmentForm'));
const Contact = lazy(() => import('./components/Contact'));
const MyAppointments = lazy(() => import('./components/MyAppointments'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const ServiceDetail = lazy(() => import('./components/ServiceDetail'));

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
      <ScrollProgress />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <SmoothScroll>
          <div className="min-h-screen flex flex-col bg-[var(--color-espresso)] text-[var(--color-cream)] relative w-full">
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-[var(--color-espresso)] focus:text-[var(--color-cream)] focus:border focus:border-[var(--color-bronze)] focus:left-4 focus:top-4 rounded-sm">
              Skip to main content
            </a>
            <Navbar />
            
            <main id="main-content" className="flex-grow relative z-10 w-full min-h-screen">
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
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
                    <Route path="/gallery" element={
                      <PageTransition><Gallery /></PageTransition>
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
              </Suspense>
            </main>
            
            <Footer />
          </div>
        </SmoothScroll>
      )}
    </Router>
  );
}
