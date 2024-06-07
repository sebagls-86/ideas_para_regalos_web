import React from "react";
import PropTypes from "prop-types";
import styles from "./modal.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { Col } from "react-bootstrap";

function Modal({ closeModal, title, children, show, contentStyle, colStyle }) {
  const defaultColStyle = { xs: 10, sm: 8, md: 7 };
  const appliedColStyle = colStyle || defaultColStyle;
  return (
    <div className={styles.modal} style={{ display: show ? "block" : "none" }}>
      <div className={styles.modal__content} style={contentStyle}>
        <button className={styles.modal__button} onClick={closeModal}>
          <AiOutlineClose />
        </button>
        <div className={styles.modal__body}>
          <h2 className={styles.modal__title}>{title}</h2>
          <Col {...appliedColStyle}>
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
