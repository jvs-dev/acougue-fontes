import React from "react";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import FirebaseConfig from "../../script/firebase/FirebaseConfig";
import Header from "../../components/header/Header";
import MeatForm from "../../components/MeatForm";
import MeatList from "../../components/MeatList";
import "./Home.css";
const app = initializeApp(FirebaseConfig);
const db = getFirestore(app);

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
      image: "/images/contra-file.png", // Placeholder for image
    },
    {
      id: 2,
      name: "CONTRA FILÉ",
      price: 24.9,
      category: "Bovino",
      utility: ["Churrasco", "Feijoada"],
      image: "/images/contra-file.png",
    },
    {
      id: 3,
      name: "CONTRA FILÉ",
      price: 24.9,
      category: "Bovino",
      utility: ["Churrasco", "Feijoada"],
      image: "/images/contra-file.png",
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
