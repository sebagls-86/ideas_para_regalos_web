import React from "react";
import PropTypes from "prop-types";

import styles from "./input.module.css";

function Input({ type, name, placeholder, required, label, onChange }) {
  return (
    <div className={`${styles.form__floating} form-floating`}>
      <input
        type={type}
        className={`${styles.form__control} form-control`}
        name={name}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
      />
      <label htmlFor={name} className={styles.input__label}>
        {label}
      </label>
    </div>
  );
}
Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  label: PropTypes.string,
};
export default Input;
