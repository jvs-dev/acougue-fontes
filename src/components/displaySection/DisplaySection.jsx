import React from "react";
import "./DisplaySection.css";
import ImageUploadBox from "../imageUploadBox/ImageUploadBox";
import MeatDisplayCard from "./meatDisplayCard/MeatDisplayCard";

// Adicione onMeatChange, onImageUploadChange e currentImageFiles como props
function DisplaySection({
  title,
  meats,
  imageUploadCount,
  onMeatChange,
  onImageUploadChange,
  currentImageFiles,
}) {
  const imageUploadsIndices = Array.from(
    { length: imageUploadCount },
    (_, i) => i
  ); // Usamos índices 0-base

  return (
    <div className="display-section">
      <h2 className="section-title">{title}</h2>
      <div className="display-content-new">
        <div className="image-upload-column">
          {imageUploadsIndices.map((idx) => (
            <ImageUploadBox
              key={idx}
              id={`${title.toLowerCase().replace(" ", "-")}-image-${idx}`}
              label="CLIQUE PARA CARREGAR UMA IMAGEM"
              currentFile={currentImageFiles[idx]} // Passa o arquivo atual para preview
              onChange={(file) => onImageUploadChange(idx, file)} // Notifica o pai sobre a mudança
            />
          ))}
        </div>
        <div className="meat-display-cards-container">
          {meats.map((meat) => (
            <MeatDisplayCard
              key={meat.id}
              meat={meat}
              onMeatChange={onMeatChange} // Passa a função de mudança para o MeatDisplayCard
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DisplaySection;
