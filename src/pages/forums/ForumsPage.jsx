import React, { useEffect, useState } from "react";
import AsideLogin from "../../modules/asideLogin/AsideLogin";
import { Row, Button, Modal } from "react-bootstrap";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Search from "../../components/search/Search";
import Nav from "../../modules/nav/Nav";
import NavBar from "../../modules/navBar/NavBar";
import LoginMobile from "../../modules/loginMobile/LoginMobile";
import EventSnipet from "../../modules/eventSnipet/EventSnipet";
import EditPostModal from "../../modules/post/EditPostModal";
import UserSuggestions from "../../modules/userSuggestions/UserSuggestions";
import Links from "../../components/link/Links";
import PageTitle from "../../components/pageTitle/PageTitle";
import styles from "./forumsPage.module.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ResponseModal from "../../components/modal/ResponseModal";
import { useAuth0 } from "@auth0/auth0-react";
import { Widgets } from "@mui/icons-material";
import { IoClose } from "react-icons/io5";
import { RiImageAddFill } from "react-icons/ri";
import { FiMessageSquare } from "react-icons/fi";

function ForumsPage() {
  const { user, isAuthenticated } = useAuth0();
  const token = localStorage.getItem("token");
  const tokenExists = token !== null && token !== undefined;
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [messageEditing, setMessageEditing] = useState(null);
  const [forumLikesData, setForumLikesData] = useState(null);
  const [messageLikesData, setMessageLikesData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [eventTypes, setEventTypes] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [originalPost, setOriginalPost] = useState(null);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { forum_id } = useParams();
  const [forumData, setForumData] = useState(null);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const userId =
    (localStorage.getItem("userInfo") && userInfo.data.user_id) || null;

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const forumResponse = await fetch(`${API_URL}/forums/${forum_id}`);
        if (forumResponse.ok) {
          const forumData = await forumResponse.json();
          setForumData(forumData);
        } else if (forumResponse.status === 404) {
          navigate("/notFound");
          console.error("El foro no existe.");
        } else {
          console.error(
            "Error al obtener los datos del foro:",
            forumResponse.statusText
          );
        }

        const messageLikesResponse = await fetch(
          `${API_URL}/messages/likes/${userId}`
        );
        if (messageLikesResponse.ok) {
          const messageLikesData = await messageLikesResponse.json();
          setMessageLikesData(messageLikesData);
        }

        const forumLikesResponse = await fetch(
          `${API_URL}/forums/likes/${userId}`
        );
        if (forumLikesResponse.ok) {
          const forumLikesData = await forumLikesResponse.json();
          setForumLikesData(forumLikesData);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, [forum_id, userId, navigate]);

  useEffect(() => {
    const fetchEventTypes = async () => {
      try {
        const response = await fetch(`${API_URL}/eventTypes`);
        if (response.ok) {
          const eventData = await response.json();
          setEventTypes(eventData.data);
        } else {
          setErrorMessage("Hubo un error al obtener los tipos de evento.");
          setShowResponseModal(true);
        }
      } catch (error) {
        setErrorMessage("Hubo un error al obtener los tipos de evento.");
        setShowResponseModal(true);
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

      const response = await fetch(`${API_URL}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        window.location.reload();
      } else {
        setErrorMessage("Hubo un error al enviar el mensaje.");
        setShowResponseModal(true);
        throw new Error("Hubo un error al enviar el mensaje.");
      }
    } catch (error) {
      setErrorMessage("Hubo un error al enviar el mensaje.");
      setShowResponseModal(true);
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
      const response = await fetch(`${API_URL}/messages/${messageId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const updatedMessages = forumData.data.messages.filter(
          (message) => message.message_id !== messageId
        );
        const updatedForumData = { ...forumData };
        updatedForumData.data.messages = updatedMessages;
        setForumData(updatedForumData);

        alert("El mensaje se ha eliminado correctamente.");
        setShowDeleteModal(false);
      } else {
        setErrorMessage("Error al intentar eliminar el mensaje.");
        setShowDeleteModal(false);
        setShowResponseModal(true);
      }
    } catch (error) {
      setShowDeleteModal(false);
    }
  };

  const confirmDeleteMessage = (message) => {
    setMessageToDelete(message);
    setShowDeleteModal(true);
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
        `${API_URL}/messages/${messageEditing.message_id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        window.location.reload();
      } else {
        setErrorMessage("Hubo un error al enviar el mensaje.");
        setShowResponseModal(true);
      }
    } catch (error) {
      console.error("Error al enviar el mensaje:", error.message);
    }
  };

  const handleEdit = async (post) => {
    try {
      const response = await fetch(`${API_URL}/forums/${post.forum_id}`);
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

  const handleLikePost = async (postId) => {
    if (isLoggedIn) {
      try {
        const updatedLikesData = await fetch(
          `${API_URL}/forums/${postId}/like`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (updatedLikesData.ok) {
          const updatedLikesResponse = await updatedLikesData.json();
          console.log("updatedLikesResponse", updatedLikesResponse);

          const updatedForumData = { ...forumData };
          const likesCount = updatedLikesResponse.data.likes || 0;
          updatedForumData.data.likes = likesCount;

          setForumData(updatedForumData);

          const updatedUserLikesResponse = await fetch(
            `${API_URL}/forums/likes/${userId}`
          );
          if (!updatedUserLikesResponse.ok) {
            throw new Error("Network response was not ok");
          }
          const updatedUserLikesData = await updatedUserLikesResponse.json();
          console.log("updatedUserLikesData", updatedUserLikesData);

          setForumLikesData(updatedUserLikesData);
        } else {
          console.error("Failed to like post");
        }
      } catch (error) {
        console.error("Error liking post:", error);
      }
    } else {
      setOpenModal(true);
    }
  };

  const handleLikeMessage = async (messageId) => {
    if (isLoggedIn) {
      try {
        const updatedLikesData = await fetch(
          `${API_URL}/messages/${messageId}/like`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (updatedLikesData.ok) {
          const updatedLikesResponse = await updatedLikesData.json();
          console.log("updatedLikesResponse", updatedLikesResponse);

          // Actualizar los datos del mensaje con la nueva cantidad de likes
          const updatedForumData = { ...forumData };
          const updatedMessages = updatedForumData.data.messages.map(
            (message) => {
              if (message.message_id === messageId) {
                return {
                  ...message,
                  likes: updatedLikesResponse.data.likes || 0,
                };
              }
              return message;
            }
          );
          updatedForumData.data.messages = updatedMessages;

          setForumData(updatedForumData);

          // Actualizar los datos de los likes del usuario
          const updatedUserLikesResponse = await fetch(
            `${API_URL}/messages/likes/${userId}`
          );
          if (!updatedUserLikesResponse.ok) {
            throw new Error("Network response was not ok");
          }
          const updatedUserLikesData = await updatedUserLikesResponse.json();

          setMessageLikesData(updatedUserLikesData);
        } else {
          console.error("Failed to like message");
        }
      } catch (error) {
        console.error("Error liking message:", error);
      }
    } else {
      setOpenModal(true);
    }
  };

  return (
    <>
      <ResponseModal
        show={showResponseModal}
        onHide={() => setShowResponseModal(false)}
        message={successMessage || errorMessage}
        onConfirm={() => {
          setShowResponseModal(false);
          setSuccessMessage(null);
          setErrorMessage(null);
        }}
        confirmButtonText="Aceptar"
      />
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
      {!user && !tokenExists}
      <NavBar />
      <div className="contenedor">
        <div className="left__aside">
          {isAuthenticated && <Nav userInfo={userInfo} />}
        </div>
        <div className="content">
          <div>
            <PageTitle title="Foros" />
          </div>

          {forumData && forumData.data && (
            <>
              <div className={styles.user_info}>
                <img
                  src={forumData.data.avatar}
                  alt="avatar"
                  className={styles.profile_picture}
                />

                <div>
                  <p className={styles.name}>{forumData.data.name}</p>
                  <p>@{forumData.data.user_name}</p>
                </div>
              </div>
              <div className={styles.forum_content}>
                <p className={styles.forum_title}>{forumData.data.title}</p>

                <ul className={styles.forum_tags}>
                  <li>{forumData.data.profile.name}</li>
                  <li> {forumData.data.profile.relationship} </li>
                  <li> {forumData.data.profile.age_range} </li>
                  {forumData.data.profile.interests.map((interest) => (
                    <li key={interest.interest_id}>{interest.interest}</li>
                  ))}
                </ul>
                {userId &&
                  userId === forumData.data.user_id &&
                  forumData.data.status === 1 && (
                    <div className={styles.edit_post_button}>
                      <Button onClick={() => handleEdit(forumData.data)}>
                        Editar
                      </Button>
                    </div>
                  )}

                <p className={styles.forum_description}>
                  {forumData.data.description}
                </p>

                <div
                  className={styles.actions__content}
                  onClick={() => handleLikePost(forumData.data.forum_id)}
                >
                  {forumLikesData &&
                  forumLikesData.data &&
                  forumLikesData.data.some(
                    (like) => like.forum_id === forumData.data.forum_id
                  ) ? (
                    <AiFillHeart fill="red" className={styles.heart_icon} />
                  ) : (
                    <AiOutlineHeart className={styles.heart_icon} />
                  )}
                  <span className={styles.post_tags}>
                    {forumData.data.likes}
                  </span>
                  <FiMessageSquare />
                  <span className={styles.post_tags}>
                  {forumData.data.messages ? forumData.data.messages.length : 0}
                  
                  </span>
                </div>
              </div>

              {forumData &&
                forumData.data &&
                forumData.data.messages &&
                forumData.data.status === 1 && (
                  <ul style={{ marginBottom: '0'}}>
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
                              value={
                                messageEditing ? messageEditing.message : ""
                              }
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
                            <div className={styles.message}>
                              <img
                                src={message.avatar}
                                alt="avatar"
                                className={styles.profile_picture}
                              />
                              <div>
                                <p className={styles.name}>{message.name}</p>
                                <p className={styles.forum_username}>
                                  @{message.user_name}
                                </p>
                                <p className={styles.forum_message}>
                                  {message.message}
                                </p>
                                {message.image &&
                                  Array.isArray(message.image) &&
                                  message.image.length > 0 && (
                                    <div  className={styles.message_img_container}>
                                      {message.image.map((img, index) => (
                                        <img
                                          className={styles.message_img}
                                          key={index}
                                          src={`http://localhost:8080/images/messages/${img}`}
                                          alt={`Imagen ${index}`} 
                                          
                                        />
                                      ))}
                                    </div>
                                  )}
                                <p className={styles.forum_date}>
                                  {message.date}
                                </p>
                                <div
                              className={styles.actions__content}
                              onClick={() =>
                                handleLikeMessage(message.message_id)
                              }
                            >
                              {messageLikesData &&
                              messageLikesData.data &&
                              messageLikesData.data.some(
                                (like) => like.message_id === message.message_id
                              ) ? (
                                <AiFillHeart
                                  fill="red"
                                  className={styles.heart_icon}
                                />
                              ) : (
                                <AiOutlineHeart className={styles.heart_icon} />
                              )}
                              <span className={styles.post_tags}>
                                {message.likes}
                              </span>
                            </div>
                              </div>
                            </div>
                            {userId &&
                              message.user_id === userId && (
                                <div>
                                  <button
                                    onClick={() => handleEditMessage(message)}
                                  >
                                    Editar
                                  </button>
                                  <button
                                    onClick={() =>
                                      confirmDeleteMessage(message)
                                    }
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
          {tokenExists &&
            forumData &&
            forumData.data &&
            forumData.data.status === 1 && (
              <div style={{ marginTop: "20px" }}>
                <div className={styles.comment_action}>
                  <img
                    src={userInfo.data.avatar}
                    alt="avatar"
                    className={styles.profile_picture}
                  />
                  <div style={{ width: "100%", paddingRight: "2rem" }}>
                    <textarea
                      className={styles.text_area}
                      rows="4"
                      cols="50"
                      placeholder="Comentar"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    {imageFiles.map((file, index) => (
                      <div key={index} style={{ position: 'relative' }}>
                        <img
                          className={styles.attach_img}
                          src={file ? URL.createObjectURL(file) : ""}
                          alt={`Imagen ${index + 1}`}
                        />
                        <Button
                          className={styles.remove_img_btn}
                          onClick={() => removeImage(index)}
                        >      
                          <IoClose/>
                        </Button>
                      </div>
                    ))}
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      id="fileInput"
                      onChange={handleImageChange}
                    />
                    <div className={styles.comment_buttons}>
                      <Button
                        className={styles.attach_img_btn}
                        onClick={addImage}
                      >
                        {/*Agregar Imagen*/}
                        <RiImageAddFill/>
                      </Button>

                      <Button
                        className={styles.send_button}
                        onClick={handleSendMessage}
                      >
                        Enviar
                      </Button>
                    </div>
                  </div>
                </div>
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
