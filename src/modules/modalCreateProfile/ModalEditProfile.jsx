import React, { useState, useEffect } from "react";
import Modal from "../../components/modal/Modal";
import styles from "../modalCreateProfile/modalCreateProfile.module.css";
import { Col } from "react-bootstrap";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import SelectButton from "../../components/selectButton/SelectButton";
import InputEdit from "../../components/input/InputEdit";

function ModalEditProfile({
  show,
  onHide,
  selectedProfile,
  setSelectedProfile,
  ageRanges,
  relationships,
  handleCloseModal,
  handleSaveChanges,
}) {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    ageRange: "",
    relationship: "",
  });

  useEffect(() => {
    if (selectedProfile) {
      setForm({
        name: selectedProfile.name || "",
        lastName: selectedProfile.last_name || "",
        ageRange: selectedProfile.age_range || "",
        relationship: selectedProfile.relationship || "",
      });
    }
  }, [selectedProfile, show]);

  const [isAgeDropdownOpen, setIsAgeDropdownOpen] = useState(false);
  const [isRelationshipDropdownOpen, setIsRelationshipDropdownOpen] =
    useState(false);
  const [isGuardarDisabled, setIsGuardarDisabled] = useState(true);

  useEffect(() => {
    setIsGuardarDisabled(
      !(form.name && form.lastName && form.ageRange && form.relationship)
    );
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleInputChange = (name, value) => {
    setSelectedProfile({
      ...selectedProfile,
      [name]: value,
    });
  };

  const handleOptionSelect = (option, key) => {
    setForm((prevForm) => ({
      ...prevForm,
      [key]: option.value,
    }));
  };

  const handleClose = () => {
    setForm({
      name: "",
      lastName: "",
      ageRange: "",
      relationship: "",
    });
    onHide();
    handleCloseModal();
  };

  const handleSave = () => {
    const updatedProfile = {
      ...selectedProfile,
      name: form.name,
      last_name: form.lastName,
      age_range: form.ageRange,
      relationship: form.relationship,
    };
    setSelectedProfile(updatedProfile);
    handleSaveChanges(updatedProfile);
    handleClose();
  };

  return (
    <Modal
      closeModal={handleClose}
      title="Editar perfil"
      show={show}
      onHide={onHide}
    >
      <Col>
        <div className={styles.buttons__container}>
          <Input
            type="text"
            name="name"
            placeholder="Nombre"
            required
            label="Nombre"
            onChange={handleChange}
            value={form.name}
          />
          <InputEdit
            type="text"
            name="lastName"
            placeholder="Apellido"
            label="Apellido"
            value={selectedProfile.last_name}
            onChange={(value) => handleInputChange("last_name", value)}
          />
    
          <SelectButton
            label="Edad"
            isOpen={isAgeDropdownOpen}
            options={ageRanges.map((ageRange) => ({
              label: ageRange.name,
              value: ageRange.age_range_id,
            }))}
            handleOptionSelect={(option) =>
              handleOptionSelect(option, "ageRange")
            }
            selectedOption={form.ageRange}
            toggleDropdown={() => setIsAgeDropdownOpen(!isAgeDropdownOpen)}
          />
          <SelectButton
            label="Relación"
            isOpen={isRelationshipDropdownOpen}
            options={relationships.map((relationship) => ({
              label: relationship.relationship_name,
              value: relationship.relationship_id,
            }))}
            handleOptionSelect={(option) =>
              handleOptionSelect(option, "relationship")
            }
            selectedOption={form.relationship}
            toggleDropdown={() =>
              setIsRelationshipDropdownOpen(!isRelationshipDropdownOpen)
            }
          />
        </div>
        <div>
          <Button
            label="Guardar"
            disabled={isGuardarDisabled}
            className="btn primary__button"
            onClick={handleSave}
          />
        </div>
      </Col>
    </Modal>
  );
}

export default ModalEditProfile;
