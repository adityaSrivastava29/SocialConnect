import React, { useState } from "react";
import "../../style/coverPage.css";

const CoverPage = () => {
  const [coverPhoto, setCoverPhoto] = useState('');

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setCoverPhoto(URL.createObjectURL(file));
    // Add server upload logic here
  };

  return (
    <div className="right-banner">
      <div className="image-wrapper">
        <img
          src={
            coverPhoto ||
            'https://t4.ftcdn.net/jpg/05/45/42/81/360_F_545428173_uyYWJoR9n5uJFYIWfDa2C49AzIECcU20.jpg'
          }
          alt="Cover"
          className="cover-img"
        />
        <label className="upload-button">
          <input
            accept="image/*"
            type="file"
            onChange={handleUpload}
            style={{ display: 'none' }}
          />
          Change Cover
        </label>
      </div>
    </div>
  );
};

export default CoverPage;