import React from "react";
import { Modal, Button } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./modal.module.css";

function ResponseModal({ show, onHide, message, onConfirm, confirmButtonText }) {
  return (
    <Modal show={show} onHide={onHide} >
      <div>
        <button className={styles.modal__button} onClick={onHide}>
          <AiOutlineClose />
        </button>
      </div>
      <div className={styles.modal__body}>
        <p>{message}</p>
      </div>
      <div>
        <Button variant="primary" onClick={onConfirm} className= {`${styles.accept_btn} primary__button-outline`}>
          {confirmButtonText}
        </Button>
      </div>
    </Modal>
  );
}

export default ResponseModal;
