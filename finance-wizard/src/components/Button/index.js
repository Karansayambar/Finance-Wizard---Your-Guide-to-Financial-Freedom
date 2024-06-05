import "../Button/style.css";
const Button = ({ onclick, text, blue, disabled }) => {
  return (
    <div
      className={blue ? "btn btn-blue" : "btn"}
      onClick={onclick}
      disabled={disabled}
    >
      {text}
    </div>
  );
};

export default Button;
