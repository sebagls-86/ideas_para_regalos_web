import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

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
  }, [selectedPost, token]);

  const handleEventTypeChange = (eventTypeId) => {
    // Encuentra el tipo de evento seleccionado por su ID
    const selectedEventType = eventTypes.find((type) => type.event_type_id === parseInt(eventTypeId));
  
    // Actualiza selectedPost con el nuevo tipo de evento
    setSelectedPost({
      ...selectedPost,
      event: selectedEventType.name,
      event_type_id: selectedEventType.event_type_id
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
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Editar perfil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label>Titulo:</label>
            <input
              type="text"
              className="form-control"
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
          <div className="form-group">
            <label>Descripción:</label>
            <textarea
              className="form-control"
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
          <div className="form-group">
  <label htmlFor="eventTypeSelect">Tipo de Evento:</label>
  <select
    id="eventTypeSelect"
    className="form-control"
    onChange={(e) => handleEventTypeChange(e.target.value)}
  >
    {isLoading ? (
      <option value="">Cargando...</option>
    ) : (
      eventTypes.map((eventType) => {
        return (
          <option
            key={eventType.event_type_id}
            value={eventType.event_type_id}
            selected={
              selectedPost && selectedPost.data.event === eventType.name
            }
          >
            {eventType.name}
          </option>
        );
      })
    )}
  </select>
</div>
          <div className="form-group">
            <label>Perfil:</label>
            <select
              id="profileSelect"
              className="form-control"
              value={selectedProfileId}
              onChange={handleEventChange}
            >
              {profiles.map((profile) => (
                <option key={profile.profile_id} value={profile.profile_id}>
                  {profile.name} {profile.last_name}
                </option>
              ))}
            </select>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer
        style={{ display: "flex", justifyContent: "space-between" }}
      >
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

export default EditPostModal;
