import React from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "./modal.module.css";

function ConfirmDeleteModal({
    show,
    onHide,
    title,
    bodyContent,
    onCancel,
    onConfirm,
    confirmationText,
    confirmButtonText,
    profileName
  }) {
    return (
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton className={styles.modal__delete_header}>
          <Modal.Title className={styles.modal__delete_title}>
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modal__delete_body}>
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