import React from 'react';
import './TipSection.css';

function TipSection({ tipCategories }) {
  return (
    <div className="tip-section">
      <h2 className="tip-title">DICA DE QUAL CARNE USAR:</h2>
      <div className="tip-grid">
        {Object.entries(tipCategories).map(([category, meats]) => (
          <div key={category} className="tip-column">
            <h3 className="tip-column-title">{category}</h3>
            <ul className="tip-meat-list">
              {meats.map((meat, index) => (
                <li key={index}>{meat}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TipSection;