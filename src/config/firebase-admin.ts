import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin (only once)
const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // Replace escaped newlines with actual newlines
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
};

// Check if already initialized (important for serverless/hot-reload)
const adminApp = getApps().length === 0 
  ? initializeApp(firebaseAdminConfig) 
  : getApps()[0];

// Export Firestore instance
export const adminDb = getFirestore(adminApp);

// Optional: Export other Firebase Admin services
// export const adminAuth = getAuth(adminApp);
// export const adminStorage = getStorage(adminApp);
