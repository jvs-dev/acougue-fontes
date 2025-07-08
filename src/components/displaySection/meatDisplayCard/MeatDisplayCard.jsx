import React from "react";
import "./MeatDisplayCard.css";

// Adicione onMeatChange como prop
function MeatDisplayCard({ meat, onMeatChange }) {
  const handleChange = (e) => {
    onMeatChange(meat.id, e.target.value); // Notifica o pai com o ID da carne e o novo valor
  };

  return (
    <div className="meat-display-card">
      <div className="select-wrapper">
        <select
          value={meat.selected} // Valor controlado pelo estado pai
          onChange={handleChange} // Chama a função handleChange no pai
        >
          {/* Garante que a opção atual esteja disponível, se não for uma das opções padrão */}
          {meat.selected && !meat.options.includes(meat.selected) && (
            <option value={meat.selected}>{meat.selected}</option>
          )}
          {meat.options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default MeatDisplayCard;
