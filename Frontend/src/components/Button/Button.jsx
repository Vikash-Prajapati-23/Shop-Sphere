import "./Style/Button.css";

const Button = ({ className, onClick, btnName, type, disabled }) => {
  return (
    <div>
      <button
        className={className}
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        {btnName}
      </button>
    </div>
  );
};

export default Button;
