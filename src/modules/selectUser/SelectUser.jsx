import React, { useState } from 'react';
import ModalNewProfile from '../modalCreateProfile/ModalCreateProfile';
import styles from './selectUser.module.css';
import person3Image from '../../assets/person3.svg';
import expandDown from '../../assets/expand-icon.svg';
import expandClose from '../../assets/expand-close.svg';

function SelectUser() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null); // State to store the selected option
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
      <button
        className={styles.selectButton}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
      >
        {selectedOption ? selectedOption.label : 'Elegir persona'}
        {isOpen ? (
          <img src={expandClose} alt="Expand Close" />
        ) : (
          <img src={expandDown} alt="Expand Down" />
        )}
      </button>

      {isOpen && (
        
        <ul className={styles.userOptionList}>
          <li className={styles.userOptionListTitle}>
            <a href='#' onClick={handleNewProfileClick}>Crear nuevo</a>
          </li>
          
          <li className={styles.optionItem} onClick={() => handleOptionSelect({ label: 'Username1', username: '@username1' })}>
            <img src={person3Image} alt="User" />
            <div>
              <p>Username1</p>
              <p>@username1</p>
            </div>
          </li>
          <li className={styles.optionItem} onClick={() => handleOptionSelect({ label: 'Username2', username: '@username2' })}>
            <img src={person3Image} alt="User" />
            <div>
              <p>Username2</p>
              <p>@username2</p>
            </div>
          </li>
          <li className={styles.optionItem} onClick={() => handleOptionSelect({ label: 'Username3', username: '@username3' })}>
            <img src={person3Image} alt="User" />
            <div>
              <p>Username3</p>
              <p>@username3</p>
            </div>
          </li>
        </ul>
      )}

      {showNewProfileModal && (
        <ModalNewProfile
          closeModal={() => setShowNewProfileModal(false)}
        />
      )}
    </div>
  );
}

export default SelectUser;
