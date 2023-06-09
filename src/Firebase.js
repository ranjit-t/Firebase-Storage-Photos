import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCUe2lDM4jC3j5Q6HydltFjtQX4RVdO2hU",
  authDomain: "auth-basics-82cc0.firebaseapp.com",
  projectId: "auth-basics-82cc0",
  storageBucket: "auth-basics-82cc0.appspot.com",
  messagingSenderId: "498015207662",
  appId: "1:498015207662:web:b37c54adfced51a14db3ff",
};

//init firebase

initializeApp(firebaseConfig);

// //init firestore, storage

const db = getFirestore();

const storage = getStorage();

export { storage, db };
