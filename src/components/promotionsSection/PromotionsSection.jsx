import React from "react";
import "./PromotionsSection.css";

// Adicione onPromotionChange como prop
function PromotionsSection({ promotions, onPromotionChange }) {
  const handleSelectChange = (e, promoId) => {
    onPromotionChange(promoId, "select", e.target.value);
  };

  const handleDiscountChange = (e, promoId) => {
    // Certifique-se de que o valor seja um número
    const value = e.target.value === "" ? "" : Number(e.target.value);
    onPromotionChange(promoId, "discount", value);
  };

  return (
    <div className="promotions-section">
      <h2 className="section-title">PROMOÇÕES</h2>
      <div className="promotions-list">
        {promotions.map((promo) => (
          <div key={promo.id} className="promotion-item">
            <div className="select-wrapper">
              <select
                value={promo.selected} // Valor controlado pelo estado pai
                onChange={(e) => handleSelectChange(e, promo.id)} // Notifica o pai
              >
                {/* Garante que a opção atual esteja disponível, se não for uma das opções padrão */}
                {promo.selected && !promo.options.includes(promo.selected) && (
                  <option value={promo.selected}>{promo.selected}</option>
                )}
                {promo.options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="discount-input-wrapper">
              <span className="discount-label">Valor do desconto</span>
              <input
                type="number"
                className="discount-value-input"
                value={promo.discount} // Valor controlado pelo estado pai
                onChange={(e) => handleDiscountChange(e, promo.id)} // Notifica o pai
                step="1"
                min="0"
                max="100"
              />
              <span className="percentage-sign">%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PromotionsSection;
