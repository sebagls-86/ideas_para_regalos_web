import React from "react";
import PropTypes from "prop-types";
import styles from "./modal.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { Col } from "react-bootstrap";

function Modal({ closeModal, title, children, show }) {
  console.log("Modal show:", show);
  return (
    <div className={styles.modal} style={{ display: show ? "block" : "none" }}>
      <div className={styles.modal__content}>
        <button className={styles.modal__button} onClick={closeModal}>
          <AiOutlineClose />
        </button>
        <div className={styles.modal__body}>
          <h2 className={styles.modal__title}>{title}</h2>
          <Col xs={10} sm={8} md={7}>
            {children}
          </Col>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
  closeModal: PropTypes.func,
  show: PropTypes.bool.isRequired,
};

export default Modal;
