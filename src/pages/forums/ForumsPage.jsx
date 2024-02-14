import React, { useEffect, useState } from "react";
import AsideLogin from "../../modules/asideLogin/AsideLogin";
import { Col, Button, Modal } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import Search from "../../components/search/Search";
import Nav from "../../modules/nav/Nav";
import NavLoggedOut from "../../modules/navLoggedOut/NavLoggedOut";
import LoginMobile from "../../modules/loginMobile/LoginMobile";
import EventSnipet from "../../modules/eventSnipet/EventSnipet";
import EditPostModal from "../../modules/post/EditPostModal";
import UserSuggestions from "../../modules/userSuggestions/UserSuggestions";
import Links from "../../components/link/Links";
import PageTitle from "../../components/pageTitle/PageTitle";
import styles from "./forumsPage.module.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

function ForumsPage() {
  const [user] = useAuthState(auth);
  const token = localStorage.getItem("token");
  const tokenExists = token !== null && token !== undefined;
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [messageEditing, setMessageEditing] = useState(null);
  const [eventTypes, setEventTypes] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [originalPost, setOriginalPost] = useState(null);
  const { forum_id } = useParams();
  const [forumData, setForumData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserData(decoded);
    }
  }, []);

  useEffect(() => {
    const fetchForumData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/forums/${forum_id}`
        );
        if (response.ok) {
          const forumData = await response.json();
          setForumData(forumData);
        }
        if (response.status === 404) {
          navigate("/notFound");
          console.error("El foro no existe.");
        } else {
          console.error("Error fetching forum data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching forum data:", error);
      }
    };

    fetchForumData();
  }, [forum_id, navigate]);

  useEffect(() => {
    const fetchEventTypes = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/eventTypes");
        if (response.ok) {
          const eventData = await response.json();
          setEventTypes(eventData.data);
        } else {
          console.error("Error fetching event types:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching event types:", error);
      }
    };

    fetchEventTypes();
  }, []);

  const handleSendMessage = async () => {
    try {
      const formData = new FormData();
      formData.append("message", message);
      formData.append("forum_id", forum_id);
      if (Array.isArray(imageFiles)) {
        imageFiles.forEach((file, index) => {
          formData.append(`image`, file);
        });
      }

      const response = await fetch("http://localhost:8080/api/v1/messages", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        window.location.reload();
      } else {
        alert("Hubo un error al enviar el mensaje.");
        throw new Error("Hubo un error al enviar el mensaje.");
      }
    } catch (error) {
      console.error("Error al enviar el mensaje:", error.message);
    }
  };

  const handleEditMessage = (message) => {
    setMessageEditing(message);
    setMessage("");
  };

  const handleCancelEdit = () => {
    setMessageEditing(null);
    setMessage("");
    setImageFiles([]);
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/messages/${messageId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        alert("El mensaje se ha eliminado correctamente.");
        console.log("El mensaje se ha eliminado correctamente.");
      } else {
        alert("Error al intentar eliminar el mensaje.");
        console.error(
          "Error al intentar eliminar el mensaje:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error al intentar eliminar el mensaje:", error);
    }
  };

  const confirmDeleteMessage = (message) => {
    setMessageToDelete(message);
    setShowDeleteModal(true);
    console.log("setShowDeleteModalStatus", showDeleteModal);
  };

  const cancelDeleteMessage = () => {
    setShowDeleteModal(false);
    setMessageToDelete(null);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const selectedFiles = files.slice(0, 2);
    setImageFiles((prevImageFiles) => {
      const updatedFiles = [...prevImageFiles, ...selectedFiles];
      console.log("Imagenes seleccionadas:", updatedFiles);
      return updatedFiles;
    });
  };

  const addImage = () => {
    if (imageFiles.length >= 2) return;
    document.getElementById("fileInput").click();
  };

  const removeImage = (index) => {
    const updatedImages = [...imageFiles];
    updatedImages.splice(index, 1);
    setImageFiles(updatedImages);
  };

  const handleSaveEditMessage = async () => {
    try {
      const formData = new FormData();
      formData.append("message", messageEditing.message);
      formData.append("forum_id", forum_id);
      if (Array.isArray(imageFiles)) {
        imageFiles.forEach((file, index) => {
          formData.append(`image`, file);
        });
      }

      const response = await fetch(
        `http://localhost:8080/api/v1/messages/${messageEditing.message_id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        window.location.reload();
      } else {
        alert("Hubo un error al enviar el mensaje.");
        throw new Error("Hubo un error al enviar el mensaje.");
      }
    } catch (error) {
      console.error("Error al enviar el mensaje:", error.message);
    }
  };

  const handleEdit = async (post) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/forums/${post.forum_id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const postData = await response.json();
      setSelectedPost(postData);
      setOriginalPost(post);
      setShowEditModal(true);
    } catch (error) {
      console.error("Error fetching post data:", error);
    }
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedPost(null);
    setOriginalPost(null);
  };

  return (
    <>
      {showDeleteModal && (
        <Modal show={showDeleteModal} onHide={cancelDeleteMessage}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar eliminación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>¿Está seguro de que desea eliminar este mensaje?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cancelDeleteMessage}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={() => handleDeleteMessage(messageToDelete.message_id)}
            >
              Confirmar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {!user && !tokenExists && <NavLoggedOut />}
      <div className="contenedor">
        <div className="left__aside">
          {(user || tokenExists) && <Nav user={user?.displayName} />}
        </div>
        <div className="content">
          <div>
            <PageTitle title="Foros" />
          </div>
          {!user && !tokenExists && (
            <Col>
              <LoginMobile />
            </Col>
          )}
          {forumData && forumData.data && (
            <>
              <div>
                <div className={styles.forum_title_container}>
                  <p className={styles.forum_title}>{forumData.data.title}</p>
                  {userData.user_id === forumData.data.user_id && (
                    <div className={styles.edit_button_container}>
                      <Button onClick={() => handleEdit(forumData.data)}>
                        Editar
                      </Button>
                    </div>
                  )}
                </div>
                <p className={styles.forum_description}>
                  {forumData.data.description}
                </p>
                <div>
                  <p> Regalo para: {forumData.data.profile.name}</p>
                  <p> Rango de Edad: {forumData.data.profile.age_range} </p>
                  <p> Relacion: {forumData.data.profile.relationship} </p>
                  <p>Intereses:</p>
                  <ul>
                    {forumData.data.profile.interests.map((interest) => (
                      <li key={interest.interest_id}>{interest.interest}</li>
                    ))}
                  </ul>
                </div>
              </div>
              {forumData && forumData.data && forumData.data.messages && (
                <ul>
                  {forumData.data.messages.map((message) => (
                    <li
                      className={styles.forum_message_item}
                      key={message.message_id}
                    >
                      {messageEditing &&
                      messageEditing.message_id === message.message_id ? (
                        <div className={styles.edit_message_panel}>
                          <textarea
                            className={styles.text_area}
                            rows="4"
                            cols="50"
                            value={messageEditing ? messageEditing.message : ""}
                            onChange={(e) =>
                              setMessageEditing({
                                ...messageEditing,
                                message: e.target.value,
                              })
                            }
                          ></textarea>
                          <div>
                            {imageFiles.map((file, index) => (
                              <div key={index}>
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={`Imagen ${index}`}
                                  style={{
                                    maxWidth: "100px",
                                    maxHeight: "100px",
                                  }}
                                />
                                <Button
                                  className={styles.remove_button}
                                  onClick={() => removeImage(index)}
                                >
                                  Quitar
                                </Button>
                              </div>
                            ))}
                          </div>
                          <Button
                            className={styles.send_button}
                            onClick={handleSaveEditMessage}
                          >
                            Guardar Cambios
                          </Button>
                          <Button
                            className={styles.cancel_button}
                            onClick={handleCancelEdit}
                          >
                            Cancelar
                          </Button>
                        </div>
                      ) : (
                        <>
                          <p className={styles.forum_message}>
                            {message.message}
                          </p>
                          <p className={styles.forum_username}>
                            {message.user_name}
                          </p>
                          <p className={styles.forum_date}>{message.date}</p>
                          {message.image &&
                            Array.isArray(message.image) &&
                            message.image.length > 0 && (
                              <div>
                                {message.image.map((img, index) => (
                                  <img
                                    key={index}
                                    src={`http://localhost:8080/images/messages/${img}`}
                                    alt={`Imagen ${index}`}
                                    style={{
                                      maxWidth: "100px",
                                      maxHeight: "100px",
                                    }}
                                  />
                                ))}
                              </div>
                            )}
                          {userData && message.user_id === userData.user_id && (
                            <div>
                              <button
                                onClick={() => handleEditMessage(message)}
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => confirmDeleteMessage(message)}
                              >
                                Eliminar
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
          {tokenExists && (
            <div style={{ marginTop: "20px" }}>
              <textarea
                className={styles.text_area}
                rows="4"
                cols="50"
                placeholder="Escribe tu mensaje..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <br />
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="fileInput"
                onChange={handleImageChange}
              />
              <div>
                <Button className={styles.send_button} onClick={addImage}>
                  Agregar Imagen
                </Button>
                {imageFiles.map((file, index) => (
                  <div key={index}>
                    <img
                      src={file ? URL.createObjectURL(file) : ""}
                      alt={`Imagen ${index + 1}`}
                      width="50"
                      height="50"
                    />
                    <Button
                      className={styles.remove_button}
                      onClick={() => removeImage(index)}
                    >
                      Quitar
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                className={styles.send_button}
                onClick={handleSendMessage} // Función para enviar el mensaje
              >
                Enviar
              </Button>
            </div>
          )}
        </div>
        <aside className="right__aside">
          <div className="container pt-2">
            {(user || tokenExists) && <Search />}
            {!user && !tokenExists && <AsideLogin />}
            {(user || tokenExists) && (
              <div>
                <EventSnipet />
                <UserSuggestions />
                <div className="mt-5 d-flex justify-content-center ">
                  <Links
                    title="Post nuevo regalo"
                    url="/nuevoRegalo"
                    type={"primary"}
                  />
                </div>
              </div>
            )}
          </div>
        </aside>
        <EditPostModal
          show={showEditModal}
          onHide={handleCloseModal}
          selectedPost={selectedPost}
          setSelectedPost={setSelectedPost}
          originalPost={originalPost}
          handleCloseModal={handleCloseModal}
        />
      </div>
    </>
  );
}

export default ForumsPage;
