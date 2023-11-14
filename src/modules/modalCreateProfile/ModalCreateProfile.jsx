import React, { useState } from "react";
import Modal from "../../components/modal/Modal";
import styles from "./modalCreateProfile.module.css";
import { Col } from "react-bootstrap";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import SelectButton from "../../components/selectButton/SelectButton"


function ModalLogin({ closeModal }) {
  const [form, setForm] = useState({})

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
    console.log(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    closeModal(false)
  }
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showNewProfileModal, setShowNewProfileModal] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    if (option.value === 'Open Modal') {
      handleNewProfileClick(); // Open modal for 'Crear nuevo'
    } else {
      setSelectedOption(option);
      setIsOpen(false);
    }
  };

  const handleNewProfileClick = () => {
    setShowNewProfileModal(true);
    setIsOpen(false); // Close the dropdown when opening the modal
  };

  const options = [
  
    {
      label: '0-5'
    },
    {
      label: '6-11'
    },
    {
      label: '12-17'
    },
    {
      label: '18-24'
    },
    {
      label: '25-34'
    },
    {
      label: '35-49'
    },
    {
      label: '50-64'
    },
    {
      label: '65+'
    },
  ]

  return (
    <Modal closeModal={closeModal} title="¿Para quién es el regalo?">
      <Col>
        <div className={styles.buttons__container}>
        <Input
            type="text"
            name="name"
            placeholder="Nombre"
            required="required"
            label="Nombre"
            onChange = {handleChange}
          />
            <Input
            type="text"
            name="name"
            placeholder="Apellido"
            required="required"
            label="Apellido"
            onChange = {handleChange}
          />
           <SelectButton
          label="Edad"
          isOpen={isOpen}
          toggleDropdown={toggleDropdown}
          options={options}
          handleOptionSelect={handleOptionSelect}
          selectedOption={selectedOption} 
          />
           <Input
            type="text"
            name="name"
            placeholder="Relación"
            required="required"
            label="Relación"
            onChange = {handleChange}
          />
          
        </div>

        <form onSubmit={handleSubmit}>
          <Button label="Siguiente" className="btn primary__button" onClick={handleSubmit}/>
        </form>
       
      
      </Col>
    </Modal>
  );
}

export default ModalLogin;
