import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner, Modal, Button } from "react-bootstrap";
//import { useAuthState } from "react-firebase-hooks/auth";
//import { auth } from "../../utils/firebase";
import Nav from "../../modules/nav/Nav";
import { Col } from "react-bootstrap";
import PageTitle from "../../components/pageTitle/PageTitle";
import styles from "./myAccountPage.module.css";
import ProfileNav from "../../components/profileNav/ProfileNav";
import EventSnipet from "../../modules/eventSnipet/EventSnipet";
import UserSuggestions from "../../modules/userSuggestions/UserSuggestions";
import Links from "../../components/link/Links";
import jwtDecode from "jwt-decode";

function MyAccountPage() {
  //const [firebaseAuth] = useAuthState(auth);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [formChanges, setFormChanges] = useState({});
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [avatarFile, setAvatarFile] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [bannerFile, setBannerFile] = useState(null);
  const [showBannerModal, setShowBannerModal] = useState(false);
  const { user_id } = useParams();
  const user__id = parseInt(user_id);

  const token = localStorage.getItem("token");

  const decoded = jwtDecode(token);
  const userId = decoded.user_id;

  console.log("renderizando MyAccountPage");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `http://localhost:8080/api/v1/users/${user__id}`;
        if (userId !== user__id) {
          url = `http://localhost:8080/api/v1/users/public/${user__id}`;
        }

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setUserData(data.data);
        setIsLoading(false);

        if (response.status === 400) {
          navigate("/");
          localStorage.removeItem("token");
          console.log("Error 400");
          return;
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [user__id, token, navigate, userId]);

  const handleEditClick = () => {
    setShowModal(true);
  };

  let buttonElement;
  if (userId !== user__id) {
    buttonElement = (
      <Button label="Seguir" className={styles.custom__button}>
        Seguir
      </Button>
    );
  } else {
    buttonElement = (
      <Button
        label="Editar"
        className={styles.custom__button}
        onClick={handleEditClick}
      >
        Editar
      </Button>
    );
  }

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();

      // Agrega solo los campos modificados al FormData
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
        alert("Cambios guardados");
        window.location.reload();

        setShowImageModal(false);
        setShowModal(false);
      } else {
        if (response.status === 400) {
          alert("Error 400");
          console.log("Error 400");
          setShowImageModal(false);
          setShowModal(false);
          return;
        }
      }
    } catch (error) {
      alert("Error al guardar los cambios");
      console.error("Error saving user data:", error);
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

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && userData && (
        <div className="contenedor">
          <div className="left__aside">{token && <Nav />}</div>
          <div className="content">
            <PageTitle title="Perfil" />
            <Col className="d-flex justify-content-center">
              <img
                src={`http://localhost:8080${userData.banner}`}
                alt="banner"
                className={styles.perfil_banner}
                width={"60px"}
                height={"250px"}
                onClick={handleBannerModalOpen}
              />
            </Col>
            <img
              src={`http://localhost:8080${userData.avatar}`}
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
              </div>
              {buttonElement}
            </div>

            <ProfileNav></ProfileNav>
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
                value={userData ? userData.name : ""}
                onChange={(e) => {
                  handleInputChange("name", e.target.value);
                  setUserData({ ...userData, name: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Apellido</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={userData ? userData.last_name : ""}
                onChange={(e) => {
                  handleInputChange("name", e.target.value);
                  setUserData({ ...userData, last_name: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="userName">Nombre de usuario</label>
              <input
                type="text"
                className="form-control"
                id="userName"
                value={userData ? userData.user_name : ""}
                onChange={(e) => {
                  handleInputChange("name", e.target.value);
                  setUserData({ ...userData, user_name: e.target.value });
                }}
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
              <label htmlFor="avatar">Seleccionar nueva imagen:</label>
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
      ;
    </>
  );
}

export default MyAccountPage;
