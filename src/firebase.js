// src/firebase.js
import { initializeApp }        from 'firebase/app';
import { getAuth }              from 'firebase/auth';
import { getFirestore }         from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBXK9AJpHhdcK4N78BfhCTqUsG4Tt8ZMO4",
  authDomain: "crm-artisan.firebaseapp.com",
  projectId: "crm-artisan",
  storageBucket: "crm-artisan.firebasestorage.app",
  messagingSenderId: "1084557470394",
  appId: "1:1084557470394:web:7769d367e763b0303fb083"
};

const app = initializeApp(firebaseConfig);

// N’OUBLIEZ PAS ces deux lignes :
export const auth = getAuth(app);
export const db   = getFirestore(app);
