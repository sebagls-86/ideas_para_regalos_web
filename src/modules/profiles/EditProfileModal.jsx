import React, { useState, useEffect } from "react";
import Button from "../../components/button/Button";
import Modal from "../../components/modal/Modal";
import styles from "./css/profiles.module.css";
import { Col } from "react-bootstrap";
import SelectButton from "../../components/selectButton/SelectButton";

function EditProfileModal({
  show,
  onHide,
  selectedProfile,
  setSelectedProfile,
  ageRanges,
  relationships,
  handleSaveChanges,
}) {
  const [isGuardarDisabled, setIsGuardarDisabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRelationship, setSelectedRelationship] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (selectedProfile) {
      setIsGuardarDisabled(
        !(
          selectedProfile.name &&
          selectedProfile.last_name &&
          selectedProfile.age_range &&
          selectedProfile.relationship
        )
      );
    }
  }, [selectedProfile]);

  const handleRelationshipSelect = (option) => {
    console.log("Option selected:", option);
    setSelectedRelationship(option);
    setIsOpen(false);
  };

  return (
    <Modal
      show={show}
      closeModal={onHide}
      title="Editar perfil"
      contentStyle={{ height: "calc(80% - 2rem)", maxHeight: "781px" }}
    >
      <Col>
        <div className={styles.buttons__container}>
          <div className={`${styles.form__floating} form-floating`}>
            <label>Nombre:</label>
            <input
              type="text"
              className={`${styles.form__control} form-control`}
              value={selectedProfile?.name || ""}
              onChange={(e) =>
                setSelectedProfile({
                  ...selectedProfile,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className={`${styles.form__floating} form-floating`}>
            <label>Apellido:</label>
            <input
              type="text"
              className={`${styles.form__control} form-control`}
              value={selectedProfile?.last_name || ""}
              onChange={(e) =>
                setSelectedProfile({
                  ...selectedProfile,
                  last_name: e.target.value,
                })
              }
            />
          </div>
          <div className={`${styles.form__floating} form-floating`}>
            <label className={styles.input__label}>Rango de edad</label>
            <select
              className={`${styles.form__control} form-control`}
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
          <div className={`${styles.form__floating} form-floating`}>
            <label>Relación:</label>
            {/* <select
                className={`${styles.form__control} form-control`}
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
              </select> */}
            <SelectButton
              label={selectedProfile?.relationship || ""}
              isOpen={isOpen}
              toggleDropdown={toggleDropdown}
              options={relationships.map((relationship) => ({
                value: relationship.relationship_id,
                label: relationship.relationship_name,
              }))}
              handleOptionSelect={handleRelationshipSelect}
              selectedOption={selectedRelationship}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              label="Guardar"
              disabled={isGuardarDisabled}
              className="btn primary__button"
              onClick={handleSaveChanges}
            />
          </div>
        </div>
      </Col>
    </Modal>
  );
}

export default EditProfileModal;
