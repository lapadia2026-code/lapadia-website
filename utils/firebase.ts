import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// Replace with your actual Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyDGuK8kSUxEJyBN02g_Bu4m0nmHL5jUuOo",
  authDomain: "lapadia-1e837.firebaseapp.com",
  projectId: "lapadia-1e837",
  storageBucket: "lapadia-1e837.firebasestorage.app",
  messagingSenderId: "26108801817",
  appId: "1:26108801817:web:d6bf095dc409ed44038b88",
  measurementId: "G-ZFKMQ2L2SD"
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
