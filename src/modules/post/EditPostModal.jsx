import React, { useState, useEffect } from "react";
import Modal from "../../components/modal/Modal";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import styles from "./css/post.module.css";

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
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEventTypes = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/eventTypes",
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

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        if (!selectedPost) return; // Verificar si selectedPost es null
        let url = `http://localhost:8080/api/v1/profiles/user/${selectedPost.data.user_id}`;

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
            alert("Su sesión ha expirado. Por favor, inicie sesión nuevamente");
            localStorage.removeItem("token");
            navigate("/");
            return;
          } else {
            alert("Error al obtener perfiles");
            console.error("Error al obtener perfiles:", response.statusText);
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
        console.error("Error fetching profiles:", error);
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, [selectedPost, token, navigate]);

  const handleEventTypeChange = (eventTypeId) => {
    // Encuentra el tipo de evento seleccionado por su ID
    const selectedEventType = eventTypes.find(
      (type) => type.event_type_id === parseInt(eventTypeId)
    );

    // Actualiza selectedPost con el nuevo tipo de evento
    setSelectedPost({
      ...selectedPost,
      event: selectedEventType.name,
      event_type_id: selectedEventType.event_type_id,
    });
  };

  const handleSaveChanges = async () => {
    try {
      const updatedFields = {}; // Objeto para almacenar los campos actualizados

      if (
        selectedEventType &&
        selectedPost.data.event !== selectedEventType.name
      ) {
        setSelectedPost({
          ...selectedPost,
          event_type_id: selectedEventType.event_type_id,
        });
        const eventResponse = await fetch(
          `http://localhost:8080/api/v1/events/${selectedPost.data.event_id}`,
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
          console.error("Error al actualizar el evento");
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
          `http://localhost:8080/api/v1/forums/${selectedPost.data.forum_id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedFields), // Envía solo los campos actualizados
          }
        );

        if (!forumResponse.ok) {
          console.error("Error al actualizar el perfil, título o descripción");
          return;
        }
      }

      window.location.reload();
      console.log("Editado correctamente");
    } catch (error) {
      console.error("Error al enviar la solicitud de edición:", error);
    }
  };

  const handleEventChange = (e) => {
    setSelectedProfileId(parseInt(e.target.value));
  };

  return (
    <Modal
      show={show}
      closeModal={onHide}
      title="Editar Foro"
      contentStyle={{ height: "calc(80% - 2rem)", maxHeight: "781px" }}
    >
      <Col>
        <div className={styles.buttons__container}>
          <form>
            <div className={`${styles.form__floating} form-floating`}>
              <label>Titulo:</label>
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
            <div className={`${styles.form__floating} form-floating`}>
              <label>Descripción:</label>
              <textarea
                className={`${styles.form__control} form-control`}
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
            <div className={`${styles.form__floating} form-floating`}>
              <label className={styles.input__label}>Tipo de Evento:</label>
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
                        selectedPost.data.event === eventType.name
                      }
                    >
                      {eventType.name}
                    </option>
                  ))
                )}
              </select>
            </div>
            <div className={`${styles.form__floating} form-floating`}>
              <label>Perfil:</label>
              <select
                className={`${styles.form__control} form-control`}
                value={selectedProfileId}
                onChange={handleEventChange}
              >
                {profiles &&
                  profiles.map((profile) => (
                    <option key={profile.profile_id} value={profile.profile_id}>
                      {profile.name} {profile.last_name}
                    </option>
                  ))}
              </select>
            </div>
          </form>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              label="Guardar"
              className="btn primary__button"
              onClick={handleSaveChanges}
            />
          </div>
        </div>
      </Col>
    </Modal>
  );
}

export default EditPostModal;
