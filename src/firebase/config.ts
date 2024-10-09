import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCGfUUt2IBHMwAfT2v_ojD8K_QXu_NI00o",
  authDomain: "muare-home.firebaseapp.com",
  projectId: "muare-home",
  storageBucket: "muare-home.appspot.com",
  messagingSenderId: "574922440857",
  appId: "1:574922440857:web:0eb68b860a6cc2590df808",
  measurementId: "G-C44G4TBCS1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);