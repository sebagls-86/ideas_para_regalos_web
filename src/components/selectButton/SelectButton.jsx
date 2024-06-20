import React from "react";
import expandDown from "../../assets/expand-icon.svg";
import expandClose from "../../assets/expand-close.svg";
import styles from "./selectButton.module.css";

function SelectButton({
  label,
  isOpen,
  toggleDropdown,
  options,
  handleOptionSelect,
  selectedOption,
  maxWidth,
}) {
  return (
    <div className={styles.selectButtonContainer}>
      <button
        className={styles.selectButton}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        style={{ maxWidth: maxWidth }} 
      >
        {selectedOption ? selectedOption.label : label}
        {isOpen ? (
          <img src={expandClose} alt="Expand Close" />
        ) : (
          <img src={expandDown} alt="Expand Down" />
        )}
      </button>
      {isOpen && (
        <ul className={styles.optionsList} style={{ maxWidth: maxWidth }}>
          {options.map((option) => (
            <li
              className={styles.optionItem}
              key={option.value}
              onClick={() => {
                handleOptionSelect(option);
                toggleDropdown();
              }}
            >
              {renderOption(option)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const renderOption = (option) => {
  switch (option.type) {
    case "link":
      return (
        <div className={styles.linkOption}>
          <a href={option.link} rel="noopener noreferrer">
            {option.label}
          </a>
        </div>
      );
    case "imageWithLabels":
      return (
        <div className={styles.userOption}>
          <img
            src={option.imageUrl}
            alt={option.label}
            className={styles.imageOption}
          />
          <div>
            <div className={styles.labelOption}>{option.label1}</div>
            <div className={styles.labelOption}>{option.label2}</div>
          </div>
        </div>
      );
    case "text":
    default:
      return (
        <div className={styles.textOption}>
          <span>{option.label}</span>
        </div>
      );
  }
};

export default SelectButton;
