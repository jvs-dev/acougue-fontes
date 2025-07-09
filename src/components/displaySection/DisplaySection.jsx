import React from "react";
import "./DisplaySection.css";
import ImageUploadBox from "../imageUploadBox/ImageUploadBox";
import MeatDisplayCard from "./meatDisplayCard/MeatDisplayCard";

function DisplaySection({
  title,
  meats,
  meatOptions,
  imageUploadCount,
  onMeatChange,
  onImageUploadChange,
  currentImageFiles,
}) {
  const imageUploadsIndices = Array.from(
    { length: imageUploadCount },
    (_, i) => i
  );

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
              currentFile={currentImageFiles[idx]}
              onChange={(file) => onImageUploadChange(idx, file)}
            />
          ))}
        </div>
        <div className="meat-display-cards-container">
          {meats.map((meat) => (
            <MeatDisplayCard
              key={meat.id}
              meat={meat}
              meatOptions={meatOptions} // Passa as opções de carne
              onMeatChange={onMeatChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DisplaySection;
