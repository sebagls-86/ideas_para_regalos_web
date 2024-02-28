import React, { useState, useEffect } from "react";
import Nav from "../../modules/nav/Nav";
import { auth } from "../../utils/firebase";
import { Col } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import Search from "../../components/search/Search";
import styles from "./nuevoRegaloPage.module.css";
import LoginMobile from "../../modules/loginMobile/LoginMobile";
import NavBar from "../../modules/navBar/NavBar";
import AsideLogin from "../../modules/asideLogin/AsideLogin";
import EventSnipet from "../../modules/eventSnipet/EventSnipet";
import UserSuggestions from "../../modules/userSuggestions/UserSuggestions";
import Links from "../../components/link/Links";
import PageTitle from "../../components/pageTitle/PageTitle";
import SelectButton from "../../components/selectButton/SelectButton";
import NuevoRegaloForm from "../../modules/nuevoRegaloForm/NuevoRegaloForm";
import ModalCreateProfile from "../../modules/modalCreateProfile/ModalCreateProfile";
import jwtDecode from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";
import ModalLogin from "../../modules/modalLogin/ModalLogin";

function NuevoRegaloPage() {
  const [user] = useAuthState(auth);
  const [isOpen, setIsOpen] = useState(false);
  const [profilesData, setProfilesData] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showNewProfileModal, setShowNewProfileModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [tokenExists, setTokenExists] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : null;
  const userId = decoded ? decoded.user_id : null;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (decoded === null || decoded === undefined) {
      setTokenExists(false);
      setShowInput(true);
    } else {
      setTokenExists(true);
      setShowInput(false);
    }
  }, [decoded]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const profileId = searchParams.get("profileId");

    if (profileId && profilesData.length > 0) {
      const selectedProfile = profilesData.find(
        (profile) => profile.profile_id === parseInt(profileId)
      );
      if (selectedProfile) {
        setSelectedOption({
          label: `${selectedProfile.name} ${selectedProfile.last_name}`,
          value: selectedProfile.profile_id,
        });
        setSelectedProfile(selectedProfile);
      }
    }
  }, [location.search, profilesData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          setShowLoginModal(true); // Abre el modal de inicio de sesión si no hay token
          return;
        }

        let url = `http://localhost:8080/api/v1/profiles/user/${userId}`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (response.ok) {
          if (Array.isArray(data.data) && data.data.length > 0) {
            const processedData = data.data.map((profile) => ({
              ...profile,
              editing: false,
            }));
            setProfilesData(processedData);
          } else if (typeof data.data === "object" && data.data !== null) {
            setProfilesData([{ ...data.data, editing: false }]);
            setSelectedProfile({ ...data.data, editing: false });
          } else {
            setProfilesData([]);
          }
        }

        if (response.status === 400) {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [userId, navigate, token]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    if (option.value === "Open Modal") {
      setShowNewProfileModal(true); // Abre el modal para 'Crear nuevo'
    } else {
      setSelectedOption(option);
      setIsOpen(false);
      const selectedProfile = profilesData.find(
        (profile) => profile.profile_id === parseInt(option.value)
      );
      setSelectedProfile(selectedProfile);
    }
  };

  const handleCloseModal = () => {
    setShowNewProfileModal(false);
  };

  const options = [
    { label: "Crear nuevo", value: "Open Modal", type: "link", link: "#modal" },
    ...profilesData.map((profile) => ({
      label: `${profile.name} ${profile.last_name}`,
      value: profile.profile_id,
    })),
  ];

 return (
  <>
    {!user && !tokenExists }
    <NavBar />
    <div className="contenedor">
      <div className="left__aside">{(user || tokenExists) && <Nav />}</div>
      <div className="content">
        <PageTitle title="Nuevo regalo" />
        <Col>
          <LoginMobile />
        </Col>
        <div className={styles.content}>
          <div className="d-flex gap-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="54"
              height="54"
              viewBox="0 0 54 54"
              fill="none"
            >
              {/* SVG paths */}
            </svg>
            <p>¿Para quién es el regalo?</p>
          </div>
          {showInput && !tokenExists && (
            <input
              type="text"
              placeholder="Ingrese el nombre de la persona"
              // Agrega cualquier otra lógica necesaria
            />
          )}
          {(user || tokenExists) && (
            <div className={styles.select_user_container}>
              <SelectButton
                label="Elegir persona"
                isOpen={isOpen}
                toggleDropdown={toggleDropdown}
                options={options}
                handleOptionSelect={handleOptionSelect}
                selectedOption={selectedOption}
              />
            </div>
          )}
          <NuevoRegaloForm selectedProfile={selectedProfile} />
          {showNewProfileModal && (
            <ModalCreateProfile
              show={showNewProfileModal}
              onHide={handleCloseModal}
              handleCloseNewProfileModal={handleCloseModal}
            />
          )}
          {showLoginModal && (
            <ModalLogin
              closeModal={() => setShowLoginModal(false)}
            />
          )}
        </div>
        
      </div>
      <aside className="right__aside">
        <div className="container pt-2">
          {(user || tokenExists) && <Search />}
          {!(user || tokenExists) && <AsideLogin />}{" "}
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
    </div>
  </>
);
}

export default NuevoRegaloPage;
