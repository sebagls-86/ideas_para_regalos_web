import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import styles from "./nuevoRegaloForm.module.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "../../components/button/Button";
import MyIcon from "../../components/myIcon/MyIcon";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { fetchEventTypes, fetchGiftsRateSuggestions } from "../api/api";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import ModalSuggestions from "./ModalSuggestions";
import ResponseModal from "../../components/modal/ResponseModal";
import SearchDropdown from "../../components/selectButton/SearchDropdown";
import { useAuth0 } from "@auth0/auth0-react";


function NuevoRegaloForm({ selectedProfile }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [eventTypes, setEventTypes] = useState([]);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCalendar, setShowCalendar] = useState(true);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [showSuggestionsModal, setShowSuggestionsModal] = useState(false);
  const [giftsRateSuggestions, setGiftsRateSuggestions] = useState(null);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [redirectToProfile, setRedirectToProfile] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { logout } = useAuth0();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

  const userId =
    (localStorage.getItem("userInfo") &&
      JSON.parse(localStorage.getItem("userInfo")).data.user_id) ||
    null;
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchEventTypesData = async () => {
      try {
        const fetchedEventTypes = await fetchEventTypes();
        setEventTypes(fetchedEventTypes);
      } catch (error) {
        console.error("Error fetching available interests:", error);
      }
    };

    fetchEventTypesData();
  }, []);

  const handleCreateForum = async () => {
    try {
      const ageRange = selectedProfile.age_range;
      const interests = selectedProfile.interests.map(
        (interest) => interest.interest
      );

      const suggestions = await fetchGiftsRateSuggestions(ageRange, interests);

      if (suggestions && suggestions.length > 0) {
        setGiftsRateSuggestions(suggestions);
        setShowSuggestionsModal(true);
      } else {
        createForum();
      }
    } catch (error) {
      console.error("Error fetching gifts rate suggestions:", error);
    }
  };

  const createForum = async () => {
    
    let endFormattedDate = null;

    if (selectedEndDate) {
      const endDay = selectedEndDate.getDate().toString().padStart(2, "0");
      const endMonth = (selectedEndDate.getMonth() + 1)
        .toString()
        .padStart(2, "0");
      const endYear = selectedEndDate.getFullYear();
      endFormattedDate = `${endDay}/${endMonth}/${endYear}`;
    }

    if (selectedOption && selectedProfile) {
      let eventName = "";
      if (selectedOption.label === "Otro") {
        eventName = inputValue;
      }
      const eventPostData = {
        event_type_id: selectedOption.value,
        user_id: userId,
        name: eventName,
      };

      try {
        const eventResponse = await fetch(`${API_URL}/events`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(eventPostData),
        });

        if (!eventResponse.ok) {
          setErrorMessage("Error al crear el evento.");
          setShowResponseModal(true);
          throw new Error("Error al crear el evento");
        }

        if (eventResponse.status === 401 && eventResponse.message === "Token is expired.") {
          setErrorMessage("Su sesión expiró. Por favor, vuelva a iniciar sesión.");
          setShowResponseModal(true);
          await sleep(3000);
          logout();
          return;
        }

        const eventData = await eventResponse.json();
        const eventId = eventData.data.event_id;

        const forumPostData = {
          description: descripcion,
          profile_id: selectedProfile.profile_id,
          status: 1,
          event_id: eventId,
          title: titulo,
          end_date: endFormattedDate,
        };

        const forumResponse = await fetch(`${API_URL}/forums`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(forumPostData),
        });

        if (!forumResponse.ok) {
          setErrorMessage("Error al crear el foro.");
          setShowResponseModal(true);
          throw new Error("Error al crear el foro");
        }

        setSuccessMessage("Foro creado exitosamente.");
        setRedirectToProfile(true);
        setShowResponseModal(true);
        setTitulo("");
        setDescripcion("");
      } catch (error) {
        if (error.message === "Error al crear el evento") {
          setErrorMessage("Error al crear el foro.");
        } else if (error.message === "Error al crear el foro") {
          setErrorMessage("Error al crear el foro.");
        } else {
          setErrorMessage("Error al crear el foro.");
          console.error("Error al crear el foro:", error);
        }
      }
    } else {
      console.error(
        "Por favor, seleccione un evento y un perfil antes de enviar el formulario."
      );
    }
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const handleCheckboxChange = (event) => {
    setShowCalendar(!event.target.checked);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const isDisabled =
    !selectedProfile ||
    titulo.trim() === "" ||
    descripcion.trim() === "" ||
    !selectedOption ||
    (selectedOption?.label === "Otro" && !inputValue.trim());

  const options = eventTypes.map((eventType) => ({
    label: eventType.name,
    value: eventType.event_type_id,
    profileId: eventType.profileId,
  }));

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <ResponseModal
        show={showResponseModal}
        onHide={() => setShowResponseModal(false)}
        message={successMessage || errorMessage}
        onConfirm={() => {
          setShowResponseModal(false);
          if (successMessage && redirectToProfile) {
            navigate(`/perfil/${userId}`);
          }
        }}
        confirmButtonText="Aceptar"
      />
      <div className={styles.formContainer}>
        {showSuggestionsModal && (
          <ModalSuggestions
            closeModal={() => setShowSuggestionsModal(false)}
            suggestions={giftsRateSuggestions}
            onCancel={() => setShowSuggestionsModal(false)}
            createForum={createForum}
          />
        )}
        <Tabs defaultActiveKey="publicar" id="uncontrolled-tab-example">
          <Tab
            eventKey="publicar"
            title={
              <span className={styles.span}>
                <MyIcon name="write" /> Post
              </span>
            }
          >
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  id="titulo"
                  className={styles.inputTitulo}
                  placeholder="Titulo"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
                <Form.Control
                  as="textarea"
                  aria-label="With textarea"
                  className={styles.inputTexto}
                  placeholder="Texto"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Tab>
          <Tab
            eventKey="evento"
            title={
              <span className={styles.span}>
                <MyIcon name="event" /> Evento
              </span>
            }
          >
            {/*
            <div className={styles.event_search}>
              <Form.Control
                type="text"
                placeholder="Buscar evento"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
          </div>*/}
            <div className={styles.selectEvent}>
           
                <SearchDropdown
                label="Elegir evento"
                isOpen={isOpen}
                toggleDropdown={toggleDropdown}
                options={filteredOptions}
                selectedOption={selectedOption}
                handleOptionSelect={handleOptionSelect}
                className={styles.event_select}
              />
              {selectedOption?.label === "Otro" && (
                <div>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Ingresá otro evento"
                    className={styles.input_new_event}
                  />
                </div>
              )}
            </div>
          </Tab>
          <Tab
            eventKey="endDate"
            title={
              <span className={styles.span}>
                <MyIcon name="calendar" /> Fecha límite
              </span>
            }
            className="form-tab"
          >
            <div className={styles.date_container}>
              <p style={{ marginBottom: "0rem" }}>
                ¿Hasta cuándo recibís sugerencias?
              </p>
              <p>
                <input
                  type="checkbox"
                  onChange={handleCheckboxChange}
                  checked={!showCalendar}
                />
                Dejar post siempre abierto
              </p>
              {showCalendar && (
                <Calendar
                  value={selectedEndDate}
                  onChange={handleEndDateChange}
                  className={styles.calendar}
                />
              )}
            </div>
          </Tab>
         
        </Tabs>
        <>
          {token && (
            <div className={styles.buttons__container}>
              <Button
                label="Crear"
                disabled={isDisabled}
                className={`${styles.post_btn} btn primary__button`}
                onClick={handleCreateForum}
              />
            </div>
          )}
          {!token && (
            <div className={styles.buttons__container}>
              <Button
                label="Login"
                className="btn primary__button"
                onClick={() => setShowModal(true)}
              />
            </div>
          )}
        </>
        {giftsRateSuggestions && (
          <Modal
            showModal={showModal}
            closeModal={() => setShowModal(false)}
            title="Sugerencias de tarifas de regalo"
            content={giftsRateSuggestions.map((suggestion, index) => (
              <div key={index}>
                <p>{suggestion.name}</p>
                <p>{suggestion.description}</p>
                <Button
                  label="Crear"
                  className="btn primary__button"
                  onClick={createForum}
                />
                <Button
                  label="No Crear"
                  className="btn secondary__button"
                  onClick={() => setShowModal(false)}
                />
              </div>
            ))}
          />
        )}
      </div>
    </>
  );
}

export default NuevoRegaloForm;
