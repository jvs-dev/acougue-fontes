import React from "react";
import "./MeatCard.css";
import { Client, Storage } from "appwrite";
const client = new Client()
  .setEndpoint("https://nyc.cloud.appwrite.io/v1")
  .setProject(`${import.meta.env.VITE_APPWRITE_PROJECT_ID}`);
const storage = new Storage(client);

function MeatCard({ meat }) {
  const meatImage = storage.getFileDownload(
    `${import.meta.env.VITE_BUCKET_ID}`,
    `${meat.id}`
  );
  return (
    <div className="meat-card">
      <div className="meat-card-image-wrapper">
        <img src={meatImage} alt={meat.name} className="meat-card-image" />
      </div>
      <div className="meat-card-details">
        <h3 className="meat-card-name">{meat.name}</h3>
        <p className="meat-card-price">
          R${meat.price.toFixed(2)}
          <span>{meat.measure}</span>
        </p>
        <div className="meat-card-info">
          <span className="meat-card-category">
            <i className="fas fa-cow"></i> {meat.category}
          </span>
          <span className="meat-card-utility">
            <i className="fas fa-utensils"></i> {meat.utitls}
          </span>
        </div>
      </div>
      <div className="meat-card-actions">
        <button className="action-button edit-button">
          <i className="fas fa-pen"></i>
        </button>
        <button className="action-button delete-button">
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
}

export default MeatCard;
