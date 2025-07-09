import React from "react";
import "./PromotionsSection.css";

function PromotionsSection({ promotions, meatOptions, onPromotionChange }) {
  const handleSelectChange = (e, promoId) => {
    onPromotionChange(promoId, "select", e.target.value);
  };

  const handleDiscountChange = (e, promoId) => {
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
                value={promo.selected}
                onChange={(e) => handleSelectChange(e, promo.id)}
              >
                {meatOptions.map(
                  (
                    option,
                    index // Renderiza as opções do Firebase
                  ) => (
                    <option
                      key={
                        option === "Opções de carne"
                          ? `default-${index}`
                          : option
                      }
                      value={option}
                    >
                      {option}
                    </option>
                  )
                )}

                {!meatOptions.includes(promo.selected) &&
                  promo.selected !== "Opções de carne" && (
                    <option value={promo.selected}>{promo.selected}</option>
                  )}
              </select>
            </div>
            <div className="discount-input-wrapper">
              <span className="discount-label">Valor do desconto</span>
              <input
                type="number"
                className="discount-value-input"
                value={promo.discount}
                onChange={(e) => handleDiscountChange(e, promo.id)}
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
