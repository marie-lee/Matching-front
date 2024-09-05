import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider,  signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBDJVxN3BS0MbI0uYqpBNBjRYIjoyrsxOI",
  authDomain: "matchmanage-7d65b.firebaseapp.com",
  projectId: "matchmanage-7d65b",
  storageBucket: "matchmanage-7d65b.appspot.com",
  messagingSenderId: "705464887574",
  appId: "1:705464887574:web:9e317af27135d6adaa4837",
  measurementId: "G-3J8TJBZRZ9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup};