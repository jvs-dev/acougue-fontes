import React, { useState, useEffect, useCallback } from "react";
import FirebaseConfig from "../../script/firebase/FirebaseConfig";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc, // Importar getDoc para buscar o slide completo
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
const app = initializeApp(FirebaseConfig);
const db = getFirestore(app);
import Header from "../../components/header/Header";
import "./Settings.css";
import MessageBox from "../../components/messagebox/MessageBox";

const Settings = () => {
  const [slideTime, setSlideTime] = useState("");
  const [smokeEffect, setSmokeEffect] = useState("false");
  const [moveEffect, setMoveEffect] = useState("false");
  const [status, setStatus] = useState(""); // Usado para feedback de envio
  const [statusType, setStatusType] = useState(""); // 'success' ou 'error'

  useEffect(() => {
    async function loadData() {
      const docRef = doc(db, "settings", "customSlide");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSlideTime(docSnap.data().slideTime);
      }
    }
    loadData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Salvando...");
    setStatusType("");
    saveAllData();
  };

  const saveAllData = useCallback(async () => {
    const dataToSave = {
      slideTime: Number(slideTime),
      moveEffect: moveEffect == "true" ? true : false,
      smokeEffect: smokeEffect == "true" ? true : false,
    };

    try {
      await setDoc(doc(db, "settings", "customSlide"), dataToSave);
      console.log("Dados do Firestore salvos:", dataToSave);

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
  }, [slideTime, moveEffect, smokeEffect]); // Dependências do useCallback);

  return (
    <div className="main-dashboard-wrapper">
      <Header />
      <div className="dashboard-content">
        <h1 className="section-title">CONFIGURAÕES</h1>

        <form className="meat-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="slideTime">
              Tempo de exibição dos slides (segundos)
            </label>
            <input
              type="number"
              id="slideTime"
              placeholder="Digite o tempo de exibição dos slides"
              value={slideTime}
              onChange={(e) => setSlideTime(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="meatMeasure">Efeito de fumaça</label>
            <div className="select-wrapper">
              <select
                id="meatMeasure"
                value={smokeEffect}
                onChange={(e) => setSmokeEffect(e.target.value)}
              >
                <option value="true">Sim</option>
                <option value="false">Não</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="meatMeasure">Efeito de movimento(beta)</label>
            <div className="select-wrapper">
              <select
                id="meatMeasure"
                value={moveEffect}
                onChange={(e) => setMoveEffect(e.target.value)}
              >
                <option value="true">Sim</option>
                <option value="false">Não</option>
              </select>
            </div>
          </div>

          <button className="submitBtn" type="submit">
            Salvar
          </button>
          <MessageBox
            message={status}
            type={statusType}
            onClose={() => setStatus("")}
          />
        </form>
      </div>
    </div>
  );
};

export default Settings;
