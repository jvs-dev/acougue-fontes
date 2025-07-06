import React, { useState } from "react";
import FirebaseConfig from "../../script/firebase/FirebaseConfig";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
const app = initializeApp(FirebaseConfig);
const db = getFirestore(app);
import "./MeatForm.css";
import MessageBox from "../messagebox/MessageBox";

function MeatForm() {
  const [meatName, setMeatName] = useState("");
  const [meatPrice, setMeatPrice] = useState("");
  const [measure, setMeasure] = useState("/Kg");
  const [meatCategory, setMeatCategory] = useState("Suíno");
  const [meatUtility, setMeatUtility] = useState("");
  const [meatImage, setMeatImage] = useState(null);
  const [status, setStatus] = useState(""); // Usado para feedback de envio
  const [statusType, setStatusType] = useState(""); // 'success' ou 'error'

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setMeatImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Enviando...");
    setStatusType("");
    addMeat(meatName, meatPrice, meatCategory, meatUtility, meatImage, measure);
  };

  async function addMeat(
    meatName,
    meatPrice,
    meatCategory,
    meatUtility,
    meatImage,
    measure
  ) {
    if (!meatName || !meatPrice || !meatCategory || !meatUtility || !measure) {
      setStatus("Por favor, preencha todos os campos obrigatórios.");
      setStatusType("error");
      return;
    }
    const item = {
      name: meatName,
      price: meatPrice,
      category: meatCategory,
      utitls: meatUtility,
      measure: measure,
    };
    try {
      const response = await addDoc(collection(db, "meats"), item);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao enviar a mensagem.");
      }
      setStatus("Mensagem enviada com sucesso!");
      setStatusType("success");
    } catch (error) {
      setStatus("Erro ao salvar dados. Tente novamente.");
      setStatusType("error");
      console.error("Erro no envio:", error);
    } finally {
      setTimeout(() => {
        setStatus("");
        setStatusType("");
      }, 5000);
    }
  }

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
        <label htmlFor="meatMeasure">SELECIONE A MEDIDA</label>
        <div className="select-wrapper">
          <select
            id="meatMeasure"
            value={measure}
            onChange={(e) => setMeasure(e.target.value)}
          >
            <option value="/Kg">Por quilo</option>
            <option value="/Und">Por Unidade</option>
            <option value="/Grama">Por grama</option>
          </select>
        </div>
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
            <p>CLIQUE PARA CARREGAR UMA IMAGEM</p>
          </label>
          {meatImage && <span className="file-name">{meatImage.name}</span>}
        </div>
        <p className="upload-info">
          <i className="fas fa-info-circle"></i> Upload your photo (.jpg or
          .png, max size 500kb)
        </p>
      </div>
      <button className="submitBtn" type="submit">
        Salvar
      </button>
      <MessageBox
        message={status}
        type={statusType}
        onClose={() => setStatus("")}
      />
    </form>
  );
}

export default MeatForm;
