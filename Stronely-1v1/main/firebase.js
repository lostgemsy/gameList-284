import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js';
import { getAuth, signInAnonymously } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js';

// Firebase Web app configuration supplied for this project.
export const firebaseConfig = {
  apiKey: 'AIzaSyC_mWlv7NuLbedCxc99DL51OlT-V0F-Bog',
  authDomain: 'multiplayer-code.firebaseapp.com',
  databaseURL: 'https://multiplayer-code-default-rtdb.firebaseio.com',
  projectId: 'multiplayer-code',
  storageBucket: 'multiplayer-code.firebasestorage.app',
  messagingSenderId: '976456965612',
  appId: '1:976456965612:web:87755c7adde2f16639b4c9',
  measurementId: 'G-735HLGCNLM'
};

export function isFirebaseConfigured() {
  return Object.values(firebaseConfig).every(value => value && !value.includes('PASTE_HERE'));
}

export async function connectFirebase() {
  if (!isFirebaseConfigured()) throw new Error('Add your Firebase web configuration in main/firebase.js to play online.');
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const database = getDatabase(app);
  const credential = await signInAnonymously(auth);
  return { app, auth, database, user: credential.user };
}
