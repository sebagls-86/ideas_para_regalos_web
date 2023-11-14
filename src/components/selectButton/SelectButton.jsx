import React from 'react';
import expandDown from '../../assets/expand-icon.svg';
import expandClose from '../../assets/expand-close.svg';
import styles from './selectButton.module.css';

function SelectButton({ label, isOpen, toggleDropdown }) {
  return (
    <button
      className={styles.selectButton}
      onClick={toggleDropdown}
      aria-expanded={isOpen}
    >
      {label}
      {isOpen ? (
        <img src={expandClose} alt="Expand Close" />
      ) : (
        <img src={expandDown} alt="Expand Down" />
      )}
    </button>
  );
}

export default SelectButton;
