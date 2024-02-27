import React, { useState } from "react";
import Modal from "../../components/modal/Modal";
import styles from "./modalLogin.module.css";
import { Col } from "react-bootstrap";
import GoogleLogin from "../../components/auth/google/GoogleLogin";
import FacebookLogin from "../../components/auth/facebook/FacebookLogin";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

function ModalLogin({ closeModal }) {
  const [form, setForm] = useState({});
  const [error, setError] = useState(null);
  const [showModal] = useState(true); 

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  console.log("closeModal function:", closeModal);
  console.log("ModalLogin rendering...");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error("Failed to log in");
      }

      const data = await response.json();
      console.log("token obtenido", data.data.token);
      localStorage.setItem("token", data.data.token);
      closeModal(false);
      window.location.reload();
    } catch (error) {
      setError(error.message);
    }
  };

  console.log("token", localStorage.getItem("token"));

  return (
    <Modal closeModal={closeModal} title="Iniciar sesión" show={showModal}>
      <Col>
        <div className={styles.buttons__container}>
          <GoogleLogin />
          <FacebookLogin />
        </div>
        <div className={styles.hr_container}>
          <hr />
          <p>o</p>
          <hr />
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.buttons__container}>
            <Input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              required="required"
              label="Correo electrónico"
              onChange={handleChange}
            />
            <Input
              type="password"
              name="password"
              placeholder="Contraseña"
              required="required"
              label="Contraseña"
              onChange={handleChange}
            />
          </div>
          {error && <p>{error}</p>}
          <Button label="Ingresar" className="btn primary__button" />
        </form>
        <div className={styles.actions__container}>
          <Button
            label="¿Olvidaste tu contraseña?"
            className="btn secondary__button-outline"
          />
        </div>
        <div className={styles.registro__container}>
          <p>¿No tenés una cuenta?</p>
          <Button label="Registrate" className="btn color--green" />
        </div>
      </Col>
    </Modal>
  );
}

export default ModalLogin;
