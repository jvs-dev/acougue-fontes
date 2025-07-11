import React from "react";
import "./Slide2.css";

function Slide2({ meatsImageUrl, meatsData }) {
  return (
    <div
      className="slide2"
      style={{ backgroundImage: `url(./backgroundSlide1.png)` }}
    >
      <div className="smoke-effect"></div>
      <div className="slide2Container1">
        <img className="slide2Logotipo" src="./logotipo.png" alt="Logotipo" />
        <div className="slide2PromoCard active">
          <p className="promoCardName">Asinha de frango</p>
          <p className="promoCardPrice">R$ 19, 98</p>
        </div>
        <div className="slide2PromoCard">
          <p className="promoCardName">Asinha de frango</p>
          <p className="promoCardPrice">R$ 19, 98</p>
        </div>
        <div className="slide2PromoCard">
          <p className="promoCardName">Asinha de frango</p>
          <p className="promoCardPrice">R$ 19, 98</p>
        </div>
      </div>
      <div className="slide2Container2">
        <img
          className="slide2CenterImage"
          src={`${meatsImageUrl}`}
          alt="meatImage"
        />
      </div>
      <div className="slide2Container3">
        <img
          className="slide2NominativeLogo"
          src="./logo-nominativa.png"
          alt="logo nominativa"
        />
        <ul className="slide2PricesList">
          {meatsData.map((meat, index) => (
            <li key={index} className="slide2MeatLi">
              <p className="slide2MeatName">
                {meat.name.replace(" (PROMOÇÃO)", "")}
              </p>
              <span className="slide2MeatPrice">
                {meat.oldPrice && (
                  <span className="slide2PromoSpan">{meat.oldPrice}</span>
                )}
                {`${meat.price}`.replace(".", ",")}
                <span className="slide2MeatMeasure">{meat.measure}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Slide2;
