import React, { useState, useEffect } from "react";
import Modal from "../../components/modal/Modal";
import styles from "./modalCreateProfile.module.css";
import { Col } from "react-bootstrap";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import SelectButton from "../../components/selectButton/SelectButton";
import { fetchAvailableInterests, fetchAgeRanges, fetchRelationships } from "../api/api";

function ModalCreateProfile({
  show,
  onHide,
  handleCloseNewProfileModal,
  handleSaveNewProfile,
}) {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    selectedAgeRange: "",
    selectedRelationship: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [ageRanges, setAgeRanges] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [interests, setInterests] = useState([]);
  const [relationships, setRelationships] = useState([]);
  const [availableInterests, setAvailableInterests] = useState([]);
  const [isAgeDropdownOpen, setIsAgeDropdownOpen] = useState(false);
  const [isRelationshipDropdownOpen, setIsRelationshipDropdownOpen] =
    useState(false);
  const [isGuardarDisabled, setIsGuardarDisabled] = useState(true);
  const [selectedAgeOption, setSelectedAgeOption] = useState(null);
  const [selectedRelationshipOption, setSelectedRelationshipOption] =
    useState(null);
  const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
      const fetchAvailableInterests = async () => {
        try {
          const response = await fetch(`${API_URL}/interests`);
          if (response.ok) {
            const data = await response.json();
            setInterests(data.data);
            setAvailableInterests(data.data);
          }
        } catch (error) {
          console.error("Error fetching available interests:", error);
        }
      };
  
      fetchAvailableInterests();
    }, []);

    const  handleToggleInterest = (interest) => {
        const isInterestSelected = selectedInterests.some(
          (selectedInterest) =>
            selectedInterest.interest_id === interest.interest_id
        );
    
        if (isInterestSelected) {
          const updatedInterests = selectedInterests.filter(
            (selectedInterest) =>
              selectedInterest.interest_id !== interest.interest_id
          );
          setSelectedInterests(updatedInterests);
        } else {
          setSelectedInterests([...selectedInterests, interest]);
        }
      };
    

    useEffect(() => {
      const fetchData = async () => {
        try {
          const ageRanges = await fetchAgeRanges();
          setAgeRanges(ageRanges);
        } catch (error) {
          console.error("Error fetching age ranges:", error);
        }
      };
    
      fetchData();
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const relationships = await fetchRelationships();
          setRelationships(relationships);
        } catch (error) {
          console.error("Error fetching age ranges:", error);
        }
      };
  
      fetchData();
    }, []);
  
    useEffect(() => {
      const fetchInterests = async () => {
        try {
          const interests = await fetchAvailableInterests();
          setInterests(interests);
        } catch (error) {
          console.error("Error fetching available interests:", error);
        }
      };
  
      fetchInterests();
    }, []);

  useEffect(() => {
    setIsGuardarDisabled(
      !(
        form.name &&
        form.lastName &&
        form.selectedAgeRange &&
        form.selectedRelationship
      )
    );
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleOptionSelect = (option, type) => {
    setForm((prevForm) => ({
      ...prevForm,
      [type]: option.value,
    }));

    if (type === "selectedAgeRange") {
      setSelectedAgeOption(option);
      setIsAgeDropdownOpen(false);
    } else if (type === "selectedRelationship") {
      setSelectedRelationshipOption(option);
      setIsRelationshipDropdownOpen(false);
    }
  };

  const handleClose = () => {
    setForm({
      name: "",
      lastName: "",
      selectedAgeRange: "",
      selectedRelationship: "",
    });
    setSelectedAgeOption(null);
    setSelectedRelationshipOption(null);
    onHide();
    handleCloseNewProfileModal();
    setCurrentStep(1);
    setIsAgeDropdownOpen(false);
    setIsRelationshipDropdownOpen(false);
  };

  const handleCreateProfile = () => {
    const newProfile = {
      name: form.name,
      last_name: form.lastName,
      age_range_id: parseInt(form.selectedAgeRange, 10),
      relationship_id: parseInt(form.selectedRelationship, 10),
      selectedInterests: Object.values(selectedInterests).map(
        (interest) => interest.interest_id
      ),
    };
    handleSaveNewProfile(newProfile);
  };

  const getTitleForStep = () => {
    switch (currentStep) {
      case 1:
        return "¿Para quién es el regalo?";
      case 2:
        return "¿Sus intereses?";
      default:
        return "¿Para quién es el regalo?";
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <Input
              type="text"
              name="name"
              placeholder="Nombre"
              required="required"
              label="Nombre"
              value={form.name}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="lastName"
              placeholder="Apellido"
              required="required"
              label="Apellido"
              value={form.lastName}
              onChange={handleChange}
            />
              <SelectButton
              label="Edad"
              isOpen={isAgeDropdownOpen}
              options={(ageRanges || []).map((ageRange) => ({
                label: ageRange.name,
                value: ageRange.age_range_id,
              }))}
              handleOptionSelect={(option) =>
                handleOptionSelect(option, "selectedAgeRange")
              }
              selectedOption={selectedAgeOption}
              toggleDropdown={() => setIsAgeDropdownOpen(!isAgeDropdownOpen)}
            />
           <SelectButton
              label="Relación"
              isOpen={isRelationshipDropdownOpen}
              options={(relationships || []).map((relationship) => ({
                label: relationship.relationship_name,
                value: relationship.relationship_id,
              }))}
              handleOptionSelect={(option) =>
                handleOptionSelect(option, "selectedRelationship")
              }
              selectedOption={selectedRelationshipOption}
              toggleDropdown={() =>
                setIsRelationshipDropdownOpen(!isRelationshipDropdownOpen)
              }
            />
          </>
        );
      case 2:
        return (
          <>
            <p className={styles.interest_description}>
              Elegí 4 o más tópicos de su interés para poder buscar mejores
              recomendaciones.
            </p>
            <div className={styles.scrollable_div}>
              {interests?.map((interest) => (
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
            <Button
              label="Finalizar"
              className="btn primary__button"
              disabled={selectedInterests.length < 4}
              onClick={handleCreateProfile}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      closeModal={handleClose}
      title={getTitleForStep()}
      show={show}
      onHide={onHide}
    >
      <Col>
        <div className={styles.buttons__container}>
          {renderStepContent()}
          {currentStep === 1 && (
            <Button
              label="Siguiente"
              disabled={isGuardarDisabled}
              className="btn primary__button"
              onClick={handleNextStep}
            />
          )}
        </div>
      </Col>
    </Modal>
  );
}

export default ModalCreateProfile;
