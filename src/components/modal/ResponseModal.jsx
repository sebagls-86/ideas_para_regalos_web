import React from "react";
import { Modal, Button } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";

function ResponseModal({ show, onHide, message, onConfirm, confirmButtonText }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <button className="modal__button" onClick={onHide}>
          <AiOutlineClose />
        </button>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onConfirm}>
          {confirmButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ResponseModal;
