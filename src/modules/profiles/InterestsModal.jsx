import React, { useState } from "react";
//import { Modal, Button } from "react-bootstrap";
import Button from "../../components/button/Button";
import Modal from "../../components/modal/Modal";
import styles from "./css/profiles.module.css";

function InterestsModal({
  show,
  onHide,
  filteredAvailableInterests,
  handleToggleInterest,
  setShowInterestModal,
  selectedInterests,
  profileId, // Nuevo prop: ID del perfil
  updateProfilesWithNewInterests,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleSaveInterests = async () => {
    try {
      setIsLoading(true);

      const requestBody = {
        profile_id: profileId, // Usamos el ID del perfil
        interest_id: selectedInterests.map((interest) => interest.interest_id),
      };

      const response = await fetch(
        "http://localhost:8080/api/v1/profileInterests",
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
        alert("Error al guardar intereses");
        throw new Error("Network response was not ok");
      }

      setIsLoading(false);
      setShowInterestModal(false);
      updateProfilesWithNewInterests(selectedInterests);
    } catch (error) {
      alert("Error al guardar intereses");
      console.error("Error saving interests:", error);
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} closeModal={onHide} title="Selecciona intereses">
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
    </Modal>
  );
}

export default InterestsModal;
