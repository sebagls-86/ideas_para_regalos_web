import React, { useState } from "react";
import Modal from "../../components/modal/Modal";
import styles from "./modalCreateProfile.module.css";
import { Col } from "react-bootstrap";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import SelectButton from "../../components/selectButton/SelectButton";

function ModalCreateProfile({ closeModal }) {
  const [form, setForm] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [isAgeDropdownOpen, setIsAgeDropdownOpen] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal(false);
  };

  const options = [
    { label: '0-5' },
    { label: '6-11' },
    { label: '12-17' },
    { label: '18-24' },
    { label: '25-34' },
    { label: '35-49' },
    { label: '50-64' },
    { label: '65+' },
  ];

  const [selectedInterests, setSelectedInterests] = useState([]);
  const interestOptions = ["Deporte", "Arte", "Fútbol", "Música", "Videojuegos","Cocinar", "Natación", "Viajes", "Leer", "Animales", "Fotografía", "Entretenimiento", "Otro"];

  const handleChangeInterest = (word) => {
    if (selectedInterests.includes(word)) {
      // si esta seleccionado, remover
      setSelectedInterests((prevInterests) =>
        prevInterests.filter((interest) => interest !== word)
      );
    } else {
      // no seleccionado, seleccionar
      setSelectedInterests((prevInterests) => [...prevInterests, word]);
    }
  };

  const getTitleForStep = () => {
    switch (currentStep) {
      case 1:
        return "¿Para quién es el regalo?";

      case 2:
        return "¿Sus intereses?";

      default:
        return "¿Para quién es el regalo?";
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <Input
              type="text"
              name="name"
              placeholder="Nombre"
              required="required"
              label="Nombre"
              onChange={handleChange}
            />
            <Input
              type="text"
              name="name"
              placeholder="Apellido"
              required="required"
              label="Apellido"
              onChange={handleChange}
            />
            <SelectButton
              label="Edad"
              isOpen={isAgeDropdownOpen}
              options={options}
              handleOptionSelect={() => {}}
              selectedOption={null}
              toggleDropdown={() => setIsAgeDropdownOpen(!isAgeDropdownOpen)}
            />
            <Input
              type="text"
              name="name"
              placeholder="Relación"
              required="required"
              label="Relación"
              onChange={handleChange}
            />
          </>
        );

      case 2:
        return (
          <> 
          <p className={styles.interest_description}>Elegí 4 o más tópicos de su interés para poder buscar mejores recomendaciones.</p>
          <div className={styles.options_container}>
          {interestOptions.map((word, index) => (
            <label key={index} className={styles.option_box}>
              <div
                className={`${styles.selectionBox} ${
                  selectedInterests.includes(word) && styles.selected
                }`}
                onClick={() => handleChangeInterest(word)}
              >
                {word}
              </div>
            </label>
          ))}
        </div>
            <form onSubmit={handleSubmit}>
              <Button
                label="Finalizar"
                className="btn primary__button"
                onClick={handleSubmit}
              />
            </form>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Modal closeModal={closeModal} title={getTitleForStep()}>
      <Col>
        <div className={styles.buttons__container}>
          {renderStepContent()}
          {currentStep === 1 && (
            <Button
              label="Siguiente"
              className="btn primary__button"
              onClick={handleNextStep}
            />
          )}
        </div>
      </Col>
    </Modal>
  );
}

export default ModalCreateProfile;
