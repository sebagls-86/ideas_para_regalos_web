import React, { useState } from 'react';
import ModalNewProfile from '../modalCreateProfile/ModalCreateProfile';
import SelectButton from '../../components/selectButton/selectButton';
import styles from './selectUser.module.css';
import person3Image from '../../assets/person3.svg';

function SelectUser({ options }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showNewProfileModal, setShowNewProfileModal] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleNewProfileClick = () => {
    setShowNewProfileModal(true);
  };

  return (
    <div className={styles.selectUser}>
      <SelectButton
        label={selectedOption ? selectedOption.label : 'Elegir persona'}
        isOpen={isOpen}
        toggleDropdown={toggleDropdown}
      />

      {isOpen && (
        <ul className={styles.userOptionList}>
          <li className={styles.userOptionListTitle}>
            <a href="#" onClick={handleNewProfileClick}>
              Crear nuevo
            </a>
          </li>

          {options.map((option) => (
            <li
              key={option.label}
              className={styles.optionItem}
              onClick={() => handleOptionSelect(option)}
            >
              <img src={person3Image} alt="User" />
              <div>
                <p>{option.label}</p>
                <p>{option.username}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {showNewProfileModal && (
        <ModalNewProfile closeModal={() => setShowNewProfileModal(false)} />
      )}
    </div>
  );
}

export default SelectUser;
