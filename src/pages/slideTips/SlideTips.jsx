import React from "react";
import "./SlideTips.css"; // Crie um CSS específico para exibição

function SlideTips({ tipsDisplayData }) {
  // `tipsDisplayData` agora virá do SlideManager já formatado
  // para ser um array de objetos como:
  // [
  //   { titleLines: ["BIFE GRELHADO", "BIFE FRITO", "STROGONOFF"], meats: ["alcatra", "contra filé", ...] },
  //   { titleLines: ["CARNE ASSADA"], meats: ["alcatra", "patinho", ...] }
  // ]

  // Garante que tipsDisplayData não é null e é um array antes de processar
  const displayColumns = tipsDisplayData || [];

  // Encontra o número máximo de linhas em qualquer coluna de carne
  const maxRows = Math.max(
    ...displayColumns.map((column) => column.meats.length),
    0
  );

  // Função para pegar as carnes para exibição na célula
  // Simplificada, pois displayColumns já está formatado por coluna
  const getMeatsForDisplayCell = (columnIndex, rowIndex) => {
    if (
      displayColumns[columnIndex] &&
      displayColumns[columnIndex].meats[rowIndex]
    ) {
      return displayColumns[columnIndex].meats[rowIndex];
    }
    return "";
  };

  return (
    <div className="slide3BoxFormatter" style={{backgroundImage: "url(./slide3Backgroundwrapp.png)"}}>
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
                {/* Cabeçalhos são renderizados dinamicamente a partir de displayColumns */}
                {displayColumns.map((column, index) => (
                  <th key={index}>
                    {column.titleLines.map((line, i) => (
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
                  {/* Células são renderizadas com base no índice da coluna e da linha */}
                  {displayColumns.map((column, colIndex) => (
                    <td key={colIndex}>
                      {getMeatsForDisplayCell(colIndex, rowIndex)}
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
