import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyDcnQO9jvCp7rpCgg4GGOTT9utyCvi6Dj8",
  authDomain: "ulamgen.firebaseapp.com",
  projectId: "ulamgen",
  storageBucket: "ulamgen.firebasestorage.app",
  messagingSenderId: "353202121611",
  appId: "1:353202121611:web:b67611962ff53063a51d8e",
  measurementId: "G-VPPGC7XN4Q",
  databaseURL: "https://ulamgen-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };

