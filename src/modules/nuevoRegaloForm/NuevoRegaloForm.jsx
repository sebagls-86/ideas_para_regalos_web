import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import styles from "./nuevoRegaloForm.module.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "../../components/button/Button";
import MyIcon from "../../components/myIcon/MyIcon";
import SelectButton from "../../components/selectButton/SelectButton";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { fetchEventTypes } from "../api/api";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import ModalLogin from "../modalLogin/ModalLogin";

function NuevoRegaloForm({ selectedProfile }) {
  console.log("selectedProfile:", selectedProfile);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [eventTypes, setEventTypes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const decoded = token ? jwtDecode(token) : null; // Decodificar el token solo si no es nulo
  const userId = decoded ? decoded.user_id : null;

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
    const day = selectedDate.getDate().toString().padStart(2, "0"); // Agregar ceros a la izquierda si es necesario
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0"); // Agregar ceros a la izquierda si es necesario
    const year = selectedDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    if (selectedOption && selectedProfile) {
      const eventPostData = {
        event_type_id: selectedOption.value,
        user_id: userId,
        name: titulo,
        date: formattedDate,
      };

      try {
        const eventResponse = await fetch(
          "http://localhost:8080/api/v1/events",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(eventPostData),
          }
        );

        if (!eventResponse.ok) {
          throw new Error("Error al crear el evento");
        }

        const eventData = await eventResponse.json();
        const eventId = eventData.data.event_id;

        const forumPostData = {
          description: descripcion,
          profile_id: selectedProfile.profile_id,
          status: 1,
          event_id: eventId,
          title: titulo,
        };

        const forumResponse = await fetch(
          "http://localhost:8080/api/v1/forums",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(forumPostData),
          }
        );

        if (!forumResponse.ok) {
          throw new Error("Error al crear el foro");
        }

        // Si ambos llamados están OK, muestra un mensaje de éxito y redirige al usuario a la página /perfil/user_id
        alert("Foro creado con éxito");
        // Aquí puedes blanquear el formulario
        setTitulo("");
        setDescripcion("");
        // Redirigir al usuario a la página /perfil/user_id
        navigate(`/perfil/${userId}`);
      } catch (error) {
        // Si hay algún error en alguna de las llamadas fetch, muestra un mensaje de error correspondiente
        if (error.message === "Error al crear el evento") {
          alert("Error al crear el evento");
        } else if (error.message === "Error al crear el foro") {
          alert("Error al crear el foro");
        } else {
          console.error("Error al crear el foro:", error);
        }
      }
    } else {
      // Si no se ha seleccionado un evento o un perfil, muestra un mensaje de alerta
      console.error(
        "Por favor, seleccione un evento y un perfil antes de enviar el formulario."
      );
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // Cerrar el menú desplegable cuando se selecciona una opción
  };

  const isDisabled =
    !selectedProfile || // Verifica si no se ha seleccionado un evento
    !selectedDate || // Verifica si no se ha seleccionado una fecha
    titulo.trim() === "" || // Verifica si el título está vacío
    descripcion.trim() === "" ||
    !selectedOption;

  const options = eventTypes.map((eventType) => ({
    label: eventType.name,
    value: eventType.event_type_id,
    profileId: eventType.profileId, // Agregar el profileId al objeto de opciones
  }));

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className={styles.formContainer}>
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
              <Form.Group className="mb-3" controlId="formBasicEmail">
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
            eventKey="calendario"
            title={
              <span className={styles.span}>
                <MyIcon name="calendar" /> Fecha
              </span>
            }
          >
            <Calendar value={selectedDate} onChange={handleDateChange} />
          </Tab>
          <Tab
            eventKey="evento"
            title={
              <span className={styles.span}>
                <MyIcon name="event" /> Evento
              </span>
            }
          >
            <div>
              <Form.Control
                type="text"
                placeholder="Buscar evento"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className={styles.selectEvent}>
              <SelectButton
                label="Elegir evento"
                isOpen={isOpen}
                toggleDropdown={toggleDropdown}
                options={filteredOptions}
                selectedOption={selectedOption}
                handleOptionSelect={handleOptionSelect}
              />
            </div>
          </Tab>
        </Tabs>
        <>
          {token && (
            <div className={styles.buttons__container}>
              <Button
                label="Crear"
                disabled={isDisabled}
                className="btn primary__button"
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
        {showModal && (
          <ModalLogin closeModal={() => setShowModal(false)} />
        )}
      </div>
    </>
  );
}

export default NuevoRegaloForm;
