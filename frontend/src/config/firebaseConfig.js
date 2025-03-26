import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  getDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// sign-up and also storing name , loc, by getting user red
const signUpUser = async (name, email, password, location) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Store user details in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      name,
      email,
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
      createdAt: new Date(),
    });

    console.log('done done!', user);
    return user;
  } catch (error) {
    console.error('error singup:', error);
    throw error;
  }
};

// here sign -in BUT also we are gonna update user location everytime
const signInUser = async (email, password, location) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Update user's location
    await updateDoc(doc(db, 'users', user.uid), {
      location,
      lastLogin: new Date(),
    });

    console.log('Sign-in successful! Location updated.', user);
    return user;
  } catch (error) {
    console.error('Sign-in error:', error);
    throw error;
  }
};

// Function return user email and last registered lication
const getUserData = async () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          resolve({
            email: user.email,
            location: userDoc.data().location,
          });
          console.log(userDoc);
        } else {
          reject('User data not found');
        }
      } else {
        reject('No user is logged in');
      }
    });
  });
};

export { auth, db, signUpUser, signInUser, getUserData };
