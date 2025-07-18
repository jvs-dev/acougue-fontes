// src/components/DisplayTipSection/DisplayTipSection.jsx
import React, { useState, useEffect } from "react";
import "./SlideTips.css"; // Crie um CSS específico para exibição
import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import FirebaseConfig from "../../script/firebase/FirebaseConfig";

const app = initializeApp(FirebaseConfig);
const db = getFirestore(app);
const docId = "meatTipsData"; // ID fixo do documento no Firebase para as dicas

function SlideTips() {
  const [tipsDisplayData, setTipsDisplayData] = useState([]);

  useEffect(() => {
    const fetchTipsData = async () => {
      try {
        const docRef = doc(db, "slideData", docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          // Formata os dados para exibição (split por nova linha)
          const formattedData = Object.entries(data).map(
            ([title, meatsString]) => ({
              title: title.split("\n"), // Dividir o título em linhas
              meats: meatsString
                .split("\n")
                .filter((line) => line.trim() !== ""), // Dividir carnes por linha
            })
          );
          setTipsDisplayData(formattedData);
        } else {
          console.log("Nenhum dado de dicas para exibição encontrado.");
          setTipsDisplayData([]); // Ou dados padrão para exibição
        }
      } catch (error) {
        console.error("Erro ao buscar dados de dicas para exibição:", error);
      }
    };
    fetchTipsData();
  }, []);

  // Nomes das colunas da tabela para exibição (pode ser hardcoded ou baseado em tipsDisplayData)
  const categories = [
    { titleLines: ["BIFE GRELHADO", "BIFE FRITO", "STROGONOFF"] },
    { titleLines: ["CARNE DE PANELA", "ENSOPADO", "CARNE MOÍDA"] },
    { titleLines: ["CARNE ASSADA"] },
    { titleLines: ["CHURRASCO"] },
  ];

  // Função para pegar as carnes para exibição na célula
  const getMeatsForDisplayCell = (categoryTitleLines, rowIndex) => {
    // Encontra a categoria correspondente nos dados carregados
    const categoryData = tipsDisplayData.find(
      (item) => item.title.join("\n") === categoryTitleLines.join("\n") // Compara títulos inteiros
    );
    if (categoryData && categoryData.meats[rowIndex]) {
      return categoryData.meats[rowIndex];
    }
    return "";
  };

  // Encontra o número máximo de linhas em qualquer categoria
  const maxRows = Math.max(
    ...tipsDisplayData.map((item) => item.meats.length),
    0
  );

  return (
    <div className="slide3BoxFormatter">
      <img
        className="slide3BackImage"
        src="./slide3Background.png"
        alt="background"
      />
      <div className="slide3-container">
        <h2 className="slide3Title">DICA DE QUAL CARNE USAR:</h2>
        <div className="display-tip-table-wrapper">
          <table>
            <thead>
              <tr>
                {categories.map((category, index) => (
                  <th key={index}>
                    {category.titleLines.map((line, i) => (
                      <span key={i}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: maxRows }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {categories.map((category, colIndex) => (
                    <td key={colIndex}>
                      {getMeatsForDisplayCell(category.titleLines, rowIndex)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SlideTips;
