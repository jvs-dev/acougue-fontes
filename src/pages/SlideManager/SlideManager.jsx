import React, { useState, useEffect } from "react";
import "./SlideManager.css";
import { Client, Storage } from "appwrite";
import FirebaseConfig from "../../script/firebase/FirebaseConfig";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import GetAllMeats from "../../script/meats/GetAllMeats";
import GetSlideData from "../../script/slide/GetSlideData";
import Slide1 from "../slide1/Slide1";
import Slide2 from "../slide2/Slide2";
import SlideTips from "../slideTips/SlideTips";

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
const slide2image1 = storage.getFileDownload(
  `${import.meta.env.VITE_BUCKET_ID}`,
  "Slide2Image1"
);

function SlideManager() {
  const [settingsData, setSettingsData] = useState({});
  const [priceMeatsData, setPriceMeatsData] = useState([]);
  const [availableMeats, setAvailableMeats] = useState([]);
  const [slideActive, setSlideActive] = useState(1);
  const [slideAnimation, setSlideAnimation] = useState(false);
  const [tipsDisplayData, setTipsDisplayData] = useState(null);

  // Mapeamento explícito das chaves do Firebase para os títulos de exibição formatados.
  // Esta é a forma de transformar "Bife grelhadoBife fritostrogonoff" em ["BIFE GRELHADO", "BIFE FRITO", "STROGONOFF"].
  // Se os títulos puderem ser alterados pelo painel de administração, essa lista precisará ser dinâmica
  // ou os títulos devem ser salvos no Firebase já no formato de exibição.
  const firebaseKeyToDisplayTitleMap = {
    bifegrelhadobifefritostrogonoff: [
      "BIFE GRELHADO",
      "BIFE FRITO",
      "STROGONOFF",
    ],
    "carnedepanelaensopadocarne moída": [
      "CARNE DE PANELA",
      "ENSOPADO",
      "CARNE MOÍDA",
    ],
    "carne assada": ["CARNE ASSADA"],
    churrasco: ["CHURRASCO"],
  };

  useEffect(() => {
    const fetchTipsData = async () => {
      try {
        const docRef = doc(db, "slideData", "meatTipsData");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const formattedData = Object.entries(data).map(
            ([firebaseKey, meatsString]) => {
              // Obtém as linhas de título formatadas usando o mapa, ou um fallback
              const displayTitleLines = firebaseKeyToDisplayTitleMap[
                firebaseKey
              ] || [firebaseKey.toUpperCase()];

              return {
                titleLines: displayTitleLines, // Título formatado para exibição
                meats: meatsString
                  .split(",") // Divide as carnes por vírgula (como no Firebase)
                  .map((line) => line.trim()) // Remove espaços em branco
                  .filter((line) => line !== ""), // Remove strings vazias
              };
            }
          );
          setTipsDisplayData(formattedData);
          console.log(
            "Dados das dicas formatados para SlideTips:",
            formattedData
          ); // Para depuração
        } else {
          console.log("Nenhum dado de dicas para exibição encontrado.");
          setTipsDisplayData([]); // Define como array vazio se não houver dados
        }
      } catch (error) {
        console.error("Erro ao buscar dados de dicas para exibição:", error);
      }
    };
    fetchTipsData();
  }, []);

  useEffect(() => {
    if (slideAnimation) {
      document.querySelector("body").style.overflow = "hidden";
      const timer = setTimeout(() => {
        setSlideAnimation(false);
        document.querySelector("body").style.overflow = "";
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [slideAnimation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allMeats = await GetAllMeats();
        setAvailableMeats(allMeats);
        const savedSlideData = await GetSlideData("slidesData");
        if (savedSlideData) {
          const combinedMeats = [];
          const processedMeatIds = new Set(); // Para controlar IDs de carne já adicionados

          // Helper para adicionar carne com slideShow
          const addMeatToCombined = (meatItem, slideNum) => {
            const fullMeatData = allMeats.find(
              (meat) => meat.id === meatItem.selectedId
            );

            if (fullMeatData) {
              // Verifica se a carne já foi adicionada para combinar o slidesShow
              const existingMeatIndex = combinedMeats.findIndex(
                (item) => item.id === fullMeatData.id // Supondo que 'fullMeatData.id' seja único entre as carnes
              );

              if (existingMeatIndex !== -1) {
                // Se a carne já existe, adiciona o número do slide ao array slidesShow
                if (
                  !combinedMeats[existingMeatIndex].slidesShow.includes(
                    slideNum
                  )
                ) {
                  combinedMeats[existingMeatIndex].slidesShow.push(slideNum);
                  combinedMeats[existingMeatIndex].slidesShow.sort(
                    (a, b) => a - b
                  ); // Mantém a ordem
                }
              } else {
                // Se a carne não existe, adiciona como um novo item
                combinedMeats.push({
                  id: fullMeatData.id, // Adiciona o ID da carne para referência
                  name: fullMeatData.name,
                  price: `R$ ${fullMeatData.price.toFixed(2)}`,
                  measure: fullMeatData.measure || "/KG",
                  slidesShow: [slideNum], // Inicializa com o slide atual
                });
                processedMeatIds.add(fullMeatData.id);
              }
            }
          };

          // Adicionar carnes da Tela 1
          if (savedSlideData.tela1Meats) {
            savedSlideData.tela1Meats.forEach((meatItem) => {
              addMeatToCombined(meatItem, 1);
            });
          }

          // Adicionar carnes da Tela 2
          if (savedSlideData.tela2Meats) {
            savedSlideData.tela2Meats.forEach((meatItem) => {
              // Verifica se a carne já foi adicionada pela Tela 1
              const fullMeatData = allMeats.find(
                (meat) => meat.id === meatItem.selectedId
              );
              if (fullMeatData && processedMeatIds.has(fullMeatData.id)) {
                // Se já processado pela Tela 1, apenas atualiza o slidesShow
                const existingMeat = combinedMeats.find(
                  (item) => item.id === fullMeatData.id
                );
                if (existingMeat && !existingMeat.slidesShow.includes(2)) {
                  existingMeat.slidesShow.push(2);
                  existingMeat.slidesShow.sort((a, b) => a - b);
                }
              } else {
                // Se não processado ainda, adiciona como novo
                addMeatToCombined(meatItem, 2);
              }
            });
          }

          if (savedSlideData.promotions) {
            savedSlideData.promotions.forEach((promoItem) => {
              combinedMeats.forEach((meat) => {
                if (meat.id == promoItem.selectedId) {
                  /* console.log(promoItem); */
                  let discountedPrice =
                    Number(`${meat.price}`.replace("R$ ", "")) -
                    (Number(`${meat.price}`.replace("R$ ", "")) *
                      promoItem.discount) /
                      100;
                  meat.name += " (PROMOÇÃO)";
                  meat.oldPrice = meat.price;
                  meat.price = `R$ ${discountedPrice.toFixed(2)}`;
                }
              });
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

    let intervalId;

    async function loadData() {
      const docRef = doc(db, "settings", "customSlide");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSettingsData(docSnap.data());
        let time = docSnap.data().slideTime * 1000;
        intervalId = setInterval(() => {
          setSlideAnimation(true);
          setTimeout(() => {
            setSlideActive((prevSlideActive) => {
              switch (prevSlideActive) {
                case 1:
                  return 2;
                case 2:
                  return 3;
                case 3:
                  return 1;
                default:
                  return 1;
              }
            });
          }, 1000);
        }, time);
      }
    }

    document.addEventListener("keydown", function (event) {
      const tecla = event.keyCode;

      if (tecla >= 48 && tecla <= 57) {
        const numero = tecla - 48;
        if (numero == 1 || numero == 2 || numero == 3) {
          setSlideActive(numero);
        }
      } else if (event.key === "Enter") {
        setSlideActive((prevSlideActive) => {
          switch (prevSlideActive) {
            case 1:
              return 2;
            case 2:
              return 3;
            case 3:
              return 1;
            default:
              return 1;
          }
        });
      }      
    });

    fetchData();
    loadData();
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="slideManagerDiv">
      {slideAnimation && (
        <div className="transitionDiv">
          <img src="./simbolo.png" alt="Logo" />
        </div>
      )}
      {slideActive == 1 && (
        <Slide1
          smoke={settingsData.smokeEffect}
          meatsImageUrl={slide1image1}
          meatsData={priceMeatsData.filter((meat) =>
            meat.slidesShow.includes(1)
          )}
        />
      )}
      {slideActive == 2 && (
        <Slide2
          smoke={settingsData.smokeEffect}
          meatsImageUrl={slide2image1}
          meatsData={priceMeatsData.filter((meat) =>
            meat.slidesShow.includes(2)
          )}
        />
      )}
      {slideActive == 3 && <SlideTips tipsDisplayData={tipsDisplayData} />}
    </div>
  );
}

export default SlideManager;
