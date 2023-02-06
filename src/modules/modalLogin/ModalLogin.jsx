import React, { useState } from "react";
import Modal from "../../components/modal/Modal";
import styles from "./modalLogin.module.css";
import { Col } from "react-bootstrap";
import GoogleLogin from "../../components/auth/google/GoogleLogin";
import FacebookLogin from "../../components/auth/facebook/FacebookLogin";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";


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

  return (
    <Modal closeModal={closeModal} title="Iniciar sesión">
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
            onChange = {handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Contraseña"
            required="required"
            label="Contraseña"
            onChange = {handleChange}
          />
        </div>
          <Button label="Ingresar" className="btn primary__button" onClick={handleSubmit}/>
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
