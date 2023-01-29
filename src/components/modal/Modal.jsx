import React, { useState, useEffect } from "react";
import styles from "./modal.module.css";
import { AiOutlineClose } from "react-icons/ai";

import GoogleLogin from "../auth/google/GoogleLogin";
import FacebookLogin from "../auth/facebook/FacebookLogin";
import { Col } from "react-bootstrap";

function Modal({ closeModal }) {
  return (
    <div className={styles.modal}>
      <div className={styles.modal__content}>
        <button
          className={styles.modal__button}
          onClick={() => closeModal(false)}
        >
          <AiOutlineClose />
        </button>
        <div className={styles.modal__body}>
          <h2 className={styles.modal__title}>Iniciar sesión</h2>
          <Col xs={10} sm={8} md={7}>
            <GoogleLogin />
            <FacebookLogin />
          </Col>
        </div>
      </div>
    </div>
  );
}

export default Modal;
