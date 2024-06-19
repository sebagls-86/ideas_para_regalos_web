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
        title="¡Tenemos justo lo que buscás!"
        show={true}
        contentStyle={{
          height: "fit-content",
          paddingBottom: "4rem",
          marginTop: "3rem",
        }}
        colStyle={{ xs: 12, sm: 12, md: 12 }}
      >
        <p className="mb-3 text-center">
          ¿Te gustan estos productos? <br /> Creemos que son perfectos para tu
          ocasión especial
        </p>
        <div className={styles.suggestionsContainer}>
          {suggestions.map((suggestion, index) => (
            <div key={index} className={styles.suggestion}>
              <img
                src={suggestion.image}
                alt=""
                className={styles.productImage}
              />

              <p className={styles.suggestions}>{suggestion.product_name}</p>
            </div>
          ))}
        </div>
        <div className={styles.buttonsContainer}>
          <Button
            label="Me gustan, omitir crear foro"
            className="btn primary__button-outline"
            onClick={handleCancel}
          />

          <Button
            label="Crear foro para tener más opciones"
            className="btn primary__button-outline"
            onClick={handleCreate}
          />
        </div>
      </Modal>
    </>
  );
}

export default ModalSuggestions;
