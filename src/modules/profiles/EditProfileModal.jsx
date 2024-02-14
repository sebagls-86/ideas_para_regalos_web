import React from "react";
import { Modal, Button } from "react-bootstrap";

function EditProfileModal({
    show,
    onHide,
    selectedProfile,
    setSelectedProfile,
    ageRanges,
    relationships,
    handleCloseModal,
    handleSaveChanges,
  }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Editar perfil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              value={selectedProfile?.name || ""}
              onChange={(e) =>
                setSelectedProfile({
                  ...selectedProfile,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              className="form-control"
              value={selectedProfile?.last_name || ""}
              onChange={(e) =>
                setSelectedProfile({
                  ...selectedProfile,
                  last_name: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Age Range:</label>
            <select
              className="form-control"
              value={selectedProfile?.age_range || ""}
              onChange={(e) =>
                setSelectedProfile({
                  ...selectedProfile,
                  age_range: e.target.value,
                })
              }
            >
              {ageRanges.map((ageRange) => (
                <option key={ageRange.age_range_id} value={ageRange.name}>
                  {ageRange.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Relationship:</label>
            <select
              className="form-control"
              value={selectedProfile?.relationship || ""}
              onChange={(e) =>
                setSelectedProfile({
                  ...selectedProfile,
                  relationship: e.target.value,
                })
              }
            >
              {relationships.map((relationship) => (
                <option
                  key={relationship.relationship_id}
                  value={relationship.relationship_name}
                >
                  {relationship.relationship_name}
                </option>
              ))}
            </select>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer style={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditProfileModal;
