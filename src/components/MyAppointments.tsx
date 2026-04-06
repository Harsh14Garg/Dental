import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, Clock, Activity, AlertCircle } from 'lucide-react';
import { db, auth, handleFirestoreError, OperationType } from '../firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { fadeInUp, fadeInStagger, scaleIn } from '../lib/animations';

interface Appointment {
  id: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export default function MyAppointments() {
  const [appointments, setAppointments] = React.useState<Appointment[]>([]);
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setAppointments([]);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  React.useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'appointments'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const apps = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Appointment[];
      setAppointments(apps);
      setLoading(false);
    }, (error) => {
      setLoading(false);
      handleFirestoreError(error, OperationType.GET, 'appointments');
    });

    return () => unsubscribe();
  }, [user]);

  if (!user) return null;

  return (
    <section className="py-32 bg-[var(--color-bg-secondary)] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8">
          <motion.div
            variants={fadeInStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-[var(--color-brand-primary)] font-medium tracking-[0.3em] uppercase text-[10px] mb-4"
            >
              Dashboard
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-serif text-[var(--color-text-primary)]"
            >
              My <span className="italic text-[var(--color-brand-primary)]">Appointments</span>
            </motion.p>
          </motion.div>
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Link 
              to="/appointment" 
              className="btn-primary px-8 py-4 text-xs"
            >
              Book New Appointment
            </Link>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex justify-center py-32">
            <div className="w-12 h-12 border-2 border-[var(--color-brand-primary)] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : appointments.length > 0 ? (
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={fadeInStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {appointments.map((app, index) => (
              <motion.div
                key={app.id}
                variants={fadeInUp}
                className="bg-[var(--color-bg-primary)] p-8 border border-[var(--color-brand-primary)]/10 group hover:border-[var(--color-brand-primary)]/30 transition-all duration-500"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-12 border border-[var(--color-brand-primary)]/20 rounded-full flex items-center justify-center text-[var(--color-brand-primary)] group-hover:bg-[var(--color-brand-primary)] group-hover:text-white transition-all duration-500">
                    <Activity size={18} strokeWidth={1.5} />
                  </div>
                  <span className={`px-4 py-1.5 text-[9px] font-medium uppercase tracking-[0.2em] border ${
                    app.status === 'confirmed' ? 'bg-green-500/5 text-green-700 border-green-500/20' :
                    app.status === 'cancelled' ? 'bg-red-500/5 text-red-700 border-red-500/20' :
                    'bg-[var(--color-brand-primary)]/5 text-[var(--color-brand-primary)] border-[var(--color-brand-primary)]/20'
                  }`}>
                    {app.status}
                  </span>
                </div>
                <h3 className="text-2xl font-serif text-[var(--color-text-primary)] mb-6 capitalize">{app.service} Dentistry</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-[var(--color-text-secondary)] font-light">
                    <Calendar size={16} className="text-[var(--color-brand-primary)]" strokeWidth={1.5} />
                    <span className="text-sm">{new Date(app.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[var(--color-text-secondary)] font-light">
                    <Clock size={16} className="text-[var(--color-brand-primary)]" strokeWidth={1.5} />
                    <span className="text-sm">{app.time}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-[var(--color-bg-primary)] p-20 text-center border border-[var(--color-brand-primary)]/10"
          >
            <div className="w-20 h-20 bg-[var(--color-brand-primary)]/5 text-[var(--color-text-muted)] rounded-full flex items-center justify-center mx-auto mb-8 border border-[var(--color-brand-primary)]/10">
              <AlertCircle size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-serif text-[var(--color-text-primary)] mb-4">No appointments found</h3>
            <p className="text-[var(--color-text-secondary)] mb-10 font-light max-w-md mx-auto">You haven't booked any elite dental experiences yet. Start your journey to a masterpiece smile today!</p>
            <Link to="/appointment" className="text-[var(--color-brand-primary)] font-medium uppercase tracking-[0.2em] text-[10px] hover:text-[var(--color-text-primary)] transition-colors">Book your first appointment</Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
