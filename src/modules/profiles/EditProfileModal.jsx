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
  const [selectedAgeRange, setSelectedAgeRange] = useState("");
  const [selectedRelationship, setSelectedRelationship] = useState("");
  const [isOpenAgeRange, setIsOpenAgeRange] = useState(false); // Estado para controlar la visibilidad del selector de rango de edad
  const [isOpenRelationship, setIsOpenRelationship] = useState(false);


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

  const handleAgeRangeSelect= (option) => {
    console.log("Option selected:", option);
    setSelectedAgeRange(option);
    setIsOpenAgeRange(false);
  };

  const handleRelationshipSelect = (option) => {
    console.log("Option selected:", option);
    setSelectedRelationship(option);
    setIsOpenRelationship(false);
  };

  const toggleAgeRangeDropdown = () => {
    setIsOpenAgeRange(!isOpenAgeRange);
  };
  
  const toggleRelationshipDropdown = () => {
    setIsOpenRelationship(!isOpenRelationship);
  };


  return (
    <Modal
      show={show}
      closeModal={onHide}
      title="Editar perfil"
      contentStyle={{ height: "calc(90% - 2rem)", maxHeight: "781px" }}
    >
      <Col>
        <div className={styles.buttons__container}>

        <label>Nombre</label>
          <div className={`${styles.form__floating} `}>
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

          <label>Apellido</label>
          <div className={`${styles.form__floating}`}>
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
          <label className={styles.input__label}>Rango de edad</label>
          <div className={`${styles.form__floating} form-floating`}>
      
             {/* 
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
            </select> */}
            <SelectButton
              label={selectedProfile?.age_range || ""}
              isOpen={isOpenAgeRange}
              toggleDropdown={toggleAgeRangeDropdown}
              options={ageRanges.map((ageRange) => ({
                value: ageRange.age_range_id,
                label: ageRange.name,
              }))}
              handleOptionSelect={handleAgeRangeSelect}
              selectedOption={selectedAgeRange}
            />
         
          </div>

          <label>Relación</label>
          <div className={`${styles.form__floating} form-floating`}>
           
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
              isOpen={isOpenRelationship}
              toggleDropdown={toggleRelationshipDropdown}
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
