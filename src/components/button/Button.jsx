import React from "react";
import PropTypes from "prop-types";

function Button({ label, className, onClick, disabled, isSelected }) {
  const buttonClassName = `${className} ${isSelected ? 'selected' : ''}`;

  return (
    <button className={buttonClassName} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  isSelected: PropTypes.bool
};

export default Button;
