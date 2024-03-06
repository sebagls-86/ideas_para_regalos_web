import React from "react";
import Modal from "../../components/modal/Modal";
import styles from "./nuevoRegaloForm.module.css";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";

function ModalSuggestions({ closeModal, suggestions, onCancel, createForum }) {
    const navigate = useNavigate();

  const handleCancel = async () => {
    closeModal();
    onCancel();
    navigate("/");
  };

  const handleCreate = () => {
    createForum();
    closeModal();
  };

  const closeModalHandler = () => {
    closeModal();
  };

  return (
    <>
      <Modal
        closeModal={closeModalHandler}
        title="Tenemos estas opciones para ofrecerte"
        show={true}
        contentStyle={{
          height: "calc(80% - 2rem)",
          maxHeight: "781px",
          marginTop: "10px",
        }}
      >
        <div className={styles.suggestionsContainer}>
          {suggestions.map((suggestion, index) => (
            <div key={index} className={styles.suggestion}>
              <h3 className={styles.suggestions}>{suggestion.product_name}</h3>
            </div>
          ))}
        </div>
        <div className={styles.buttonsContainer}>
          <Button
            label="Me gustan"
            className="btn primary__button-outline"
            onClick={handleCancel}
          />

          <Button
            label="Crear foro"
            className="btn primary__button-outline"
            onClick={handleCreate}
          />
        </div>
      </Modal>
    </>
  );
}

export default ModalSuggestions;
