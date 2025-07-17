// src/components/slide3/Slide3.jsx
import React from "react";
import "./Slide3.css";

function Slide3({ meatsDataForTips }) {
  // Nomes das colunas da tabela, correspondendo às categorias da imagem
  const categories = [
    {
      title: "BIFE GRELHADO\nBIFE FRITO\nSTROGONOFF",
      filterKeys: ["Bife Grelhado", "Bife Frito", "Strogonoff"],
    },
    {
      title: "CARNE DE PANELA\nENSOPADO\nCARNE MOÍDA",
      filterKeys: ["Carne de Panela", "Ensopado", "Carne Moída"],
    },
    { title: "CARNE ASSADA", filterKeys: ["Carne Assada"] },
    { title: "CHURRASCO", filterKeys: ["Churrasco"] },
  ];

  // Função para obter todas as carnes que se encaixam nas filterKeys para uma categoria
  const getMeatsForCategory = (filterKeys) => {
    const uniqueMeats = new Set();
    meatsDataForTips.forEach((meat) => {
      // Verifica se a carne tem o campo 'utitls' e se seu valor está incluído nas filterKeys
      if (meat.utitls && filterKeys.includes(meat.utitls)) {
        uniqueMeats.add(meat.name);
      }
    });
    return Array.from(uniqueMeats);
  };

  // Determinar o número máximo de itens em qualquer categoria para renderizar as linhas da tabela
  const maxItems = Math.max(
    ...categories.map((cat) => getMeatsForCategory(cat.filterKeys).length)
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
        <div className="slide3-table-wrapper">
          <table>
            <thead>
              <tr>
                {categories.map((category, index) => (
                  <th key={index}>
                    {category.title.split("\n").map((line, i) => (
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
              {Array.from({ length: maxItems }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {categories.map((category, colIndex) => {
                    const meatsInThisCategory = getMeatsForCategory(
                      category.filterKeys
                    );
                    const meatName = meatsInThisCategory[rowIndex] || "";

                    return <td key={colIndex}>{meatName}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Slide3;
