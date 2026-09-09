import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// Replace with your actual Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyDummyKeyReplaceMeForRealApp",
  authDomain: "lapadia-fresh.firebaseapp.com",
  projectId: "lapadia-fresh",
  storageBucket: "lapadia-fresh.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

export const initFirebase = () => {
  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }
};

export const signInWithGoogle = async () => {
  initFirebase();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();
    return token;
  } catch (error) {
    console.error("Firebase Google SignIn Error", error);
    throw error;
  }
};
