import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import FirebaseConfig from "../firebase/FirebaseConfig";

const app = initializeApp(FirebaseConfig);
const db = getFirestore(app);

export default async function GetSlideData(slideId) {
  try {
    const docRef = doc(db, "slidePannel", slideId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log(`Documento '${slideId}' não encontrado no Firestore.`);
      return null;
    }
  } catch (error) {
    console.error(
      `Erro ao buscar dados do slide '${slideId}' do Firestore:`,
      error
    );
    throw error;
  }
}
