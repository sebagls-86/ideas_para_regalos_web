import React from "react";
import PropTypes from "prop-types";

function Button({ label, className }) {
  return <button className={`${className}`}>{label}</button>;
}
Button.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
};
export default Button;
