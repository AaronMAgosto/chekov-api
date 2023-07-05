import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import cred from "../cred.js";

// connects us to our firebase project
initializeApp({
  credential: cert(cred)
});

export default getFirestore() //connects to our db