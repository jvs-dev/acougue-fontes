import React, { useState } from 'react';
import './MeatForm.css';

function MeatForm() {
  const [meatName, setMeatName] = useState('');
  const [meatPrice, setMeatPrice] = useState('');
  const [meatCategory, setMeatCategory] = useState('Suíno');
  const [meatUtility, setMeatUtility] = useState('');
  const [meatImage, setMeatImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setMeatImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ meatName, meatPrice, meatCategory, meatUtility, meatImage });
    // In a real application, you would send this data to an API
  };

  return (
    <form className="meat-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="meatName">DIGITE O NOME</label>
        <input
          type="text"
          id="meatName"
          placeholder="Digite o nome da carne..."
          value={meatName}
          onChange={(e) => setMeatName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="meatPrice">DIGITE O PREÇO</label>
        <input
          type="number"
          id="meatPrice"
          placeholder="Digite o preço da carne..."
          value={meatPrice}
          onChange={(e) => setMeatPrice(e.target.value)}
          step="0.01"
        />
      </div>

      <div className="form-group">
        <label htmlFor="meatCategory">SELECIONE A CATEGORIA</label>
        <div className="select-wrapper">
          <select
            id="meatCategory"
            value={meatCategory}
            onChange={(e) => setMeatCategory(e.target.value)}
          >
            <option value="Suíno">Suíno</option>
            <option value="Bovino">Bovino</option>
            <option value="Frango">Frango</option>
            <option value="Peixe">Peixe</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="meatUtility">DIGITE A UTILIDADE</label>
        <input
          type="text"
          id="meatUtility"
          placeholder="Churrasco, Sopa"
          value={meatUtility}
          onChange={(e) => setMeatUtility(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>IMAGEM DA CARNE</label>
        <div className="image-upload-box">
          <input
            type="file"
            id="imageUpload"
            accept="image/png, image/jpeg, image/gif"
            onChange={handleImageChange}
            hidden
          />
          <label htmlFor="imageUpload" className="upload-button">
            <i className="fas fa-cloud-upload-alt"></i>
            CLIQUE PARA CARREGAR UMA IMAGEM
          </label>
          {meatImage && <span className="file-name">{meatImage.name}</span>}
        </div>
        <p className="upload-info">
          <i className="fas fa-info-circle"></i> Upload your photo (.jpg or .png, max size 500kb)
        </p>
      </div>
    </form>
  );
}

export default MeatForm;