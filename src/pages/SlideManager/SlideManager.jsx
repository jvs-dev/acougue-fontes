import React, { useState, useEffect } from "react";
import "./SlideManager.css";
import Slide1 from "../slide1/Slide1";
import { Client, Storage } from "appwrite";
import FirebaseConfig from "../../script/firebase/FirebaseConfig";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import GetAllMeats from "../../script/meats/GetAllMeats";
import GetSlideData from "../../script/slide/GetSlideData";
const app = initializeApp(FirebaseConfig);
const db = getFirestore(app);
const client = new Client();
const storage = new Storage(client);

client
  .setEndpoint("https://nyc.cloud.appwrite.io/v1")
  .setProject(`${import.meta.env.VITE_APPWRITE_PROJECT_ID}`);
const slide1image1 = storage.getFileDownload(
  `${import.meta.env.VITE_BUCKET_ID}`,
  "Slide1Image1"
);

function SlideManager() {
  const timeToSlide = 10000;
  const [priceMeatsData, setPriceMeatsData] = useState([]);
  const [availableMeats, setAvailableMeats] = useState([]);
  const [slideActive, setSlideActive] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allMeats = await GetAllMeats();
        setAvailableMeats(allMeats);
        const savedSlideData = await GetSlideData("slidesData");

        if (savedSlideData) {
          const combinedMeats = [];
          if (savedSlideData.tela1Meats) {
            savedSlideData.tela1Meats.forEach((meatItem) => {
              const fullMeatData = allMeats.find(
                (meat) => meat.id === meatItem.selectedId
              );
              if (fullMeatData) {
                combinedMeats.push({
                  name: fullMeatData.name,
                  price: `R$ ${fullMeatData.price.toFixed(2)}`,
                  measure: fullMeatData.measure || "/KG",
                });
              }
            });
          }
          if (savedSlideData.tela2Meats) {
            savedSlideData.tela2Meats.forEach((meatItem) => {
              const fullMeatData = allMeats.find(
                (meat) => meat.id === meatItem.selectedId
              );
              if (fullMeatData) {
                combinedMeats.push({
                  name: fullMeatData.name,
                  price: `R$ ${fullMeatData.price.toFixed(2)}`,
                  measure: fullMeatData.measure || "/KG",
                });
              }
            });
          }
          if (savedSlideData.promotions) {
            savedSlideData.promotions.forEach((promoItem) => {
              const fullMeatData = allMeats.find(
                (meat) => meat.id === promoItem.selectedId
              );
              if (fullMeatData) {
                const originalPrice = fullMeatData.price;
                const discountAmount =
                  originalPrice * (promoItem.discount / 100);
                const discountedPrice = originalPrice - discountAmount;

                combinedMeats.push({
                  name: `${fullMeatData.name} (PROMOÇÃO)`,
                  price: `R$ ${discountedPrice.toFixed(2)}`,
                  oldPrice: `R$ ${originalPrice.toFixed(2)}`,
                  measure: fullMeatData.measure || "/KG",
                });
              }
            });
          }
          setPriceMeatsData(combinedMeats);
        } else {
          console.log(
            "Nenhum dado salvo para o slide 'slidesData' encontrado."
          );
        }
      } catch (error) {
        console.error("Erro ao carregar dados para o SlideManager:", error);
      }
    };
    setInterval(() => {
      switch (slideActive) {
        case 1:
          setSlideActive(2);
          break;
        case 2:
          setSlideActive(3);
          break;
        case 3:
          setSlideActive(1);
          break;
        default:
          setSlideActive(1);
          break;
      }
    }, timeToSlide);
    fetchData();
  }, []);

  return (
    <div className="slideManagerDiv">
      <Slide1 meatsImageUrl={slide1image1} meatsData={priceMeatsData} />
    </div>
  );
}

export default SlideManager;
