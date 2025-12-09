
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyAhP7LDHkWRTTZL5YrfrYrjdhOp58trujo",
  authDomain: "thypodcast-project.firebaseapp.com",
  projectId: "thypodcast-project",
  storageBucket: "thypodcast-project.appspot.com",
  messagingSenderId: "997408958843",
  appId: "1:997408958843:web:1f4dae95d4f27ad1bb35de",
  measurementId: "G-8EH86N9JLG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;