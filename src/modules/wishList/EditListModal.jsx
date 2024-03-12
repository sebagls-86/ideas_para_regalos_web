import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ResponseModal from "../../components/modal/ResponseModal";

function EditListModal({
  show,
  onHide,
  setShowInterestModal,
  selectedInterests,
  profileId,
  updateProfilesWithNewInterests,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
        setErrorMessage("Error al editar lista");
        onHide();
        setShowResponseModal(true);
        throw new Error("Network response was not ok");
      }

      setIsLoading(false);
      setShowInterestModal(false);
      updateProfilesWithNewInterests(selectedInterests);
    } catch (error) {
      setErrorMessage("Error al editar lista");
      onHide();
      setIsLoading(false);
      setShowResponseModal(true);
    }
  };

  return (
    <>
      <ResponseModal
        show={showResponseModal}
        onHide={() => setShowResponseModal(false)}
        message={successMessage || errorMessage}
        onConfirm={() => {
          setShowResponseModal(false);
          setSuccessMessage(null);
          setErrorMessage(null);
        }}
        confirmButtonText="Aceptar"
      />
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Selecciona un interés</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button></Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cerrar
          </Button>
          <Button
            variant="primary"
            onClick={handleSaveInterests}
            disabled={isLoading}
          >
            {isLoading ? "Guardando..." : "Guardar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditListModal;
