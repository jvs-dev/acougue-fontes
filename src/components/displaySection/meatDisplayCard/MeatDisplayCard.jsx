import React from "react";
import "./MeatDisplayCard.css";

function MeatDisplayCard({ meat, meatOptions, onMeatChange }) {
  const handleChange = (e) => {
    onMeatChange(meat.id, e.target.value);
  };

  return (
    <div className="meat-display-card">
      <div className="select-wrapper">
        <select value={meat.selected} onChange={handleChange}>
          {meatOptions.map(
            (
              option,
              index // Renderiza as opções do Firebase
            ) => (
              <option
                key={option === "Opções de carne" ? `default-${index}` : option}
                value={option}
              >
                {option}
              </option>
            )
          )}
          {!meatOptions.includes(meat.selected) &&
            meat.selected !== "Opções de carne" && (
              <option value={meat.selected}>{meat.selected}</option>
            )}
        </select>
      </div>
    </div>
  );
}

export default MeatDisplayCard;
