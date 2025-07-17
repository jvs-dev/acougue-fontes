import React, { useEffect, useState } from "react";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
const app = initializeApp(FirebaseConfig);
const db = getFirestore(app);
import FirebaseConfig from "../../script/firebase/FirebaseConfig";
import Header from "../../components/header/Header";
import MeatForm from "../../components/meatForm/MeatForm";
import "./Home.css";
import ListOfMeats from "../../components/listOfMeats/ListOfMeats";

const Home = () => {
  const [meats, setMeats] = useState([]);

  async function getData() {
    const querySnapshotMeats = await getDocs(collection(db, "meats"));
    const meatsArray = [];
    querySnapshotMeats.forEach((doc) => {
      meatsArray.push({ id: doc.id, ...doc.data() });
    });
    setMeats(meatsArray);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="dashboard-container">
      <Header />
      <div className="main-content">
        <MeatForm updateData={getData} />
        <ListOfMeats meats={meats} />
      </div>
    </div>
  );
};

export default Home;
