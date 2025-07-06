import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <img src="/logotipo.png" alt="Fontes Logo" />
      </div>
      <h1 className="header-title">PAINEL DE CARNES</h1>
      <div className="header-icons">
        <button className="icon-button">
          <ion-icon name="film-outline"></ion-icon>
        </button>
        <button className="icon-button">
          <img src="VideoEditIcon.svg" alt="Editar Filme" />
        </button>
        <button className="icon-button">
          <ion-icon name="menu"></ion-icon>
        </button>
      </div>
    </header>
  );
}

export default Header;
