import React from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "./modal.module.css";
import { AiOutlineClose } from "react-icons/ai";

function ConfirmDeleteModal({
  show,
  onHide,
  title,
  bodyContent,
  onCancel,
  onConfirm,
  confirmationText,
  confirmButtonText,
  profileName,
}) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header className={styles.modal__delete_header}>
        <button
          className={`${styles.modal__button} ${styles.deleteModal_close_btn}`}
          onClick={onHide}
        >
          <AiOutlineClose />
        </button>
      </Modal.Header>
      <Modal.Body className={styles.modal__delete_body}>
        <h4> {title}</h4>
        {bodyContent}
      </Modal.Body>
      <Modal.Footer className={styles.modal__delete_footer}>
        <Button
          variant="secondary"
          onClick={onCancel}
          className={styles.modal__cancel}
        >
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={onConfirm}
          className={styles.modal__confirm}
        >
          {confirmButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmDeleteModal;
