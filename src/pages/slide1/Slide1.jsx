import React from "react";
import "./Slide1.css";

function Slide1({ meatsImageUrl, meatsData, smoke }) {
  return (
    <div
      className="price-slide-container"
      style={{ backgroundImage: `url(./backgroundSlide1.png)` }}
    >
      {smoke == true && <div className="smoke-effect"></div>}
      <div className="slide1Container">
        <div className="slide1ImagesContainer">
          <img className="slide1Logo" src="./logo-nominativa.png" alt="" />
          <div className="slide1ImageMask"></div>
          <img className="slide1Image" src={`${meatsImageUrl}`} alt="" />
        </div>
        <div className="slide1PricesContainer">
          <img className="slide1BackgroundLogo" src="./simbolo.png" alt="" />
          <ul className="slide1PricesList">
            {meatsData.map((meat, index) => (
              <li key={index} className="slide1MeatLi">
                <p className="slide1MeatName">
                  {meat.name.replace(" (PROMOÇÃO)", "")}
                </p>
                <span className="slide1MeatPrice">
                  {meat.oldPrice && (
                    <span className="slide1PromoSpan">{meat.oldPrice}</span>
                  )}
                  {`${meat.price}`.replace(".", ",")}
                  <span className="slide1MeatMeasure">{meat.measure}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Slide1;
