import React, { useState, useEffect } from "react";
import Modal from "../../components/modal/Modal";
import { Col } from "react-bootstrap";
import Button from "../../components/button/Button";
import Step1 from "./Step1";
import Step2 from "./Step2";
import styles from "./modalRegister.module.css";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const ModalRegister = ({ closeModal }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState({
    name: "",
    lastName: "",
    email: "",
    birthDate: null,
  });
  const [step2Data, setStep2Data] = useState({
    userName: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isGuardarDisabled, setIsGuardarDisabled] = useState(true); // Estado para habilitar/deshabilitar el botón de "Siguiente"

  useEffect(() => {
    const step1Complete = Object.values(step1Data).every(
      (value) => value !== "" && value !== null
    );
    const step2Complete = Object.values(step2Data).every(
      (value) => value !== ""
    );

    setIsGuardarDisabled(!(step === 1 ? step1Complete : step2Complete));
  }, [step, step1Data, step2Data]);

  const handleNextStep = async () => {
    if (step === 1) {
      if (
        !step1Data.email ||
        !step1Data.name ||
        !step1Data.lastName ||
        !step1Data.birthDate
      ) {
        setErrorMessage("Por favor, complete todos los campos");
        return;
      }
      setStep(step + 1);
      setErrorMessage("");
    } else {
      if (!step2Data.userName || !step2Data.password) {
        setErrorMessage("Por favor, complete todos los campos");
        return;
      }

      const passwordValidationPatterns = [
        /.{8,}/,
        /[a-z]/,
        /[A-Z]/,
        /\d/,
        /[^\s<>"´']+/,
      ];
      if (
        !passwordValidationPatterns.every((pattern) =>
          pattern.test(step2Data.password)
        )
      ) {
        setErrorMessage(
          "La contraseña debe contener al menos 8 caracteres, una letra minúscula, una letra mayúscula, un número y un carácter especial"
        );
        return;
      }
      verificarNombreUsuario();
    }
  };

  const verificarNombreUsuario = async () => {
    const response = await fetch(
      "http://localhost:8080/api/v1/users/username-exists",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_name: step2Data.userName }),
      }
    );

    if (response.ok) {
      handleSubmit();
    } else {
      setErrorMessage("El nombre de usuario ya existe");
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
    setErrorMessage("");
  };

  const handleInputChangeStep1 = (e) => {
    const { name, value } = e.target;
    setStep1Data((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setStep1Data({
      ...step1Data,
      birthDate: date,
    });
  };

  const handleInputChangeStep2 = (e) => {
    const { name, value } = e.target;
    setStep2Data((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formatToDDMMYYYY = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async () => {
    if (step1Data.birthDate instanceof Date) {
      // Formatear la fecha a DD/MM/YYYY
      const formattedDate = formatToDDMMYYYY(step1Data.birthDate);

      // Crear un objeto FormData y agregar los datos del formulario
      const formData = new FormData();
      formData.append("user_name", step2Data.userName);
      formData.append("name", step1Data.name);
      formData.append("last_name", step1Data.lastName);
      formData.append("birth_date", formattedDate);
      formData.append("email", step1Data.email);
      formData.append("password", step2Data.password);

      const response = await fetch("http://localhost:8080/api/v1/users", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        const token = responseData.data;
  
        localStorage.setItem("token", token);
        const decoded = jwtDecode(token);
        const userId = decoded.user_id;
        navigate(`/perfil/${userId}`);
        closeModal();
      } else {
        setErrorMessage("Hubo un error al crear el usuario");
      }
    }
  };

  return (
          <Modal
        closeModal={closeModal}
        title={step === 1 ? "Empecemos!" : "Ya casi estamos"}
        show={true}
        contentStyle={{
          height: "calc(100% - 2rem)",
          maxHeight: "781px",
          marginTop: "10px",
        }}
      >
        <Col>
          <div className={styles.buttons__container}>
            {step === 1 ? (
              <Step1
                step1Data={step1Data}
                onInputChange={handleInputChangeStep1}
                onDateChange={handleDateChange}
              />
            ) : (
              <Step2
                step2Data={step2Data}
                onInputChange={handleInputChangeStep2}
              />
            )}
            <Button
              label={step === 2 ? "Finalizar" : "Siguiente"}
              onClick={handleNextStep}
              className="btn primary__button"
              disabled={isGuardarDisabled} // Deshabilitar el botón si no se han completado todos los campos
            />
            {step === 2 && (
              <Button
                label="Anterior"
                onClick={handlePreviousStep}
                className="btn primary__button"
              />
            )}
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          </div>
        </Col>
      </Modal>
  );
};

export default ModalRegister;
