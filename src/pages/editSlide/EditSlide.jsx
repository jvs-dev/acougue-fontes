import React, { useState, useEffect } from "react";
import "./EditSlide.css";
import Header from "../../components/header/Header";
import DisplaySection from "../../components/displaySection/DisplaySection";
import PromotionsSection from "../../components/promotionsSection/PromotionsSection";
import TipSection from "../../components/tipSection/TipSection";

function EditSlide() {
  // Estado para a Tela 1
  const [tela1State, setTela1State] = useState({
    imageUploads: [null], // Array para as imagens, null inicialmente
    meats: [
      {
        id: "t1_1",
        name: "Carne SN",
        options: ["Opções de carne", "CONTRA FILÉ", "ACEM", "COXÃO DE FORA"],
        selected: "CONTRA FILÉ",
      },
      {
        id: "t1_2",
        name: "ACEM",
        options: ["Opções de carne", "CONTRA FILÉ", "ACEM", "COXÃO DE FORA"],
        selected: "ACEM",
      },
      {
        id: "t1_3",
        name: "COXÃO DE FORA",
        options: ["Opções de carne", "CONTRA FILÉ", "ACEM", "COXÃO DE FORA"],
        selected: "COXÃO DE FORA",
      },
      {
        id: "t1_4",
        name: "Carne SN",
        options: ["Opções de carne", "CONTRA FILÉ", "ACEM", "COXÃO DE FORA"],
        selected: "Opções de carne",
      },
      {
        id: "t1_5",
        name: "Carne SN",
        options: ["Opções de carne", "CONTRA FILÉ", "ACEM", "COXÃO DE FORA"],
        selected: "Opções de carne",
      },
      {
        id: "t1_6",
        name: "Carne SN",
        options: ["Opções de carne", "CONTRA FILÉ", "ACEM", "COXÃO DE FORA"],
        selected: "Opções de carne",
      },
      {
        id: "t1_7",
        name: "Carne SN",
        options: ["Opções de carne", "CONTRA FILÉ", "ACEM", "COXÃO DE FORA"],
        selected: "Opções de carne",
      },
    ],
  });

  // Estado para a Tela 2
  const [tela2State, setTela2State] = useState({
    imageUploads: [null, null], // Array para 2 imagens
    meats: [
      {
        id: "t2_1",
        name: "Carne SN",
        options: ["Opções de carne", "CONTRA FILÉ", "ACEM", "COXÃO DE FORA"],
        selected: "CONTRA FILÉ",
      },
      {
        id: "t2_2",
        name: "ACEM",
        options: ["Opções de carne", "CONTRA FILÉ", "ACEM", "COXÃO DE FORA"],
        selected: "ACEM",
      },
      {
        id: "t2_3",
        name: "COXÃO DE FORA",
        options: ["Opções de carne", "CONTRA FILÉ", "ACEM", "COXÃO DE FORA"],
        selected: "COXÃO DE FORA",
      },
      {
        id: "t2_4",
        name: "Carne SN",
        options: ["Opções de carne", "CONTRA FILÉ", "ACEM", "COXÃO DE FORA"],
        selected: "Opções de carne",
      },
      {
        id: "t2_5",
        name: "Carne SN",
        options: ["Opções de carne", "CONTRA FILÉ", "ACEM", "COXÃO DE FORA"],
        selected: "Opções de carne",
      },
      {
        id: "t2_6",
        name: "Carne SN",
        options: ["Opções de carne", "CONTRA FILÉ", "ACEM", "COXÃO DE FORA"],
        selected: "Opções de carne",
      },
    ],
  });

  // Estado para Promoções
  const [promotionsState, setPromotionsState] = useState([
    {
      id: "promo1",
      name: "Carne SN",
      options: ["Opções de carne", "CONTRA FILÉ", "ACEM", "COXÃO DURO"],
      selected: "Opções de carne",
      discount: 20,
    },
    {
      id: "promo2",
      name: "Carne SN",
      options: ["Opções de carne", "CONTRA FILÉ", "ACEM", "COXÃO DURO"],
      selected: "Opções de carne",
      discount: 15,
    },
    {
      id: "promo3",
      name: "Carne SN",
      options: ["Opções de carne", "CONTRA FILÉ", "ACEM", "COXÃO DURO"],
      selected: "Opções de carne",
      discount: 30,
    },
  ]);

  // Dados para Dicas (não são inputs, então não precisam de estado dinâmico aqui)
  const tipCategories = {
    "BIFE GRELHADO": ["CONTRA FILÉ", "Patinho", "Bola de Pá"],
    "BIFE FRITO": ["CHÃ", "PATINHO"],
    STROGONOFF: ["BOLA DE PÁ"],
    "CARNE DE PANELA": ["Patinho", "Largato", "Lombinho", "Acém", "Peito"],
    ENSOPADO: ["CARNE MOÍDA"],
    "CARNE ASSADA": ["Alcatra", "Patinho", "Largarto", "Costela", "Maminha"],
    CHURRASCO: ["Alcatra", "Contra Filé", "Fraldinha", "Costela", "Picanha"],
  };

  // Funções de callback para atualizar o estado
  const handleMeatChange = (telaNum, meatId, newSelectedValue) => {
    if (telaNum === 1) {
      setTela1State((prevState) => ({
        ...prevState,
        meats: prevState.meats.map((meat) =>
          meat.id === meatId ? { ...meat, selected: newSelectedValue } : meat
        ),
      }));
    } else if (telaNum === 2) {
      setTela2State((prevState) => ({
        ...prevState,
        meats: prevState.meats.map((meat) =>
          meat.id === meatId ? { ...meat, selected: newSelectedValue } : meat
        ),
      }));
    }
  };

  const handleImageUploadChange = (telaNum, index, newFile) => {
    if (telaNum === 1) {
      setTela1State((prevState) => {
        const newUploads = [...prevState.imageUploads];
        newUploads[index] = newFile;
        return { ...prevState, imageUploads: newUploads };
      });
    } else if (telaNum === 2) {
      setTela2State((prevState) => {
        const newUploads = [...prevState.imageUploads];
        newUploads[index] = newFile;
        return { ...prevState, imageUploads: newUploads };
      });
    }
  };

  const handlePromotionChange = (promoId, type, value) => {
    setPromotionsState((prevState) =>
      prevState.map((promo) => {
        if (promo.id === promoId) {
          if (type === "select") {
            return { ...promo, selected: value };
          } else if (type === "discount") {
            return { ...promo, discount: Number(value) };
          }
        }
        return promo;
      })
    );
  };

  // useEffect para imprimir todos os dados sempre que algo mudar
  useEffect(() => {
    const allData = {
      tela1: tela1State,
      tela2: tela2State,
      promotions: promotionsState,
      // Dicas não são inputs, então podem ser incluídas aqui ou não, dependendo da necessidade
      tips: tipCategories,
    };
    console.log("--- DADOS ATUALIZADOS ---");
    console.log(allData);
    console.log("-------------------------");
  }, [tela1State, tela2State, promotionsState]); // Dependências: re-executa quando esses estados mudam

  return (
    <div className="main-dashboard-wrapper">
      <Header />
      <div className="dashboard-content">
        <DisplaySection
          title="TELA 1"
          meats={tela1State.meats}
          imageUploadCount={1}
          onMeatChange={(meatId, value) => handleMeatChange(1, meatId, value)}
          onImageUploadChange={(index, file) =>
            handleImageUploadChange(1, index, file)
          }
          currentImageFiles={tela1State.imageUploads} // Passa os arquivos atuais para o ImageUploadBox
        />
        <DisplaySection
          title="TELA 2"
          meats={tela2State.meats}
          imageUploadCount={2}
          onMeatChange={(meatId, value) => handleMeatChange(2, meatId, value)}
          onImageUploadChange={(index, file) =>
            handleImageUploadChange(2, index, file)
          }
          currentImageFiles={tela2State.imageUploads} // Passa os arquivos atuais para o ImageUploadBox
        />
        <PromotionsSection
          promotions={promotionsState}
          onPromotionChange={handlePromotionChange}
        />
        <TipSection tipCategories={tipCategories} />
      </div>
    </div>
  );
}

export default EditSlide;
