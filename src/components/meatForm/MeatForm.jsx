import React, { useEffect, useState } from "react";
import FirebaseConfig from "../../script/firebase/FirebaseConfig";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { Client, Storage } from "appwrite";
const client = new Client()
  .setEndpoint("https://nyc.cloud.appwrite.io/v1")
  .setProject(`${import.meta.env.VITE_APPWRITE_PROJECT_ID}`);
const storage = new Storage(client);
const app = initializeApp(FirebaseConfig);
const db = getFirestore(app);
import "./MeatForm.css";
import MessageBox from "../messagebox/MessageBox";

function MeatForm({ updateData }) {
  const [meatName, setMeatName] = useState("");
  const [meatPrice, setMeatPrice] = useState("");
  const [meatMeasure, setMeatMeasure] = useState("/Kg");
  const [meatCategory, setMeatCategory] = useState("Suíno");
  const [specCategory, setSpecCategory] = useState("");
  const [meatUtility, setMeatUtility] = useState("");
  const [meatImage, setMeatImage] = useState(null);
  const [status, setStatus] = useState(""); // Usado para feedback de envio
  const [statusType, setStatusType] = useState(""); // 'success' ou 'error'

  useEffect(() => {
    if (meatCategory != "Outros") {
      setSpecCategory("");
    }
  }, [meatCategory]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setMeatImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Enviando...");
    setStatusType("");
    addMeat(
      meatName,
      meatPrice,
      specCategory == "" ? meatCategory : specCategory,
      meatUtility,
      meatImage,
      meatMeasure
    );
  };

  async function addMeat(name, price, category, utitls, image, measure) {
    if (!name || !price || !category || !utitls || !measure || image == null) {
      setStatus("Por favor, preencha todos os campos obrigatórios.");
      setStatusType("error");
      return;
    }
    const item = {
      name: name,
      price: Number(price),
      category: category,
      utitls: utitls,
      measure: measure,
    };
    try {
      const docRef = await addDoc(collection(db, "meats"), item);
      const promise = storage.createFile(
        `${import.meta.env.VITE_BUCKET_ID}`,
        `${docRef.id}`,
        image
      );
      promise.then(
        function (docRef) {
          console.log(docRef); // Success
          setStatus("Dados salvos com sucesso!");
          setStatusType("success");
          setMeatName(""); //clean fields
          setMeatPrice("");
          setMeatUtility("");
          setSpecCategory("");
          setMeatCategory("Suíno")
          setMeatImage(null);
          updateData();
        },
        function (error) {
          setStatus("Erro ao salvar dados. Tente novamente.");
          setStatusType("error");
          console.error("Erro no envio:", error);
        }
      );
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
            value={meatMeasure}
            onChange={(e) => setMeatMeasure(e.target.value)}
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
            <option value="Outros">Outros</option>
          </select>
        </div>
      </div>

      {meatCategory == "Outros" && (
        <div className="form-group">
          <label htmlFor="meatSpecCategory">DIGITE A CATEGORIA</label>
          <input
            type="text"
            id="meatSpecCategory"
            placeholder="Digite a categoria da carne..."
            value={specCategory}
            onChange={(e) => setSpecCategory(e.target.value)}
          />
        </div>
      )}

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
