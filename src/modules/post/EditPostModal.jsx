import React, { useState, useEffect } from "react";
import Modal from "../../components/modal/Modal";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import styles from "./css/post.module.css";
import ResponseModal from "../../components/modal/ResponseModal";
import SelectButton from "../../components/selectButton/SelectButton";

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
  const [errorMessage, setErrorMessage] = useState("");
  const [redirectToHome, setRedirectToHome] = useState(false);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;
  const [isEventTypeDropdownOpen, setIsEventTypeDropdownOpen] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEventTypes = async () => {
      try {
        const response = await fetch(
          `${API_URL}/eventTypes`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setEventTypes(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching event types:", error);
        setIsLoading(false);
      }
    };

    const handleOptionSelect = (option, type) => {
    setForm((prevForm) => ({
      ...prevForm,
      [type]: option.value,
    }));

    if (type === "selectedAgeRange") {
      setEventTypeOption(option);
      setEventTypeDropdownOpen(false);
    } 
  };
    fetchEventTypes();
  }, [token]);

  useEffect(() => {
    if (selectedPost && selectedPost.event) {
      const initialEventType = eventTypes.find(
        (eventType) => eventType.name === selectedPost.event
      );
      setSelectedEventType(initialEventType);
    }
  }, [selectedPost, eventTypes]);

  const fetchProfiles = async (selectedPost) => {
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
      console.error("Error fetching profiles:", error);
    }
  };
  
  useEffect(() => {
    fetchProfiles(selectedPost);
  }, []);

  const handleEventTypeChange = (eventTypeId) => {
    const selectedEventType = eventTypes.find(
      (type) => type.event_type_id === parseInt(eventTypeId)
    );

    setSelectedPost({
      ...selectedPost,
      event: selectedEventType.name,
      event_type_id: selectedEventType.event_type_id,
    });
  };

  const handleSaveChanges = async () => {
    try {
      const updatedFields = {};
      if (
        selectedEventType &&
        selectedPost.data.event !== selectedEventType.name
      ) {
        setSelectedPost({
          ...selectedPost,
          event_type_id: selectedEventType.event_type_id,
        });
        const eventResponse = await fetch(
          `${API_URL}/events/${selectedPost.data.event_id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              event_type_id: selectedEventType.event_type_id,
            }),
          }
        );

        if (!eventResponse.ok) {
          setErrorMessage("Error al actualizar el evento");
          setShowResponseModal(true);
          return;
        }
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
          setErrorMessage(
            "Error al los datos del foro"
          );
          setShowResponseModal(true);
          console.error("Error al los datos del foro");
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
                  className={`${styles.form__control, styles.edit_description} form-control`}
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
              <div>
              <label className={styles.input__label}>Tipo de Evento:</label>
              <div className={`${styles.form__floating} form-floating`}>
                    <SelectButton
              label="Edad"
              isOpen={isEventTypeDropdownOpen}
              options={(ageRanges || []).map((ageRange) => ({
                label: ageRange.name,
                value: ageRange.age_range_id,
              }))}
              handleOptionSelect={(option) =>
                handleEventTypeChange(option, "selectedEventTypeRange")
              }
              selectedOption={selectedEventTypeOption}
              toggleDropdown={() => setIsEventTypeDropdownOpen(!isEventTypeDropdownOpen)}
            />
                <SelectButton
                 label="Edad"
              isOpen={isEventTypeDropdownOpen}
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
                          selectedPost.data.event === eventType.name
                        }
                      >
                        {eventType.name}
                      </option>
                    ))
                  )}
                </SelectButton>
              </div>
              </div>

              <div>
              <label>Perfil:</label>
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
              </div>
              </div>
            </form>
            <div style={{ marginTop: "1rem" }}>
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
