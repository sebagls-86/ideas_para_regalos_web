import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function NuevoPerfilModal({
  show,
  onHide,
  ageRanges,
  relationships,
  interests,
  selectedInterests,
  setSelectedInterests,
  handleToggleInterest,
  handleCloseNewProfileModal,
  handleSaveNewProfile,
}) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedAgeRange, setSelectedAgeRange] = useState("");
  const [selectedRelationship, setSelectedRelationship] = useState("");

  const handleClose = () => {
    setLastName("");
    setName("");
    setSelectedAgeRange("");
    setSelectedRelationship("");
    handleToggleInterest([]);
    setSelectedInterests([]);
    onHide();
    handleCloseNewProfileModal();
  };

  const handleCreateProfile = () => {
    const selectedInterestIds = Object.values(selectedInterests).map(interest => interest.interest_id);
    const newProfile = {
      name,
      last_name: lastName,
      age_range_id: parseInt(selectedAgeRange, 10),
      relationship_id: parseInt(selectedRelationship, 10),
      selectedInterests: selectedInterestIds,
    };
    handleSaveNewProfile(newProfile);
  };

  const isGuardarDisabled =
    name.trim() === "" ||
    lastName.trim() === "" ||
    selectedInterests.length < 3 ||
    !selectedAgeRange ||
    !selectedRelationship;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Nuevo perfil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              className="form-control"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Age Range:</label>
            <select
              className="form-control"
              value={selectedAgeRange}
              onChange={(e) => setSelectedAgeRange(e.target.value)}
            >
              <option value="">Selecciona rango de edad</option>
              {ageRanges.map((ageRange) => (
                <option
                  key={ageRange.age_range_id}
                  value={ageRange.age_range_id}
                >
                  {ageRange.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Relationship:</label>
            <select
              className="form-control"
              value={selectedRelationship}
              onChange={(e) => setSelectedRelationship(e.target.value)}
            >
              <option value="">Selecciona tipo de relacion</option>
              {relationships.map((relationship) => (
                <option
                  key={relationship.relationship_id}
                  value={relationship.relationship_id}
                >
                  {relationship.relationship_name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Interests:</label>
            <div>
              {interests.map((interest) => (
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
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button
          variant="primary"
          onClick={handleCreateProfile}
          disabled={isGuardarDisabled}
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NuevoPerfilModal;
