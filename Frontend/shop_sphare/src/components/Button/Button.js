import React from "react";
import "./Style/Button.css";

const Button = ({ className, onClick, btnName, type, ...props }) => {
  return (
    <div>
      <button
        className={className}
        // id={id}
        onClick={onClick}
        type={type}
        {...props}
      >
        {btnName}
      </button>
    </div>
  );
};

export default Button;
