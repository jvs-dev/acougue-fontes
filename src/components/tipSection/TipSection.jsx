// src/components/TipSection/TipSection.jsx
import React, { useState, useEffect } from 'react';
import './TipSection.css';
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import FirebaseConfig from "../../script/firebase/FirebaseConfig";

// Inicialize o Firebase App aqui ou passe como prop se já estiver inicializado em outro lugar
const app = initializeApp(FirebaseConfig);
const db = getFirestore(app);

function TipSection() {
  const [tipsData, setTipsData] = useState([]); // Estado para armazenar os dados das dicas
  const docId = "meatTipsData"; // ID fixo do documento no Firebase para as dicas

  useEffect(() => {
    const fetchTipsData = async () => {
      try {
        const docRef = doc(db, "slideData", docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();          
          const formattedData = Object.entries(data).map(([title, meats]) => ({
            title,
            meats
          }));
          setTipsData(formattedData);
        } else {
          console.log("Nenhum dado de dicas encontrado no Firebase. Usando valores padrão.");          
          setTipsData([
            { title: 'BIFE GRELHADO\nBIFE FRITO\nSTROGONOFF', meats: '' },
            { title: 'CARNE DE PANELA\nENSOPADO\nCARNE MOÍDA', meats: '' },
            { title: 'CARNE ASSADA', meats: '' },
            { title: 'CHURRASCO', meats: '' },
          ]);
        }
      } catch (error) {
        console.error("Erro ao buscar dados de dicas do Firebase:", error);
      }
    };

    fetchTipsData();
  }, []);

  const handleTitleChange = (index, newTitle) => {
    setTipsData(prevData => {
      const newData = [...prevData];
      newData[index].title = newTitle;
      return newData;
    });
  };

  const handleMeatsChange = (index, newMeats) => {
    setTipsData(prevData => {
      const newData = [...prevData];
      newData[index].meats = newMeats;
      return newData;
    });
  };

  const handleSaveTips = async () => {
    try {
      const docRef = doc(db, "slideData", docId);
      // Converte o array de objetos de volta para o formato de objeto para salvar no Firebase
      // [{ title: "Cat", meats: "Carne" }] para { "Cat": "Carne" }
      const dataToSave = tipsData.reduce((acc, item) => {
        acc[item.title] = item.meats;
        return acc;
      }, {});

      await setDoc(docRef, dataToSave);
      console.log("Dicas de carne salvas com sucesso no Firebase!");
      alert("Dicas de carne salvas com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar dicas de carne no Firebase:", error);
      alert("Erro ao salvar dicas de carne.");
    }
  };

  return (
    <div className="tip-section-manager"> {/* Container principal para o painel de gerenciamento */}
      <h2 className="tip-title">GERENCIAR DICAS DE CARNE:</h2> {/* Título para o gerenciamento */}
      <div className="tip-grid-editable">
        {tipsData.map((item, index) => (
          <div key={index} className="tip-column-editable">
            <label htmlFor={`title-${index}`}>Título da Categoria:</label>
            <textarea
              id={`title-${index}`}
              className="tip-column-title-textarea"
              value={item.title}
              onChange={(e) => handleTitleChange(index, e.target.value)}
              rows={3} // Número de linhas visíveis
            />
            <label htmlFor={`meats-${index}`}>Carnes (uma por linha):</label>
            <textarea
              id={`meats-${index}`}
              className="tip-meat-list-textarea"
              value={item.meats}
              onChange={(e) => handleMeatsChange(index, e.target.value)}
              rows={10} // Ajuste o número de linhas conforme necessário
            />
          </div>
        ))}
      </div>
      <button onClick={handleSaveTips} className="save-tips-button">
        Salvar
      </button>
    </div>
  );
}

export default TipSection;