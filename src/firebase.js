import { initializeApp } from 'firebase/app';
import { 
  getAuth,                        // Access the website
  updateProfile,                  // user name
  createUserWithEmailAndPassword, // Create account
  signInWithEmailAndPassword,     // Login
  onAuthStateChanged,             // observe user-state (login/logout)
  signOut,                        // Log out
  GoogleAuthProvider,             // Entry with Google account
  signInWithPopup,                // Popup window for Google accounts
  sendPasswordResetEmail,         // Reset-Password Email
} from "firebase/auth";

// Firebase Configuration 
const firebaseConfig = { 
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

const app = initializeApp(firebaseConfig);  // Initialize Firebase
const auth = getAuth(app);                  // Firebase Authentication

// Registration
export const registerUser = async (email, password, displayName) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(auth.currentUser, {displayName})
    // console.log(auth.currentUser);
  } catch (err) {
    return err.message.replace('Firebase:', '')
  }
}

// Login
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    // console.log(userCredential);
  } 
  catch (err) {
    return err.message.replace('Firebase:', '')
  }
}

// Observe, whether user logged in
export const userObserver = (setCurrentUser) => {
  // Check and set the state, whether the user logged "in" or "out"
  onAuthStateChanged(auth, user => { 
    user ? setCurrentUser(user) : setCurrentUser(null);
  })
}

// Log out
export const logout = () => {
  signOut(auth);
}

// Google account authorization
export const signUpProvider = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
}

export const forgotPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email)
    return 'Please, check your e-mails!';
  } catch (err) {
    return err.message.replace('Firebase:', '')
  }
}
