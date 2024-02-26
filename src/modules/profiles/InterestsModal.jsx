import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

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

      const response = await fetch("http://localhost:8080/api/v1/profileInterests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

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
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Selecciona un interés</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {filteredAvailableInterests.map((interest) => (
          <Button
            key={interest.interest_id}
            onClick={() => handleToggleInterest(interest)}
            style={{
              marginBottom: "10px",
              marginLeft: "10px",
              backgroundColor: selectedInterests.includes(interest)
                ? "#007bff"
                : "white",
              color: selectedInterests.includes(interest)
                ? "white"
                : "#007bff",
            }}
          >
            {interest.interest}
          </Button>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSaveInterests} disabled={isLoading}>
          {isLoading ? "Guardando..." : "Guardar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default InterestsModal;
