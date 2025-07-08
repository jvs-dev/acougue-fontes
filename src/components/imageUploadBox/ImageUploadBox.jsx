import React from 'react'; // Não precisamos mais de useState aqui
import './ImageUploadBox.css';

function ImageUploadBox({ id, label, currentFile, onChange }) {
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onChange(file); // Chama a função de callback do componente pai
    } else {
      onChange(null); // Limpa o arquivo se nada for selecionado
    }
  };

  return (
    <div className="image-upload-container">
      <input
        type="file"
        id={id}
        accept="image/png, image/jpeg, image/gif"
        onChange={handleImageChange}
        hidden
      />
      <label htmlFor={id} className="upload-box-content">
        {currentFile ? (
          <img
            src={URL.createObjectURL(currentFile)}
            alt="Preview"
            className="uploaded-image-preview"
          />
        ) : (
          <>
            <i className="fas fa-cloud-upload-alt"></i>
            <p>{label}</p>
          </>
        )}
      </label>
      <p className="upload-info-small">
        <i className="fas fa-info-circle"></i> Upload your photo (.jpg or .png, max size 500kb)
      </p>
    </div>
  );
}

export default ImageUploadBox;