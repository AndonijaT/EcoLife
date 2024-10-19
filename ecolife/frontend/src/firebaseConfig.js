import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Import getStorage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqGKs6H5MucHF_u-Qgtx2eMdjEtX7JxEI",
  authDomain: "ecolife-11f37.firebaseapp.com",
  projectId: "ecolife-11f37",
  storageBucket: "ecolife-11f37.appspot.com",
  messagingSenderId: "515647683241",
  appId: "1:515647683241:web:8b89db8db8d244380ec7b8",
  measurementId: "G-B74M6LE0HZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore
const storage = getStorage(app); // Initialize Firebase Storage

export { auth, analytics, db, storage }; // Export Firebase Storage
