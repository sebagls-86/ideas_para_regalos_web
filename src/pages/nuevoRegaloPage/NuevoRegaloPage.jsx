import React, { useState, useEffect } from "react";
import Nav from "../../modules/nav/Nav";
import { Col } from "react-bootstrap";
import styles from "./nuevoRegaloPage.module.css";
import LoginMobile from "../../modules/loginMobile/LoginMobile";
import AsideLogin from "../../modules/asideLogin/AsideLogin";
import EventSnipet from "../../modules/eventSnipet/EventSnipet";
import UserSuggestions from "../../modules/userSuggestions/UserSuggestions";
import SelectButton from "../../components/selectButton/SelectButton";
import NuevoRegaloForm from "../../modules/nuevoRegaloForm/NuevoRegaloForm";
import ModalCreateProfile from "../../modules/modalCreateProfile/ModalCreateProfile";
import { useNavigate, useLocation } from "react-router-dom";
import ResponseModal from "../../components/modal/ResponseModal";
import { useAuth0 } from "@auth0/auth0-react";
import Footer from "../../modules/footer/Footer";

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
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();
  const userId =
    (localStorage.getItem("userInfo") &&
      JSON.parse(localStorage.getItem("userInfo")).data.user_id) ||
    null;
  const API_URL = process.env.REACT_APP_API_URL;
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

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

       
        if (response.status === 401) {
          setErrorMessage("Su sesión expiró. Por favor, vuelva a iniciar sesión.");
          setShowResponseModal(true);
          await sleep(3000);
          localStorage.removeItem("token");
          localStorage.removeItem("userInfo");
          logout();
          return;
        } else  if (!response.ok) {
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
      const profileResponse = await fetch(`${API_URL}/profiles`, {
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
      });

      if (!profileResponse.ok) {
        setErrorMessage("Error al crear nuevo perfil");
        setShowResponseModal(true);
        throw new Error("Failed to save new profile");
      }

      const {
        data: { profile_id },
      } = await profileResponse.json();

      const interestsResponse = await fetch(`${API_URL}/profileInterests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          profile_id,
          interest_id: newProfile.selectedInterests,
        }),
      });

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
      {/*  <NavBar />*/}
      <div className="contenedor">
        <div className="left__aside">{isAuthenticated && <Nav />}</div>
        <div className="content">
          {/* <PageTitle title="Nuevo regalo" />*/}
          <div className={styles.content}>
            {userInfo && userInfo.data.avatar ? (
              <div className={styles.avatarContainer}>
                <img
                  src={userInfo.data.avatar}
                  alt="imagen perfil usuario"
                  width={"54px"}
                  height={"54px"}
                  style={{ borderRadius: "50%" }}
                />
              </div>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="54"
                height="54"
                viewBox="0 0 54 54"
                fill="none"
              >
                <circle cx="27" cy="27" r="27" fill="#A9D097" />
                <path
                  d="M22.8551 13.6106L25.0573 17.3568H20.4188C19.0203 17.3568 17.8875 16.2241 17.8875 14.8256C17.8875 13.4271 19.0203 12.2943 20.4188 12.2943H20.558C21.5009 12.2943 22.3805 12.7943 22.8551 13.6106ZM14.85 14.8256C14.85 15.7368 15.0715 16.5975 15.4575 17.3568H12.825C11.705 17.3568 10.8 18.2618 10.8 19.3818V23.4318C10.8 24.5519 11.705 25.4568 12.825 25.4568H41.175C42.2951 25.4568 43.2 24.5519 43.2 23.4318V19.3818C43.2 18.2618 42.2951 17.3568 41.175 17.3568H38.5425C38.9286 16.5975 39.15 15.7368 39.15 14.8256C39.15 11.7501 36.6568 9.25684 33.5813 9.25684H33.4421C31.4234 9.25684 29.5503 10.3263 28.5251 12.0665L27 14.6674L25.475 12.0729C24.4498 10.3263 22.5767 9.25684 20.558 9.25684H20.4188C17.3433 9.25684 14.85 11.7501 14.85 14.8256ZM36.1125 14.8256C36.1125 16.2241 34.9798 17.3568 33.5813 17.3568H28.9428L31.145 13.6106C31.6259 12.7943 32.4992 12.2943 33.4421 12.2943H33.5813C34.9798 12.2943 36.1125 13.4271 36.1125 14.8256ZM12.825 27.4818V38.6193C12.825 40.2963 14.1856 41.6568 15.8625 41.6568H24.975V27.4818H12.825ZM29.025 41.6568H38.1375C39.8145 41.6568 41.175 40.2963 41.175 38.6193V27.4818H29.025V41.6568Z"
                  fill="#139CBA"
                />
              </svg>
            )}

            {showInput && !isAuthenticated && (
              <input
                type="text"
                placeholder="Ingrese el nombre de la persona"
              />
            )}
            <div style={{ width: "100%" }}>
              {isAuthenticated && (
                <div className={styles.select_user_container}>
                  <p>¿Para quién es el regalo?</p>
                  <SelectButton
                    label="Elegir persona"
                    isOpen={isOpen}
                    toggleDropdown={toggleDropdown}
                    options={options}
                    handleOptionSelect={handleOptionSelect}
                    selectedOption={selectedOption}
                    maxWidth="360px"
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
        </div>
        <aside className="right__aside">
          <div className="container pt-2 d-flex flex-column justify-content-between h-100">
            <div>
              {!isAuthenticated && <AsideLogin />}{" "}
              {isAuthenticated && (
                <div>
                  <EventSnipet />
                  <UserSuggestions />
                </div>
              )}
            </div>
            <div>
              <Footer />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

export default NuevoRegaloPage;
