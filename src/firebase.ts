import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp, 
  doc, 
  getDoc, 
  setDoc, 
  getDocFromServer 
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

// --- Error Handling ---
export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    userId: auth.currentUser?.uid,
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error("Database operation failed. Please try again.");
}

// --- Authentication (Admin Logic Included) ---
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    
    // Check if user is the Admin (h14agr@gmail.com)
    const isAdmin = user.email === 'h14agr@gmail.com';
    
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: isAdmin ? 'admin' : 'patient'
      });
    } else if (isAdmin && userSnap.data().role !== 'admin') {
      await setDoc(userRef, { role: 'admin' }, { merge: true });
    }
    
    return user;
  } catch (error: any) {
    if (error?.code === 'auth/popup-closed-by-user') return null;
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export const logout = () => signOut(auth);

// --- Appointment Logic (Optimized for Speed) ---
export interface AppointmentData {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message?: string;
  userId?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: any;
}

export const bookAppointment = async (data: Omit<AppointmentData, 'status' | 'createdAt'>) => {
  const path = 'appointments';
  try {
    const appointmentRef = collection(db, path);
    
    // 1. SAVE TO FIRESTORE (Awaited)
    // This ensures the data is safe in your database first.
    await addDoc(appointmentRef, {
      ...data,
      userId: auth.currentUser?.uid || null,
      status: 'pending',
      createdAt: serverTimestamp()
    });

    // 2. TRIGGER EMAIL (NOT Awaited - "Fire and Forget")
    // This is the secret to the backup site's speed. The website won't 
    // wait for the email server to respond before showing "Success".
    fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: data.email,
        subject: 'Appointment Request Received - De Dental Square',
        html: `
          <div style="font-family: sans-serif; color: #333;">
            <h2>Appointment Request Received</h2>
            <p>Dear ${data.name},</p>
            <p>Thank you for reaching out to <strong>De Dental Square</strong>. We have received your request for <strong>${data.service}</strong> on <strong>${data.date}</strong> at <strong>${data.time}</strong>.</p>
            <p>Our team will review your request and contact you shortly to confirm.</p>
            <hr />
            <p style="font-size: 0.8em; color: #777;">This is an automated notification. Please do not reply directly to this email.</p>
          </div>
        `
      })
    }).catch(err => console.error("Background email failed:", err));

  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
};

// --- Connection Test ---
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if(error instanceof Error && error.message.includes('offline')) {
      console.warn("Firebase is currently offline or misconfigured.");
    }
  }
}
testConnection();