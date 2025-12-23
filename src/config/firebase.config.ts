// src/lib/firebase.ts (or src/config/firebase.ts)

import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

// Debug environment variables
console.log('🔧 Firebase Config Loading...', {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  useEmulator: process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR,
  emulatorHost: process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_HOST
});

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Validate required config
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  throw new Error('Missing Firebase configuration. Check your .env.local file.');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const functions = getFunctions(app, 'us-central1');
export const auth = getAuth(app);
export const storage = getStorage(app);

// Emulator connection
const shouldUseEmulator = process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true';

if (shouldUseEmulator) {
  console.log('🚀 Connecting to Firebase Emulators...');
  
  const emulatorHost = process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_HOST || 'localhost';
  
  try {
    // Connect Functions emulator
    connectFunctionsEmulator(functions, emulatorHost, 5001);
    console.log('✅ Functions emulator connected');
    
    // Connect Firestore emulator
    connectFirestoreEmulator(db, emulatorHost, 8080);
    console.log('✅ Firestore emulator connected');
    
    // Connect Auth emulator
    connectAuthEmulator(auth, `http://${emulatorHost}:9099`);
    console.log('✅ Auth emulator connected');
    
    // Connect Storage emulator
    connectStorageEmulator(storage, emulatorHost, 9199);
    console.log('✅ Storage emulator connected');
    
  } catch (error) {
    console.error('❌ Error connecting to emulators:', error);
  }
} else {
  console.log('☁️ Using production Firebase services');
}

export default app;
