import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import FirebaseConfig from "../firebase/FirebaseConfig";
const app = initializeApp(FirebaseConfig);
const db = getFirestore(app);

export default async function GetAllMeats() {
  try {
    const querySnapshotMeats = await getDocs(collection(db, "meats"));
    const meatsArray = [];
    querySnapshotMeats.forEach((doc) => {
      meatsArray.push({ id: doc.id, ...doc.data() });
    });
    return meatsArray;
  } catch (error) {
    console.error("Erro ao buscar carnes do Firestore:", error);
    throw error;
  }
}
