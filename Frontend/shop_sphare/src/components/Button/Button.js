import React from "react";
import "./Style/Button.css";

const Button = ({ className, onClick, btnName, type }) => {
  return (
    <div>
      <button
        className={className}
        onClick={onClick}
        type={type}
      >
        {btnName}
      </button>
    </div>
  );
};

export default Button;
