import React from "react";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
const app = initializeApp(FirebaseConfig);
const db = getFirestore(app);
import FirebaseConfig from "../../script/firebase/FirebaseConfig";
import Header from "../../components/header/Header";
import MeatForm from "../../components/meatForm/MeatForm";
import MeatList from "../../components/MeatList/MeatList";
import "./Home.css";

if (db) {
  console.log("ok");
}

const Home = () => {
  const meats = [
    {
      id: 1,
      name: "CONTRA FILÉ",
      price: 24.9,
      category: "Bovino",
      utility: ["Churrasco", "Feijoada"],
      image: "",
    },
    {
      id: 2,
      name: "CONTRA FILÉ",
      price: 24.9,
      category: "Bovino",
      utility: ["Churrasco", "Feijoada"],
      image: "",
    },
    {
      id: 3,
      name: "CONTRA FILÉ",
      price: 24.9,
      category: "Bovino",
      utility: ["Churrasco", "Feijoada"],
      image: "",
    },
  ];

  return (
    <div className="dashboard-container">
      <Header />
      <div className="main-content">
        <MeatForm />
        <MeatList meats={meats} />
      </div>      
    </div>
  );
};

export default Home;
