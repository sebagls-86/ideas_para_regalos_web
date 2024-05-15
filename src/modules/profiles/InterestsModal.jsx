import React, { useState } from "react";
import Button from "../../components/button/Button";
import Modal from "../../components/modal/Modal";
import styles from "./css/profiles.module.css";
import ResponseModal from "../../components/modal/ResponseModal";

function InterestsModal({
  show,
  onHide,
  filteredAvailableInterests,
  handleToggleInterest,
  setShowInterestModal,
  selectedInterests,
  profileId,
  updateProfilesWithNewInterests,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");

  const handleSaveInterests = async () => {
    try {
      setIsLoading(true);

      const requestBody = {
        profile_id: profileId,
        interest_id: selectedInterests.map((interest) => interest.interest_id),
      };

      const response = await fetch(
        `${API_URL}/profileInterests`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        setErrorMessage("Error al guardar intereses");
        setShowResponseModal(true);
        throw new Error("Network response was not ok");
      }

      setIsLoading(false);
      setShowInterestModal(false);
      updateProfilesWithNewInterests(selectedInterests);
    } catch (error) {
      setErrorMessage("Error al guardar intereses");
      setShowInterestModal(false);
      setShowResponseModal(true);
    }
  };

  return (
    <>
      <ResponseModal
        show={showResponseModal}
        onHide={() => setShowResponseModal(false)}
        message={errorMessage}
        onConfirm={() => setShowResponseModal(false)}
        confirmButtonText="Aceptar"
      />
      {isLoading}

      <Modal show={show} closeModal={onHide} title="Seleccioná intereses">
        <div className={styles.interest_modal} >
        <p>Agregá más intereses a tu perfil</p>
        <div className={styles.modal_content}>
          {filteredAvailableInterests.map((interest) => (
            <Button
              key={interest.interest_id}
              label={interest.interest}
              className={`${styles.interestButton} ${
                selectedInterests.includes(interest)
                  ? styles.selectedInterest
                  : ""
              }`}
              onClick={() => handleToggleInterest(interest)}
              isSelected={selectedInterests.includes(interest)}
            />
          ))}
        </div>
        <div style={{ marginTop: "20px", textAlign: "right" }}>
          <Button
            label="Finalizar"
            className="btn primary__button"
            onClick={handleSaveInterests}
          />
        </div>
        </div>
      </Modal>
    </>
  );
}

export default InterestsModal;
