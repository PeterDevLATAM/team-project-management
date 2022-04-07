import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, Timestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCeKj_aqMaM8NBOeQn9797cRE2jNR-DBcg",
  authDomain: "teamprojectmanagement-85762.firebaseapp.com",
  projectId: "teamprojectmanagement-85762",
  storageBucket: "teamprojectmanagement-85762.appspot.com",
  messagingSenderId: "857009479124",
  appId: "1:857009479124:web:f50b4c230892b2692a0a41",
};

const app = initializeApp(firebaseConfig);
export const projectAuth = getAuth(app);
export const projectFirestore = getFirestore(app);
export const timestamp = Timestamp();
 