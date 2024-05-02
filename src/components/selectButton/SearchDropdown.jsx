import React from "react";
import expandDown from "../../assets/expand-icon.svg";
import expandClose from "../../assets/expand-close.svg";
import styles from "./selectButton.module.css";
import Select, { components } from "react-select";
import { BorderAllRounded, Height } from "@mui/icons-material";

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      {props.selectProps.menuIsOpen ? (
        <img src={expandClose} alt="Expand Close" />
      ) : (
        <img src={expandDown} alt="Expand Down" />
      )}
    </components.DropdownIndicator>
  );
};

function SearchDropdown({
  label,
  options,
  handleOptionSelect,
  selectedOption,
}) {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "0.4px solid #000",
      boxShadow: "0 0 0 1px transparent",
      padding: "7px",
      color: " #525558",
      fontSize: "17px",
      "&:hover": {
        border: "0.4px solid #000",
      }
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "var(--focused-icon-color)" : "var(--default-icon-color)",
      "&:hover": {
        color: "var(--hovered-icon-color)"
      }
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: "none"
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "var(--gray)" : state.isFocused ? "var(--gray)" : "#fff",
      color: state.isSelected ? "#333" : "#000",
      padding: "13px 18px",
      ":active": {
        backgroundColor: "var(--active-color)",
        color: "var(--active-text-color)",
      },
      ":focus": {
        backgroundColor: "var(--focus-color)",
        color: "var(--focus-text-color)",
      },
    }),
  };
  
  
  return (
    <Select
      className={styles.search_dropdown} // Apply your custom styles here
      classNamePrefix="react-select"
      value={selectedOption}
      onChange={handleOptionSelect}
      options={options}
      placeholder={label}
      isSearchable 
      autoFocus 
      components={{ DropdownIndicator }}
      styles={customStyles}
    />
  );
}

export default SearchDropdown;
