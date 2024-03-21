import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner, Modal, Button } from "react-bootstrap";
import Nav from "../../modules/nav/Nav";
import { Col } from "react-bootstrap";
import PageTitle from "../../components/pageTitle/PageTitle";
import styles from "./myAccountPage.module.css";
import ProfileNav from "../../components/profileNav/ProfileNav";
import EventSnipet from "../../modules/eventSnipet/EventSnipet";
import UserSuggestions from "../../modules/userSuggestions/UserSuggestions";
import Links from "../../components/link/Links";
import ResponseModal from "../../components/modal/ResponseModal";
import { useAuth0 } from "@auth0/auth0-react";

function MyAccountPage({ userInfo }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [formChanges, setFormChanges] = useState({});
  const [userData, setUserData] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [bannerFile, setBannerFile] = useState(null);
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { user_id } = useParams();
  const user__id = parseInt(user_id);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const token = localStorage.getItem("token");
  const userId =
    (localStorage.getItem("userInfo") &&
      JSON.parse(localStorage.getItem("userInfo")).data.user_id) ||
    null;

  const [followingUsers, setFollowingUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `http://localhost:8080/api/v1/users/${user__id}`;
        if (!token || userId !== user__id) {
          url = `http://localhost:8080/api/v1/users/public/${user__id}`;
        }

        const headers = {};
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
        });

        const data = await response.json();
        setUserData(data.data);

        if (response.status === 400) {
          console.log("Error 400");
          return;
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/error");
      }
    };

    fetchData();

    // Fetch following users
    const fetchFollowingUsers = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/relations/following/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setFollowingUsers(data.data);
        } else {
          console.error("Error fetching following users:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching following users:", error);
      }
    };

    fetchFollowingUsers();
  }, [user__id, token, navigate, userId]);

  const isUserFollowing = () => {
    return followingUsers.some((user) => user.user_id === user__id);
  };

  const handleEditClick = () => {
    setShowModal(true);
    setFormChanges({});
  };

  const handleFollow = async () => {
    try {
      if (isUserFollowing()) {
        const response = await fetch(
          `http://localhost:8080/api/v1/relations/${user__id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          console.log("Solicitud DELETE exitosa");
          const updatedFollowingUsers = followingUsers.filter(
            (user) => user.user_id !== user__id
          );
          setFollowingUsers(updatedFollowingUsers);
        } else {
          console.error(
            "Error al realizar la solicitud DELETE:",
            response.statusText
          );
        }
      } else {
        const response = await fetch(
          `http://localhost:8080/api/v1/relations/${user__id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          console.log("Solicitud POST exitosa");
          const updatedFollowingUsers = [
            ...followingUsers,
            { user_id: user__id },
          ];
          setFollowingUsers(updatedFollowingUsers);
        } else {
          console.error(
            "Error al realizar la solicitud POST:",
            response.statusText
          );
        }
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();

      for (const key in formChanges) {
        formData.append(key, formChanges[key]);
      }

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      if (bannerFile) {
        formData.append("banner", bannerFile);
      }

      if (Object.keys(formChanges).length === 0 && !avatarFile && !bannerFile) {
        setShowModal(false);
        return;
      }

      const response = await fetch(
        `http://localhost:8080/api/v1/users/${userId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        setSuccessMessage("Cambios guardados");
        setShowImageModal(false);
        setShowModal(false);
        setShowResponseModal(true);
      } else {
        setErrorMessage("Error al guardar los cambios");
        setShowImageModal(false);
        setShowModal(false);
        setShowResponseModal(true);
      }
    } catch (error) {
      setErrorMessage("Error al guardar los cambios");
      setShowModal(false);
      setShowResponseModal(true);
    }
  };

  const handleInputChange = (key, value) => {
    setFormChanges({ ...formChanges, [key]: value });
  };

  const handleAvatarChange = (event) => {
    setAvatarFile(event.target.files[0]);
  };

  const handleImageModalOpen = () => {
    setShowImageModal(true);
  };

  const handleBannerChange = (event) => {
    setBannerFile(event.target.files[0]);
  };

  const handleBannerModalOpen = () => {
    setShowBannerModal(true);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  if (isLoading) {
    return <Spinner animation="border" />;
  }

  if (!userData && !isLoading) {
    return <Spinner animation="border" />;
  }

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && userData && (
        <div className="contenedor">
          <div className="left__aside">{isAuthenticated && <Nav />}</div>
          <div className="content">
            <PageTitle title="Perfil" />
            <Col className="d-flex justify-content-center">
              <img
                src={userData.banner}
                alt="banner"
                className={styles.perfil_banner}
                width={"60px"}
                height={"250px"}
                onClick={handleBannerModalOpen}
              />
            </Col>
            <img
              src={userData.avatar}
              alt="avatar"
              width={"100px"}
              height={"100px"}
              className={styles.profile_picture}
              onClick={handleImageModalOpen}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className={styles.profile_info_container}>
                <h4>{userData.name}</h4>
                <p>{userData.user_name}</p>
                <p>{userData.birth_date}</p>
              </div>
              {userId !== user__id ? (
                isUserFollowing() ? (
                  <Button
                    label="Seguir"
                    className={styles.custom__button}
                    onClick={handleFollow}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {isHovered ? "Dejar de seguir" : "Siguiendo"}
                  </Button>
                ) : (
                  <Button
                    label="Seguir"
                    className={styles.custom__button}
                    onClick={handleFollow}
                  >
                    Seguir
                  </Button>
                )
              ) : (
                <Button
                  label="Editar"
                  className={styles.custom__button}
                  onClick={handleEditClick}
                >
                  Editar
                </Button>
              )}
            </div>

            <ProfileNav userInfo={userInfo}></ProfileNav>
          </div>
          <aside className="right__aside">
            <div className="container pt-2">
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
            </div>
          </aside>
        </div>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={formChanges.name || userData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Apellido</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={formChanges.last_name || userData.last_name}
                onChange={(e) => handleInputChange("last_name", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="userName">Nombre de usuario</label>
              <input
                type="text"
                className="form-control"
                id="userName"
                value={formChanges.user_name || userData.user_name}
                onChange={(e) => handleInputChange("user_name", e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button
            variant="primary"
            onClick={handleSaveChanges}
            disabled={isLoading}
          >
            {isLoading ? "Guardando..." : "Guardar"}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showImageModal} onHide={() => setShowImageModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Imagen de Perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label
                htmlFor="
avatar"
              >
                Seleccionar nueva imagen:
              </label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                id="avatar"
                onChange={handleAvatarChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowImageModal(false)}>
            Cerrar
          </Button>
          <Button
            variant="primary"
            onClick={handleSaveChanges}
            disabled={isLoading}
          >
            {isLoading ? "Guardando..." : "Guardar"}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showBannerModal} onHide={() => setShowBannerModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Banner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="banner">Seleccionar nueva imagen:</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                id="banner"
                onChange={handleBannerChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBannerModal(false)}>
            Cerrar
          </Button>
          <Button
            variant="primary"
            onClick={handleSaveChanges}
            disabled={isLoading}
          >
            {isLoading ? "Guardando..." : "Guardar"}
          </Button>
        </Modal.Footer>
      </Modal>
      <ResponseModal
        show={showResponseModal}
        onHide={() => setShowResponseModal(false)}
        message={successMessage || errorMessage}
        onConfirm={() => {
          setShowResponseModal(false);
          setSuccessMessage("");
          setErrorMessage("");
        }}
        confirmButtonText="Aceptar"
      />
    </>
  );
}

export default MyAccountPage;
