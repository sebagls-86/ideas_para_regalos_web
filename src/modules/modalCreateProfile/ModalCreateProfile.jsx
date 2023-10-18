import React, { useState } from "react";
import Modal from "../../components/modal/Modal";
import styles from "./modalCreateProfile.module.css";
import { Col } from "react-bootstrap";
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
           <Input
           className={styles.Input}
            type="text"
            name="name"
            placeholder="Edad"
            required="required"
            label="Apellido"
            onChange = {handleChange}
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
