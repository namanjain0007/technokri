import React from "react";
import "./CSS/Preloader.css"; // Import the CSS file

const Preloader = () => {
  return (
    <div className="preloader-container">
      <div className="preloader-image-container">
        <img
          src="https://www.technokri.com/assets/img/logo/logo.png"
          alt="Logo"
          className="preloader-image"
        />
      </div>
    </div>
  );
};

export default Preloader;
