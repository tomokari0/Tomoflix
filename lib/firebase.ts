import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBCJkD1zEtO2JcEZDTmhTVqF6q-wKWik_s",
  authDomain: "tomflix-cf132.firebaseapp.com",
  projectId: "tomflix-cf132",
  storageBucket: "tomflix-cf132.firebasestorage.app",
  messagingSenderId: "880823212666",
  appId: "1:880823212666:web:b05246bc40339bd46e39c3",
  measurementId: "G-GEN2X2ZTM2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;