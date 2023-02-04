import React from "react";
import PropTypes from "prop-types";

function Button({ label, className, onClick }) {
  return <button className={`${className}`} onClick={onClick}>{label}</button>;
}
Button.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
};
export default Button;
