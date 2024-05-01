import React, { useState, useEffect } from "react";
import Modal from "../../components/modal/Modal";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import styles from "./css/post.module.css";
import ResponseModal from "../../components/modal/ResponseModal";
import expandDown from "../../assets/expand-icon.svg";
import { useAuth0 } from "@auth0/auth0-react";
import Calendar from "react-calendar";
import { format } from "date-fns";

function EditPostModal({
  show,
  onHide,
  selectedPost,
  setSelectedPost,
  originalPost,
  handleCloseModal,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [eventTypes, setEventTypes] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [selectedEventType, setSelectedEventType] = useState(null);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [otherEventName, setOtherEventName] = useState(
    originalPost?.event_name || ""
  );
  const { logout } = useAuth0();
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const token = localStorage.getItem("token");

  console.log(originalPost);
  console.log("selected post", selectedPost);

  useEffect(() => {
    const fetchEventTypes = async () => {
      try {
        const response = await fetch(`${API_URL}/eventTypes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setEventTypes(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching event types:", error);
        setIsLoading(false);
      }
    };

    fetchEventTypes();
  }, [token]);

  useEffect(() => {
    if (selectedPost && selectedPost.data.event_name) {
      const initialEventType = eventTypes.find(
        (eventType) => eventType.name === selectedPost.data.event_name
      );
      setSelectedEventType(initialEventType);
    }
  }, [selectedPost, eventTypes]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        if (!selectedPost) return;
        let url = `${API_URL}/profiles/user/${selectedPost.data.user_id}`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const responseBody = await response.text();
          if (responseBody.includes("invalid token")) {
            setErrorMessage(
              "Su sesión ha expirado. Por favor, inicie sesión nuevamente"
            );
            localStorage.removeItem("token");
            localStorage.removeItem("userInfo");
            logout();
            setShowResponseModal(true);
            setRedirectToHome(true);
            return;
          } else {
            setErrorMessage("Error al obtener perfiles");
            setShowResponseModal(true);
            return;
          }
        }

        const data = await response.json();
        setProfiles(data.data);
        setIsLoading(false);

        if (selectedPost.data.profile.profile_id) {
          setSelectedProfileId(selectedPost.data.profile.profile_id);
        }
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, [selectedPost, token, navigate]);

  useEffect(() => {
    if (originalPost && originalPost.event_date) {
      const eventDateParts = originalPost.event_date.split("/");
      const year = parseInt(eventDateParts[2]);
      const month = parseInt(eventDateParts[1]) - 1;
      const day = parseInt(eventDateParts[0]);
      setSelectedDate(new Date(year, month, day));
    }
  }, [originalPost]);

  useEffect(() => {
    if (originalPost && originalPost.end_date) {
      const eventDateParts = originalPost.end_date.split("/");
      const year = parseInt(eventDateParts[2]);
      const month = parseInt(eventDateParts[1]) - 1;
      const day = parseInt(eventDateParts[0]);
      setSelectedEndDate(new Date(year, month, day));
    }
  }, [originalPost]);

  const handleEventTypeChange = (eventTypeId) => {
    const selectedEventType = eventTypes.find(
      (type) => type.event_type_id === parseInt(eventTypeId)
    );

    setSelectedPost({
      ...selectedPost,
      data: {
        ...selectedPost.data,
        event_name: selectedEventType.name,
        event_type_id: selectedEventType.event_type_id,
      },
    });
  };

  const handleSaveChanges = async () => {
    try {
      const updatedFields = {};

      // Verificar si la fecha del evento ha sido modificada
      if (selectedDate) {
        const formattedDate = format(selectedDate, "dd/MM/yyyy");
        if (formattedDate !== originalPost.event_date) {
          updatedFields.date = formattedDate;
        }
      }

      if (
        selectedEventType &&
        selectedPost.data.event_name !== selectedPost.event
      ) {
        setSelectedPost({
          ...selectedPost,
          event_type_id: selectedEventType.event_type_id,
        });
        updatedFields.event_type_id = selectedPost.event_type_id;
        updatedFields.name = otherEventName || selectedPost.data.event;
      }

      if (originalPost.event_name !== otherEventName) {
        updatedFields.name = otherEventName;
      }

      if (
        selectedProfileId !== originalPost.profile.profile_id ||
        selectedPost.data.title !== originalPost.title ||
        selectedPost.data.description !== originalPost.description
      ) {
        if (selectedProfileId !== originalPost.profile.profile_id) {
          updatedFields.profile_id = selectedProfileId;
        }
        if (selectedPost.data.title !== originalPost.title) {
          updatedFields.title = selectedPost.data.title;
        }
        if (selectedPost.data.description !== originalPost.description) {
          updatedFields.description = selectedPost.data.description;
        }
      }

      if (originalPost.end_date !== "0" && selectedEndDate) {
        const formattedEndDate = format(selectedEndDate, "dd/MM/yyyy");
        if (formattedEndDate !== originalPost.end_date) {
          updatedFields.end_date = formattedEndDate;
        }
      }

      // Realizar el llamado a events solo si hay cambios en el tipo de evento o la fecha del evento
      if (
        Object.keys(updatedFields).length > 0 &&
        (updatedFields.event_type_id ||
          updatedFields.date ||
          updatedFields.name)
      ) {
        const eventResponse = await fetch(
          `${API_URL}/events/${selectedPost.data.event_id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedFields),
          }
        );

        if (!eventResponse.ok) {
          setErrorMessage("Error al actualizar el evento");
          setShowResponseModal(true);
          return;
        }
      }

      // Realizar el llamado a forums si hay cambios en el perfil, el título, la descripción o la fecha de finalización
      if (
        Object.keys(updatedFields).length > 0 &&
        (updatedFields.title ||
          updatedFields.description ||
          updatedFields.end_date ||
          updatedFields.profile_id)
      ) {
        const forumResponse = await fetch(
          `${API_URL}/forums/${selectedPost.data.forum_id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedFields),
          }
        );

        if (!forumResponse.ok) {
          setErrorMessage("Error al actualizar los datos del foro");
          setShowResponseModal(true);
          console.error("Error al actualizar los datos del foro");
        }
      }

      handleCloseModal();
      window.location.reload();
    } catch (error) {
      setErrorMessage("Error al enviar la solicitud de edición");
      console.error("Error al enviar la solicitud de edición:", error);
    }
  };

  const handleEventChange = (e) => {
    setSelectedProfileId(parseInt(e.target.value));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  useEffect(() => {
    const isOriginalEventNamePresent = eventTypes.some(
      (type) => type.name === originalPost?.event_name
    );

    setOtherEventName(
      isOriginalEventNamePresent ? "" : originalPost?.event_name
    );
  }, [originalPost, eventTypes]);

  return (
    <>
      <ResponseModal
        show={showResponseModal}
        onHide={() => setShowResponseModal(false)}
        message={successMessage || errorMessage}
        onConfirm={() => {
          setShowResponseModal(false);
          if (successMessage && redirectToHome) {
            navigate(`/`);
          }
        }}
        confirmButtonText="Aceptar"
      />

      <Modal
        show={show}
        closeModal={onHide}
        title="Editar Foro"
        /*contentStyle={{ height: "calc(80% - 2rem)", maxHeight: "781px" }}*/
      >
        <Col>
          <div className={styles.buttons__container}>
            <form className={styles.edit_form}>
              <div>
                <label>Título:</label>
                <div className={`${styles.form__floating} form-floating`}>
                  <input
                    type="text"
                    className={`${styles.form__control} form-control`}
                    value={selectedPost?.data.title || ""}
                    onChange={(e) =>
                      setSelectedPost({
                        ...selectedPost,
                        data: {
                          ...selectedPost.data,
                          title: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <label>Descripción:</label>
                <div className={`${styles.form__floating} form-floating`}>
                  <textarea
                    className={`${
                      (styles.form__control, styles.edit_description)
                    } form-control`}
                    value={selectedPost?.data.description || ""}
                    onChange={(e) =>
                      setSelectedPost({
                        ...selectedPost,
                        data: {
                          ...selectedPost.data,
                          description: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
              <div className={styles.event_date_form}>
                <div>
                  <label>Fecha del Evento:</label>
                  <div >
                    <input
                      type="text"
                      className={`${styles.form__control} ${styles.event_date_input} form-control`}
                      value={
                        selectedDate ? format(selectedDate, "dd/MM/yyyy") : ""
                      }
                      onClick={() => setShowCalendar(true)}
                    />
                    {showCalendar && (
                      <Calendar
                        onChange={handleDateChange}
                        value={selectedDate}
                        onClickDay={() => setShowCalendar(false)}
                        className={styles.event_date_calendar}
                      />
                    )}
                  </div>
                </div>
                <div>
                  <label>Fecha de Finalización:</label>
                  {originalPost?.end_date !== "0" && (
                    <div >
                      <input
                        type="text"
                        className={`${styles.form__control} form-control`}
                        value={
                          selectedEndDate
                            ? format(selectedEndDate, "dd/MM/yyyy")
                            : ""
                        }
                        onClick={() => setShowEndCalendar(true)}
                      />
                      {showEndCalendar && (
                        <Calendar
                          onChange={handleEndDateChange}
                          value={selectedEndDate}
                          onClickDay={() => setShowEndCalendar(false)}
                          className={styles.event_date_calendar}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className={styles.input__label}>Tipo de Evento:</label>
                <div className={`${styles.form__floating} form-floating`}>
                  <select
                    className={`${styles.form__control} form-control`}
                    onChange={(e) => handleEventTypeChange(e.target.value)}
                  >
                    {isLoading ? (
                      <option value="">Cargando...</option>
                    ) : (
                      eventTypes.map((eventType) => (
                        <option
                          key={eventType.event_type_id}
                          value={eventType.event_type_id}
                          selected={
                            selectedPost &&
                            selectedPost.data.event_name === eventType.name
                          }
                        >
                          {eventType.name}
                        </option>
                      ))
                    )}
                  </select>
                  <div className={styles.selectIcon}>
                    <img src={expandDown} alt="Expand Icon" />
                  </div>
                </div>
              </div>
              {selectedPost &&
                (selectedPost.data?.event_name === "Otro" ||
                  !eventTypes.some(
                    (eventType) =>
                      eventType.name === selectedPost.data?.event_name
                  )) && (
                  <div className={`${styles.form__floating} form-floating`}>
                    <label>Otro tipo de evento:</label>
                    <input
                      type="text"
                      className={`${styles.form__control} form-control`}
                      value={otherEventName || ""}
                      onChange={(e) => setOtherEventName(e.target.value)}
                    />
                    {otherEventName && (
                      <span
                        className="text-danger"
                        style={{ cursor: "pointer" }}
                        onClick={() => setOtherEventName("")}
                      >
                        Borrar
                      </span>
                    )}
                    {!otherEventName && (
                      <span
                        className="text-primary"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          setOtherEventName(originalPost.event_name)
                        }
                      >
                        Restaurar
                      </span>
                    )}
                  </div>
                )}

              <div>
                <label>Perfil:</label>
                <div className={`${styles.form__floating} form-floating`}>
                  <div className={`${styles.form__floating} form-floating`}>
                    <select
                      className={`${styles.form__control} form-control`}
                      value={selectedProfileId}
                      onChange={handleEventChange}
                    >
                      {profiles &&
                        profiles.map((profile) => (
                          <option
                            key={profile.profile_id}
                            value={profile.profile_id}
                          >
                            {profile.name} {profile.last_name}
                          </option>
                        ))}
                    </select>
                    <div className={styles.selectIcon}>
                      <img src={expandDown} alt="Expand Icon" />
                    </div>
                  </div>
                </div>
              </div>

          
            </form>
            <div style={{ marginTop: "2rem" }}>
              <Button
                label="Guardar"
                className="btn primary__button"
                onClick={handleSaveChanges}
              />
            </div>
          </div>
        </Col>
      </Modal>
    </>
  );
}

export default EditPostModal;
