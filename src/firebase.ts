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
  getDocFromServer,
  deleteDoc
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
export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string;
    email?: string | null;
    emailVerified?: boolean;
    isAnonymous?: boolean;
    tenantId?: string | null;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
// Removed trace as part of optimization
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// --- Authentication (Admin Logic Included) ---
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    const userRef = doc(db, 'users', user.uid);
    let userSnap;
    try {
      userSnap = await getDoc(userRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
      return user; // fallback
    }
    
    // Check if user is the Admin (h14agr@gmail.com)
    const isAdmin = user.email === 'h14agr@gmail.com';
    
    try {
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
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}`);
    }
    
    return user;
  } catch (error: any) {
    if (error?.code === 'auth/popup-closed-by-user' || error?.code === 'auth/cancelled-popup-request') return null;
    if (error?.code === 'auth/popup-blocked') {
      throw new Error('Popup blocked. Please allow popups for this site or open the app in a new tab.');
    }
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
    const absoluteUrl = `/api/send-email`;
    console.log(`📡 Fetching to: ${absoluteUrl}`);
    fetch(absoluteUrl, {
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

export const deleteAppointment = async (id: string) => {
  const path = `appointments/${id}`;
  try {
    await deleteDoc(doc(db, 'appointments', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
};

export const deleteTestimonial = async (id: string) => {
// Removed log as part of optimization
  const path = `testimonials/${id}`;
  try {
    await deleteDoc(doc(db, 'testimonials', id));
// Removed log as part of optimization
  } catch (error) {
    console.error("firebase.ts: Delete error:", error);
    handleFirestoreError(error, OperationType.DELETE, path);
  }
};

// --- Connection Test ---
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if(error instanceof Error && error.message.includes('offline')) {
// Removed warn as part of optimization
    }
  }
}
testConnection();