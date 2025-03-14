import { initializeApp } from 'firebase/app';
import { getAuth,signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyBSFX1S6z_jQSj_gUO9iNGqdRQFkLvUTW0",
  authDomain: "booksystem-47cca.firebaseapp.com",
  projectId: "booksystem-47cca",
  storageBucket: "booksystem-47cca.firebasestorage.app",
  messagingSenderId: "904473865953",
  appId: "1:904473865953:web:b34ad94175d0437f9a51a0",
  measurementId: "G-73KRKXZQ8N"
};

  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, signOut,onAuthStateChanged,  db };