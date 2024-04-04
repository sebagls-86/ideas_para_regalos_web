import React, { useState, useEffect } from "react";
import Nav from "../../modules/nav/Nav";
import { Col } from "react-bootstrap";
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
import { useNavigate, useLocation } from "react-router-dom";
import ResponseModal from "../../components/modal/ResponseModal";
import { useAuth0 } from "@auth0/auth0-react";


function NuevoRegaloPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [profilesData, setProfilesData] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showNewProfileModal, setShowNewProfileModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showInput] = useState(false);
  const token = localStorage.getItem("token");
  const {isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();
  const userId = (localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo")).data.user_id) || null;
  const API_URL = process.env.REACT_APP_API_URL;  

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
        if (!isAuthenticated) {
          handleLogin();
          return;
        }

        let url = `${API_URL}/profiles/user/${userId}`;

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
  }, [userId, navigate, token, isAuthenticated]);

  const handleLogin = async () => {
    try {
      await loginWithRedirect({ appState: { returnTo: "/" } });
     } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    if (option.value === "Open Modal") {
      setShowNewProfileModal(true);
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

  const handleSaveNewProfile = async (newProfile) => {
    try {
      // Crear el perfil
      const profileResponse = await fetch(
        `${API_URL}/profiles`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            age_range_id: newProfile.age_range_id,
            last_name: newProfile.last_name,
            name: newProfile.name,
            relationship_id: newProfile.relationship_id,
          }),
        }
      );

      if (!profileResponse.ok) {
        setErrorMessage("Error al crear nuevo perfil");
        setShowResponseModal(true);
        throw new Error("Failed to save new profile");
      }

      const {
        data: { profile_id },
      } = await profileResponse.json();

      const interestsResponse = await fetch(
        `${API_URL}/profileInterests`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            profile_id,
            interest_id: newProfile.selectedInterests,
          }),
        }
      );

      if (!interestsResponse.ok) {
        const deleteProfileResponse = await fetch(
          `${API_URL}/profiles/${profile_id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!deleteProfileResponse.ok) {
          throw new Error("Failed to delete profile");
        }

        setShowNewProfileModal(false);
        throw new Error("Failed to save profile interests");
      }

      setShowNewProfileModal(false);
      setSuccessMessage("Nuevo perfil guardado con éxito");
      setShowResponseModal(true);
      setProfilesData((prevProfilesData) => [
        ...prevProfilesData,
        { ...newProfile, profile_id },
      ]);
    } catch (error) {
      setShowNewProfileModal(false);
      setErrorMessage("Algo falló. Intenta nuevamente más tarde");
      setShowResponseModal(true);
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
    {!isAuthenticated && (
  <Col>
    <LoginMobile />
  </Col>
)}
    <NavBar />
    <div className="contenedor">
      <div className="left__aside">{(isAuthenticated) && <Nav />}</div>
      <div className="content">
        <PageTitle title="Nuevo regalo" />
        <div className={styles.content}>
          <div className="d-flex gap-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="54"
              height="54"
              viewBox="0 0 54 54"
              fill="none"
            >
              </svg>
            <p>¿Para quién es el regalo?</p>
          </div>
          {showInput && !isAuthenticated && (
            <input
              type="text"
              placeholder="Ingrese el nombre de la persona"
              
            />
          )}
          {(isAuthenticated) && (
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
              handleSaveNewProfile={handleSaveNewProfile}
            />
          )}
          
        </div>
        
      </div>
      <aside className="right__aside">
        <div className="container pt-2">
          {(isAuthenticated) && <Search />}
          {!(isAuthenticated) && <AsideLogin />}{" "}
          {(isAuthenticated) && (
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
