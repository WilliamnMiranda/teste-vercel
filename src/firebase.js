import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCAg5h0wOSXHRfcHeo8TmdasBZPfBhLZT0",
  authDomain: "projeto-meu-aph-ba2e9.firebaseapp.com",
  projectId: "projeto-meu-aph-ba2e9",
  storageBucket: "projeto-meu-aph-ba2e9.firebasestorage.app",
  messagingSenderId: "527965069628",
  appId: "1:527965069628:web:34f7dbbc33721e15fb7e39",
  measurementId: "G-482NTQYDGM"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);