import React, { useState, useEffect, useCallback } from "react";
import FirebaseConfig from "../../script/firebase/FirebaseConfig";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc, // Importar getDoc para buscar o slide completo
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { Client, Storage } from "appwrite";
import { ID } from "appwrite"; // Importar ID para gerar IDs únicos se necessário

const client = new Client()
  .setEndpoint("https://nyc.cloud.appwrite.io/v1")
  .setProject(`${import.meta.env.VITE_APPWRITE_PROJECT_ID}`);
const storage = new Storage(client);
const app = initializeApp(FirebaseConfig);
const db = getFirestore(app);

import "./EditSlide.css";
import Header from "../../components/header/Header";
import DisplaySection from "../../components/displaySection/DisplaySection";
import PromotionsSection from "../../components/promotionsSection/PromotionsSection";
import TipSection from "../../components/tipSection/TipSection";
import MessageBox from "../../components/messagebox/MessageBox";
import GetAllMeats from "../../script/meats/GetAllMeats";
import GetSlideData from "../../script/slide/GetSlideData"; // Importar a nova função

function EditSlide() {
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");

  const [availableMeats, setAvailableMeats] = useState([]);
  const [meatOptions, setMeatOptions] = useState(["Opções de carne"]);

  // Estados iniciais serão preenchidos após o fetch
  const [tela1State, setTela1State] = useState({
    imageUploads: [null],
    meats: [
      { id: "t1_1", selectedId: null, selected: "Opções de carne" },
      { id: "t1_2", selectedId: null, selected: "Opções de carne" },
      { id: "t1_3", selectedId: null, selected: "Opções de carne" },
      { id: "t1_4", selectedId: null, selected: "Opções de carne" },
      { id: "t1_5", selectedId: null, selected: "Opções de carne" },
      { id: "t1_6", selectedId: null, selected: "Opções de carne" },
      { id: "t1_7", selectedId: null, selected: "Opções de carne" },
    ],
  });

  const [tela2State, setTela2State] = useState({
    imageUploads: [null, null],
    meats: [
      { id: "t2_1", selectedId: null, selected: "Opções de carne" },
      { id: "t2_2", selectedId: null, selected: "Opções de carne" },
      { id: "t2_3", selectedId: null, selected: "Opções de carne" },
      { id: "t2_4", selectedId: null, selected: "Opções de carne" },
      { id: "t2_5", selectedId: null, selected: "Opções de carne" },
      { id: "t2_6", selectedId: null, selected: "Opções de carne" },
    ],
  });

  const [promotionsState, setPromotionsState] = useState([
    {
      id: "promo1",
      selectedId: null,
      selected: "Opções de carne",
      discount: 20,
    },
    {
      id: "promo2",
      selectedId: null,
      selected: "Opções de carne",
      discount: 15,
    },
    {
      id: "promo3",
      selectedId: null,
      selected: "Opções de carne",
      discount: 30,
    },
  ]);

  const tipCategories = {
    "BIFE GRELHADO": ["CONTRA FILÉ", "Patinho", "Bola de Pá"],
    "BIFE FRITO": ["CHÃ", "PATINHO"],
    STROGONOFF: ["BOLA DE PÁ"],
    "CARNE DE PANELA": ["Patinho", "Largato", "Lombinho", "Acém", "Peito"],
    ENSOPADO: ["CARNE MOÍDA"],
    "CARNE ASSADA": ["Alcatra", "Patinho", "Largarto", "Costela", "Maminha"],
    CHURRASCO: ["Alcatra", "Contra Filé", "Fraldinha", "Costela", "Picanha"],
  };

  // --- Função para CARREGAR DADOS SALVOS e CARNES DISPONÍVEIS ---
  useEffect(() => {
    const fetchDataAndPopulate = async () => {
      try {
        // 1. Carregar todas as carnes disponíveis do Firebase
        const meats = await GetAllMeats();
        setAvailableMeats(meats);
        const names = ["Opções de carne", ...meats.map((meat) => meat.name)];
        setMeatOptions(names);

        const savedSlideData = await GetSlideData("slidesData");

        if (savedSlideData) {
          // Atualizar tela1State com os dados salvos
          if (savedSlideData.tela1Meats) {
            setTela1State((prevState) => ({
              ...prevState,
              meats: prevState.meats.map((meatConfig) => {
                const savedMeat = savedSlideData.tela1Meats.find(
                  (sm) => sm.id === meatConfig.id
                );
                if (savedMeat) {
                  // Encontrar o nome da carne baseado no selectedId
                  const fullMeatData = meats.find(
                    (m) => m.id === savedMeat.selectedId
                  );
                  return {
                    ...meatConfig,
                    selectedId: savedMeat.selectedId,
                    selected: fullMeatData
                      ? fullMeatData.name
                      : "Opções de carne",
                  };
                }
                return meatConfig;
              }),
            }));
          }

          // Atualizar tela2State com os dados salvos
          if (savedSlideData.tela2Meats) {
            setTela2State((prevState) => ({
              ...prevState,
              meats: prevState.meats.map((meatConfig) => {
                const savedMeat = savedSlideData.tela2Meats.find(
                  (sm) => sm.id === meatConfig.id
                );
                if (savedMeat) {
                  const fullMeatData = meats.find(
                    (m) => m.id === savedMeat.selectedId
                  );
                  return {
                    ...meatConfig,
                    selectedId: savedMeat.selectedId,
                    selected: fullMeatData
                      ? fullMeatData.name
                      : "Opções de carne",
                  };
                }
                return meatConfig;
              }),
            }));
          }

          // Atualizar promotionsState com os dados salvos
          if (savedSlideData.promotions) {
            setPromotionsState((prevState) =>
              prevState.map((promoConfig) => {
                const savedPromo = savedSlideData.promotions.find(
                  (sp) => sp.id === promoConfig.id
                );
                if (savedPromo) {
                  const fullMeatData = meats.find(
                    (m) => m.id === savedPromo.selectedId
                  );
                  return {
                    ...promoConfig,
                    selectedId: savedPromo.selectedId,
                    selected: fullMeatData
                      ? fullMeatData.name
                      : "Opções de carne",
                    discount: savedPromo.discount,
                  };
                }
                return promoConfig;
              })
            );
          }
        } else {
          console.log(
            "Nenhum dado salvo para o slide encontrado, usando valores padrão."
          );
        }
      } catch (error) {
        console.error("Falha ao carregar dados iniciais:", error);
      }
    };
    fetchDataAndPopulate();
  }, []);

  const handleMeatChange = (telaNum, meatId, newSelectedName) => {
    const selectedMeat = availableMeats.find(
      (meat) => meat.name === newSelectedName
    );
    const newSelectedId = selectedMeat ? selectedMeat.id : null;

    const updateState = (prevState) => ({
      ...prevState,
      meats: prevState.meats.map((meat) =>
        meat.id === meatId
          ? { ...meat, selected: newSelectedName, selectedId: newSelectedId }
          : meat
      ),
    });

    if (telaNum === 1) {
      setTela1State(updateState);
    } else if (telaNum === 2) {
      setTela2State(updateState);
    }
  };

  const handleImageUploadChange = (telaNum, index, newFile) => {
    const updateImageState = (prevState) => {
      const newUploads = [...prevState.imageUploads];
      newUploads[index] = newFile;
      return { ...prevState, imageUploads: newUploads };
    };

    if (telaNum === 1) {
      setTela1State(updateImageState);
    } else if (telaNum === 2) {
      setTela2State(updateImageState);
    }
  };

  const handlePromotionChange = (promoId, type, value) => {
    setPromotionsState((prevState) =>
      prevState.map((promo) => {
        if (promo.id === promoId) {
          if (type === "select") {
            const selectedMeat = availableMeats.find(
              (meat) => meat.name === value
            );
            const newSelectedId = selectedMeat ? selectedMeat.id : null;
            return { ...promo, selected: value, selectedId: newSelectedId };
          } else if (type === "discount") {
            return { ...promo, discount: Number(value) };
          }
        }
        return promo;
      })
    );
  };

  const saveAllData = useCallback(async () => {
    const dataToSave = {
      tela1Meats: tela1State.meats.map(({ id, selectedId }) => ({
        id,
        selectedId,
      })),
      tela2Meats: tela2State.meats.map(({ id, selectedId }) => ({
        id,
        selectedId,
      })),
      promotions: promotionsState.map(({ id, selectedId, discount }) => ({
        id,
        selectedId,
        discount,
      })),
    };

    try {
      await setDoc(doc(db, "slidePannel", "slidesData"), dataToSave);
      console.log("Dados do Firestore salvos:", dataToSave);

      if (tela1State.imageUploads[0] instanceof File) {
        try {
          const response = await storage.createFile(
            `${import.meta.env.VITE_BUCKET_ID}`,
            "Slide1Image1",
            tela1State.imageUploads[0]
          );
          console.log("Imagem da Tela 1 salva no Appwrite:", response);
        } catch (uploadError) {
          console.error(
            "Erro ao fazer upload da imagem da Tela 1 para o Appwrite:",
            uploadError
          );
        }
      }
      if (tela2State.imageUploads[0] instanceof File) {
        try {
          const response = await storage.createFile(
            `${import.meta.env.VITE_BUCKET_ID}`,
            "Slide2Image1",
            tela2State.imageUploads[0]
          );
          console.log("Imagem 1 da Tela 2 salva no Appwrite:", response);
        } catch (uploadError) {
          console.error(
            "Erro ao fazer upload da imagem 1 da Tela 2 para o Appwrite:",
            uploadError
          );
        }
      }
      if (tela2State.imageUploads[1] instanceof File) {
        try {
          const response = await storage.createFile(
            `${import.meta.env.VITE_BUCKET_ID}`,
            "Slide2Image2",
            tela2State.imageUploads[1]
          );
          console.log("Imagem 2 da Tela 2 salva no Appwrite:", response);
        } catch (uploadError) {
          console.error(
            "Erro ao fazer upload da imagem 2 da Tela 2 para o Appwrite:",
            uploadError
          );
        }
      }
      // Repita para outras imagens (tela1State.imageUploads[1], tela2State.imageUploads[0], etc.)

      setStatus("Dados salvos com sucesso!");
      setStatusType("success");
    } catch (error) {
      setStatus("Erro ao salvar dados. Tente novamente.");
      setStatusType("error");
      console.error("Erro no envio:", error);
    } finally {
      setTimeout(() => {
        setStatus("");
        setStatusType("");
      }, 5000);
    }
  }, [tela1State, tela2State, promotionsState, storage, db]); // Dependências do useCallback

  useEffect(() => {
    // Usar uma flag ou verificar se o meatOptions já foi carregado
    if (meatOptions.length <= 1) {
      // Ou alguma outra condição para indicar que é a carga inicial
      return;
    }

    const timer = setTimeout(() => {
      console.log("Salvando dados...");
      saveAllData();
    }, 1500);

    return () => clearTimeout(timer); // Limpa o timer se o estado mudar novamente antes de salvar
  }, [tela1State, tela2State, promotionsState, saveAllData, meatOptions]);

  useEffect(() => {
    const allData = {
      tela1: tela1State,
      tela2: tela2State,
      promotions: promotionsState,
      tips: tipCategories,
      availableMeats: availableMeats.map(({ id, name }) => ({ id, name })),
    };
    console.log("--- ESTADO ATUALIZADO (para depuração) ---");
    console.log(allData);
    console.log("-------------------------");
  }, [tela1State, tela2State, promotionsState, availableMeats]);

  return (
    <div className="main-dashboard-wrapper">
      <Header />
      <div className="dashboard-content">
        <DisplaySection
          title="TELA 1"
          meats={tela1State.meats}
          meatOptions={meatOptions}
          imageUploadCount={1}
          onMeatChange={(meatId, value) => handleMeatChange(1, meatId, value)}
          onImageUploadChange={(index, file) =>
            handleImageUploadChange(1, index, file)
          }
          currentImageFiles={tela1State.imageUploads}
        />
        <DisplaySection
          title="TELA 2"
          meats={tela2State.meats}
          meatOptions={meatOptions}
          imageUploadCount={2}
          onMeatChange={(meatId, value) => handleMeatChange(2, meatId, value)}
          onImageUploadChange={(index, file) =>
            handleImageUploadChange(2, index, file)
          }
          currentImageFiles={tela2State.imageUploads}
        />
        <PromotionsSection
          promotions={promotionsState}
          meatOptions={meatOptions}
          onPromotionChange={handlePromotionChange}
        />
        <TipSection />
      </div>
      <MessageBox
        message={status}
        type={statusType}
        onClose={() => setStatus("")}
      />
    </div>
  );
}

export default EditSlide;
