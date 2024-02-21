import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: "shines-web.firebaseapp.com",
  databaseURL: "https://shines-web-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "shines-web",
  storageBucket: "shines-web.appspot.com",
  messagingSenderId: "255238634066",
  appId: "1:255238634066:web:d75b975642516954ebbd8b",
  measurementId: "G-G3JEB36DYP"
};

const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { firebaseApp, firestore, storage };