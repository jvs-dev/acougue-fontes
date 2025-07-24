import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  const [rote, setRote] = useState("");

  useEffect(() => {
    setRote(`${window.location.pathname}`);
  }, []);

  return (
    <header className="header">
      <div className="header-logo">
        <img src="/logotipo.png" alt="Fontes Logo" />
      </div>
      <h1 className="header-title">PAINEL DE CARNES</h1>
      <div className="header-icons">
        <Link to="/play" className="icon-button">
          <ion-icon name="film-outline"></ion-icon>
        </Link>
        {rote == "/edit" ? (
          <Link to="/" className="icon-button">
            <ion-icon name="home"></ion-icon>
          </Link>
        ) : (
          <Link to="/edit" className="icon-button">
            <img src="VideoEditIcon.svg" alt="Editar Filme" />
          </Link>
        )}

        {rote == "/settings" ? (
          <Link to="/" className="icon-button">
            <ion-icon name="home"></ion-icon>
          </Link>
        ) : (
          <Link to="/settings" className="icon-button">
            <ion-icon name="settings-sharp"></ion-icon>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
