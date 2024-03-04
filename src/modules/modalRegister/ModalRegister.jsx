import React, { useState, useEffect } from "react";
import Modal from "../../components/modal/Modal";
import styles from "./modalRegister.module.css";
import { Col } from "react-bootstrap";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ModalRegister({ closeModal }) {
  const [showModal, setShowModal] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [isGuardarDisabled, setIsGuardarDisabled] = useState(true);
  useState(null);
  const navigate = useNavigate();

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const getTitleForStep = () => {
    switch (currentStep) {
      case 1:
        return "Empecemos!";
      case 2:
        return "Ya casi estamos";
      case 3:
        return "¡Listo!";
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
            />
            <Input
              type="text"
              name="lastName"
              placeholder="Apellido"
              required="required"
              label="Apellido"
            />
            <Input
              type="text"
              name="lastName"
              placeholder="Correo electrónico"
              required="required"
              label="Correo electrónico"
            />
            <Input
              type="text"
              name="lastName"
              placeholder="Fecha de nacimiento"
              required="required"
              label="Fecha de nacimiento"
            />
          </>
        );
      case 2:
        return (
          <>
            <Input
              type="text"
              name="lastName"
              placeholder="Nombre de usuario"
              required="required"
              label="Nombre de usuario"
            />
            <Input
              type="text"
              name="lastName"
              placeholder="Fecha de nacimiento"
              required="required"
              label="Fecha de nacimiento"
            />
            <Button
              label="Anterior"
              className="btn primary__button"
              onClick={handlePreviousStep}
            />
            <Button
              label="Finalizar"
              className="btn primary__button"
              onClick={handleNextStep}
            />
          </>
        );
      case 3:
        return (
          <>
            <Link to="/" className="fz-17">
              <Button
                label="Vamos!"
                className="btn primary__button"
                onClick={() => setShowModal(false)}
              />
            </Link>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      closeModal={closeModal}
      title={getTitleForStep()}
      show={showModal}
      contentStyle={{
        height: "calc(100% - 2rem)",
        maxHeight: "781px",
        marginTop: "10px",
      }}
    >
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

export default ModalRegister;
