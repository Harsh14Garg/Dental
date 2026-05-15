import React from "react";
import { motion } from "motion/react";
import {
  Calendar,
  Clock,
  Activity,
  AlertCircle,
  CheckCircle,
  XCircle,
  User as UserIcon,
  Trash2,
  MessageSquare,
  Star,
} from "lucide-react";
import {
  db,
  auth,
  deleteAppointment,
  handleFirestoreError,
  OperationType,
} from "../firebase";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { fadeInUp, fadeInStagger } from "../lib/animations";

interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message?: string;
  status: "pending" | "confirmed" | "cancelled";
}

interface Testimonial {
  id: string;
  name: string;
  service: string;
  content: string;
  rating: number;
  image: string;
  reply?: string;
  hidden?: boolean;
}

export default function AdminDashboard() {
  const [appointments, setAppointments] = React.useState<Appointment[]>([]);
  const [testimonials, setTestimonials] = React.useState<Testimonial[]>([]);
  const [user, setUser] = React.useState<User | null>(null);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [reply, setReply] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    let unsubscribeDoc: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        unsubscribeDoc = onSnapshot(
          doc(db, "users", currentUser.uid),
          (userDoc) => {
            if (userDoc.exists() && userDoc.data().role === "admin") {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
              setLoading(false);
            }
          },
          (error) => {
            setIsAdmin(false);
            setLoading(false);
            handleFirestoreError(
              error,
              OperationType.GET,
              `users/${currentUser.uid}`,
            );
          },
        );
      } else {
        setIsAdmin(false);
        setAppointments([]);
        setLoading(false);
        if (unsubscribeDoc) unsubscribeDoc();
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeDoc) unsubscribeDoc();
    };
  }, []);

  React.useEffect(() => {
    if (!user || !isAdmin) return;

    const qApps = query(
      collection(db, "appointments"),
      orderBy("createdAt", "desc"),
    );
    const unsubscribeApps = onSnapshot(
      qApps,
      (snapshot) => {
        const apps = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Appointment[];
        setAppointments(apps);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        handleFirestoreError(error, OperationType.GET, "appointments");
      },
    );

    const qTests = query(
      collection(db, "testimonials"),
      orderBy("createdAt", "desc"),
    );
    const unsubscribeTests = onSnapshot(
      qTests,
      (snapshot) => {
        const tests = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Testimonial[];
        setTestimonials(tests);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, "testimonials");
      },
    );

    return () => {
      unsubscribeApps();
      unsubscribeTests();
    };
  }, [user, isAdmin]);

  const updateStatus = async (
    app: Appointment,
    newStatus: "confirmed" | "cancelled",
  ) => {
    try {
      await updateDoc(doc(db, "appointments", app.id), {
        status: newStatus,
      });

      // Send email notification (Uses relative URL to hit Netlify function directly)
      const fetchUrl = `/api/send-email`;
      if (newStatus === "confirmed") {
        await fetch(fetchUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: app.email,
            subject: "Appointment Confirmed - De Dental Square",
            html: `<p>Dear ${app.name},</p><p>Your appointment for <strong>${app.service} Dentistry</strong> on <strong>${app.date}</strong> at <strong>${app.time}</strong> has been <strong>confirmed</strong>.</p><p>We look forward to seeing you!</p><p>Best regards,<br/>De Dental Square</p>`,
          }),
        });
      } else if (newStatus === "cancelled") {
        await fetch(fetchUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: app.email,
            subject: "Appointment Cancelled - De Dental Square",
            html: `<p>Dear ${app.name},</p><p>Your appointment for <strong>${app.service} Dentistry</strong> on <strong>${app.date}</strong> at <strong>${app.time}</strong> has been cancelled.</p><p>If you have any questions or would like to reschedule, please contact us.</p><p>Best regards,<br/>De Dental Square</p>`,
          }),
        });
      }
    } catch (error) {
      alert("Failed to update status. Please check your permissions.");
      handleFirestoreError(
        error,
        OperationType.UPDATE,
        `appointments/${app.id}`,
      );
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAppointment(id);
    } catch (error) {
      alert("Failed to delete appointment.");
    }
  };

  const handleReply = async (id: string) => {
    try {
      await updateDoc(doc(db, "testimonials", id), { reply: reply[id] });
      setReply((prev) => ({ ...prev, [id]: "" }));
    } catch (error) {
      alert("Failed to add reply.");
      handleFirestoreError(error, OperationType.UPDATE, `testimonials/${id}`);
    }
  };

  if (!user || !isAdmin) return null;

  return (
    <section className="py-32 bg-[var(--color-warmgray)] relative" id="admin">
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
              className="text-[var(--color-bronze)] font-medium tracking-[0.3em] uppercase text-[10px] mb-4"
            >
              Admin Control Panel
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-serif text-[var(--color-cream)]"
            >
              All{" "}
              <span className="italic text-[var(--color-bronze)]">
                Bookings
              </span>
            </motion.p>
          </motion.div>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-serif mb-8 text-[var(--color-cream)]">
            Manage Testimonials
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="glass-card p-6 rounded-sm border border-[var(--color-bronze)]/10"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-medium text-[var(--color-cream)]">
                      {t.name}
                    </h4>
                    <p className="text-xs text-[var(--color-bronze)] uppercase tracking-widest">
                      {t.service}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={async () => {
                        await updateDoc(doc(db, "testimonials", t.id), {
                          hidden: !t.hidden,
                        });
                      }}
                      className={`text-xs px-2 py-1 rounded ${t.hidden ? "bg-red-900/30 text-red-400 border border-red-900/50" : "bg-green-900/30 text-green-400 border border-green-900/50"}`}
                    >
                      {t.hidden ? "Hidden" : "Visible"}
                    </button>
                    <div className="flex items-center gap-1">
                      <Star
                        size={14}
                        className="fill-[var(--color-bronze)] text-[var(--color-bronze)]"
                      />
                      <span className="text-sm font-medium text-[var(--color-cream)]">
                        {t.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-[var(--color-latte)]/80 mb-4 font-light leading-relaxed">
                  {t.content}
                </p>

                {/* Reply Section */}
                <div className="mt-4 border-t border-[var(--color-bronze)]/10 pt-4">
                  {t.reply && (
                    <div className="mb-4">
                      <p className="text-xs font-bold text-[var(--color-bronze)] uppercase tracking-wider mb-1">
                        Admin Reply:
                      </p>
                      <p className="text-sm text-[var(--color-bronze)] italic">
                        {t.reply}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder={
                        t.reply
                          ? "Update reply..."
                          : "Reply to this testimonial..."
                      }
                      value={reply[t.id] || ""}
                      onChange={(e) =>
                        setReply((prev) => ({
                          ...prev,
                          [t.id]: e.target.value,
                        }))
                      }
                      className="flex-grow p-3 bg-[var(--color-espresso)] border border-[var(--color-bronze)]/20 rounded-sm text-sm text-[var(--color-cream)] focus:border-[var(--color-bronze)] outline-none"
                    />
                    <button
                      onClick={() => handleReply(t.id)}
                      className="p-3 bg-[var(--color-bronze)] text-[var(--color-espresso)] rounded-sm hover:bg-[var(--color-caramel)] transition-colors"
                      title="Send Reply"
                    >
                      <MessageSquare size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-32">
            <div className="w-12 h-12 border-2 border-[var(--color-bronze)] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : appointments.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {appointments.map((app, index) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: Math.min(index * 0.05, 0.5),
                  }}
                  className="glass-card p-8 border border-[var(--color-bronze)]/10 group hover:border-[var(--color-bronze)]/30 transition-all duration-500 flex flex-col rounded-sm bg-[var(--color-espresso)]"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 border border-[var(--color-bronze)]/20 rounded-full flex items-center justify-center text-[var(--color-bronze)] group-hover:bg-[var(--color-caramel)] group-hover:text-white transition-all duration-500">
                      <Activity size={18} strokeWidth={1.5} />
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-4 py-1.5 text-[9px] font-medium uppercase tracking-[0.2em] border rounded-sm ${
                          app.status === "confirmed"
                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                            : app.status === "cancelled"
                              ? "bg-red-500/10 text-red-400 border-red-500/20"
                              : "bg-[var(--color-bronze)]/10 text-[var(--color-bronze)] border-[var(--color-bronze)]/20"
                        }`}
                      >
                        {app.status}
                      </span>
                      <button
                        onClick={() => handleDelete(app.id)}
                        className="text-red-400/70 hover:text-red-400 transition-colors p-1"
                        title="Delete Booking"
                        aria-label="Delete Booking"
                      >
                        <Trash2 size={16} strokeWidth={1.5} aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-xl font-serif text-[var(--color-cream)] mb-2 capitalize">
                    {app.service} Dentistry
                  </h3>

                  <div className="space-y-3 mb-6 flex-grow">
                    <div className="flex items-center gap-3 text-[var(--color-latte)]/80 font-light">
                      <UserIcon
                        size={16}
                        className="text-[var(--color-bronze)]"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm">{app.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[var(--color-latte)]/80 font-light">
                      <Calendar
                        size={16}
                        className="text-[var(--color-bronze)]"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm">
                        {new Date(app.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[var(--color-latte)]/80 font-light">
                      <Clock
                        size={16}
                        className="text-[var(--color-bronze)]"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm">{app.time}</span>
                    </div>
                    <div className="text-xs text-[var(--color-latte)]/60 mt-2 space-y-1">
                      <p>Email: {app.email}</p>
                      <p>Phone: {app.phone}</p>
                      {app.message && (
                        <div className="mt-4 p-3 bg-[var(--color-bronze)]/5 border border-[var(--color-bronze)]/10 rounded-sm italic">
                          <p className="text-[10px] uppercase tracking-wider mb-1 font-bold text-[var(--color-bronze)]">
                            Message:
                          </p>
                          <p className="text-[var(--color-cream)] leading-relaxed font-light">
                            "{app.message}"
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {app.status === "pending" && (
                    <div className="flex gap-3 pt-4 border-t border-[var(--color-bronze)]/10 mt-auto">
                      <button
                        onClick={() => updateStatus(app, "confirmed")}
                        className="flex-1 flex items-center justify-center gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 py-3 text-[10px] font-medium uppercase tracking-[0.2em] transition-colors border border-green-500/20 rounded-sm"
                      >
                        <CheckCircle size={14} strokeWidth={1.5} /> Confirm
                      </button>
                      <button
                        onClick={() => updateStatus(app, "cancelled")}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 py-3 text-[10px] font-medium uppercase tracking-[0.2em] transition-colors border border-red-500/20 rounded-sm"
                      >
                        <XCircle size={14} strokeWidth={1.5} /> Cancel
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
          </div>
        ) : (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass-card p-20 text-center border border-[var(--color-bronze)]/10"
          >
            <div className="w-20 h-20 bg-[var(--color-bronze)]/5 text-[var(--color-latte)]/40 rounded-full flex items-center justify-center mx-auto mb-8 border border-[var(--color-bronze)]/10">
              <AlertCircle size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-serif text-[var(--color-cream)] mb-4">
              No bookings found
            </h3>
            <p className="text-[var(--color-latte)]/80 font-light max-w-md mx-auto">
              There are currently no appointments in the system.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
