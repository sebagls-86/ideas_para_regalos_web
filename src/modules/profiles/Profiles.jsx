import React, { useState, useEffect, useRef } from "react";
import styles from "./css/profiles.module.css";
import { Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { IoMdClose, IoIosSearch } from "react-icons/io";
import InterestModal from "./InterestsModal";
import EditProfileModal from "./EditProfileModal";
import CustomModal from "../../components/modal/ConfirmDeleteModal";
import NewProfile from "../modalCreateProfile/ModalCreateProfile";
import { AiOutlinePlus } from "react-icons/ai";
import {
  fetchAvailableInterests,
  fetchAgeRanges,
  fetchRelationships,
} from "../api/api";

function Profiles() {
  const [profilesData, setProfilesData] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [ageRanges, setAgeRanges] = useState([]);
  const [relationships, setRelationships] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [showNewProfileModal, setShowNewProfileModal] = useState(false);
  const [profileToRemove, setProfileToRemove] = useState(null);
  const [
    showDeleteProfileConfirmationModal,
    setShowDeleteProfileConfirmationModal,
  ] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [interests, setInterests] = useState([]);
  const [availableInterests, setAvailableInterests] = useState([]);
  const [editingProfile, setEditingProfile] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [interestToRemove, setInterestToRemove] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { user_id } = useParams();
  const userId = parseInt(user_id);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
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

  useEffect(() => {
    const fetchAvailableInterests = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/interests");
        if (response.ok) {
          const data = await response.json();
          setInterests(data.data);
          setAvailableInterests(data.data);
        }
      } catch (error) {
        console.error("Error fetching available interests:", error);
      }
    };

    fetchAvailableInterests();
  }, []);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const data = await fetchAvailableInterests();
        setInterests(data);
      } catch (error) {
        console.error("Error fetching available interests:", error);
      }
    };

    fetchInterests();
  }, []);

  useEffect(() => {
    const fetchAgeRangesData = async () => {
      try {
        const data = await fetchAgeRanges();
        setAgeRanges(data);
      } catch (error) {
        console.error("Error fetching age ranges:", error);
      }
    };

    fetchAgeRangesData();
  }, []);

  useEffect(() => {
    const fetchRelationshipsData = async () => {
      try {
        const data = await fetchRelationships();
        setRelationships(data);
      } catch (error) {
        console.error("Error fetching relationships:", error);
      }
    };

    fetchRelationshipsData();
  }, []);

  const handleEdit = (profile) => {
    setEditingProfile({ ...profile });
    setSelectedProfile(profile);
  };

  const handleEditModal = (profile) => {
    setEditingProfile({ ...profile });
    setSelectedProfile(profile);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveChanges = async () => {
    try {
      const modifiedData = {};
      let hasChanges = false;

      if (selectedProfile.name !== editingProfile.name) {
        modifiedData.name = selectedProfile.name;
        hasChanges = true;
      }

      if (selectedProfile.last_name !== editingProfile.last_name) {
        modifiedData.last_name = selectedProfile.last_name;
        hasChanges = true;
      }

      if (selectedProfile.age_range !== editingProfile.age_range) {
        const selectedAgeRange = ageRanges.find(
          (range) => range.name === selectedProfile.age_range
        );
        if (selectedAgeRange) {
          modifiedData.age_range_id = selectedAgeRange.age_range_id;
          hasChanges = true;
        }
      }

      if (selectedProfile.relationship !== editingProfile.relationship) {
        const selectedRelationship = relationships.find(
          (relationship) =>
            relationship.relationship_name === selectedProfile.relationship
        );
        if (selectedRelationship) {
          modifiedData.relationship_id = selectedRelationship.relationship_id;
          hasChanges = true;
        }
      }

      if (!hasChanges) {
        setShowModal(false);
        return;
      }

      const response = await fetch(
        `http://localhost:8080/api/v1/profiles/${selectedProfile.profile_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(modifiedData),
        }
      );

      if (!response.ok) {
        alert("Algo falló. Intenta nuevamente más tarde");
        throw new Error("Network response was not ok");
      }

      const updatedData = await response.json();
      const updatedProfile = {
        ...selectedProfile,
        ...modifiedData,
        ...updatedData.data,
      };

      setSelectedProfile(updatedProfile);

      if (profilesData) {
        const updatedProfilesData = profilesData.map((profile) => {
          if (profile.profile_id === updatedProfile.profile_id) {
            return { ...profile, ...updatedProfile };
          }
          return profile;
        });
        setProfilesData(updatedProfilesData);
      }

      alert("Perfil actualizado con éxito!");
      setShowModal(false);
    } catch (error) {
      alert("Algo falló. Intenta nuevamente más tarde");
      console.error("Error updating profile:", error);
    }
  };

  const updateProfilesWithNewInterests = (newInterests) => {
    const updatedSelectedProfile = { ...selectedProfile };
    updatedSelectedProfile.interests = [
      ...updatedSelectedProfile.interests,
      ...newInterests,
    ];

    setSelectedProfile(updatedSelectedProfile);

    const updatedProfilesData = profilesData.map((profile) => {
      if (profile.profile_id === selectedProfile.profile_id) {
        return updatedSelectedProfile;
      }
      return profile;
    });

    setProfilesData(updatedProfilesData);
    setSelectedInterests([]);
  };

  const filterAvailableInterests = () => {
    if (!selectedProfile) {
      return availableInterests;
    }
  
    if (!selectedProfile.interests) {
      console.warn("selectedProfile.interests no está definido");
      return availableInterests;
    }
  
    const selectedInterestIds = selectedProfile.interests.map(
      (interest) => interest.interest_id
    );
    return availableInterests.filter((interest) =>
      !selectedInterestIds.includes(interest.interest_id)
    );
  };

  const filteredAvailableInterests = filterAvailableInterests();

  const handleShowInterestModal = (profile) => {
    fetchAvailableInterests();
    setSelectedProfile(profile);
    console.log("Selected Profile:", profile); // Verifica el valor de profile
    setShowInterestModal(true);
  };

  const handleToggleInterest = (interest) => {
    const isInterestSelected = selectedInterests.some(
      (selectedInterest) =>
        selectedInterest.interest_id === interest.interest_id
    );

    if (isInterestSelected) {
      const updatedInterests = selectedInterests.filter(
        (selectedInterest) =>
          selectedInterest.interest_id !== interest.interest_id
      );
      setSelectedInterests(updatedInterests);
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleRemoveInterest = (profile, interest) => {
    console.log("Perfil seleccionado para eliminar interés:", profile);
    console.log("Interés a eliminar:", interest.interest);
    setInterestToRemove({ profile, interest });
    setShowConfirmationModal(true);
  };

  const handleConfirmRemoveInterest = async () => {
    try {
      const { profile, interest } = interestToRemove;
      const interestId = interest.interest_id;

      const deleteResponse = await fetch(
        `http://localhost:8080/api/v1/profileInterests/${profile.profile_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ interest_id: interestId }),
        }
      );

      if (!deleteResponse.ok) {
        alert("Algo falló. Intenta nuevamente más tarde");
        setShowConfirmationModal(false);
        throw new Error("Network response was not ok");
      }

      // Eliminar el interés del perfil seleccionado
      const updatedSelectedProfile = updateSelectedProfileAfterInterestRemoval(
        profile,
        interestId
      );

      // Actualizar el estado de selectedProfile
      setSelectedProfile(updatedSelectedProfile);

      setShowConfirmationModal(false);
      alert("Interés eliminado con éxito");

      // Actualizar profilesData
      const updatedProfilesData = profilesData.map((p) => {
        if (p.profile_id === profile.profile_id) {
          return updatedSelectedProfile;
        }
        return p;
      });

      // Actualizar el estado de profilesData
      setProfilesData(updatedProfilesData);
    } catch (error) {
      console.error("Error removing interest:", error);
    }
  };

  const updateSelectedProfileAfterInterestRemoval = (
    profile,
    interestIdToRemove
  ) => {
    return {
      ...selectedProfile,
      interests: selectedProfile.interests.filter(
        (i) => i.interest_id !== interestIdToRemove
      ),
    };
  };

  const handleConfirmDeleteProfile = async (profile) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/profiles/${profile.profile_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        alert("Algo falló. Intenta nuevamente más tarde");
        throw new Error("Network response was not ok");
      }

      alert("Perfil eliminado con éxito");
      const updatedProfilesData = profilesData.filter(
        (p) => p.profile_id !== profile.profile_id
      );
      setProfilesData(updatedProfilesData);
      setSelectedProfile(null);
      setShowDeleteProfileConfirmationModal(false);
    } catch (error) {
      alert("Algo falló. Intenta nuevamente más tarde");
      console.error("Error deleting profile:", error);
    }
  };

  const handleDeleteProfile = (profile) => {
    setProfileToRemove(profile);
    setShowDeleteProfileConfirmationModal(true);
  };

  const handleSaveNewProfile = async (newProfile) => {
    try {
      const profileResponse = await fetch(
        "http://localhost:8080/api/v1/profiles",
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
        throw new Error("Failed to save new profile");
      }

      const {
        data: { profile_id },
      } = await profileResponse.json();
      const interestsResponse = await fetch(
        "http://localhost:8080/api/v1/profileInterests",
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
        setShowNewProfileModal(false);
        throw new Error("Failed to save profile interests");
      }

      setShowNewProfileModal(false);
      alert("Nuevo perfil guardado con éxito!");
      setProfilesData((prevProfilesData) => [
        ...prevProfilesData,
        { ...newProfile, profile_id },
      ]);
    } catch (error) {
      setShowNewProfileModal(false);
      console.error("Error saving new profile:", error);
    }
  };

  const handleCloseNewProfileModal = () => {
    setShowNewProfileModal(false);
  };

  const handleShowNewProfileModal = () => {
    setShowNewProfileModal(true);
  };

  const filteredProfiles = profilesData
    ? profilesData.filter((profile) =>
        profile.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSearchClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleClearClick = () => {
    setSearchTerm("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleGiftClick = (profile) => {
    // Redirigir al usuario a la página de Nuevo Regalo con el perfil seleccionado
    window.location.href = `http://localhost:3000/nuevoRegalo?profileId=${profile.profile_id}`;
  };

  return (
    <div>
      <EditProfileModal
        show={showModal}
        onHide={handleCloseModal}
        selectedProfile={selectedProfile}
        setSelectedProfile={setSelectedProfile}
        ageRanges={ageRanges}
        relationships={relationships}
        handleCloseModal={handleCloseModal}
        handleSaveChanges={handleSaveChanges}
      />
      <InterestModal
        show={showInterestModal}
        onHide={() => setShowInterestModal(false)}
        filteredAvailableInterests={filteredAvailableInterests}
        handleToggleInterest={handleToggleInterest}
        setShowInterestModal={setShowInterestModal}
        selectedInterests={selectedInterests}
        profileId={selectedProfile ? selectedProfile.profile_id : null}
        updateProfilesWithNewInterests={updateProfilesWithNewInterests}
      />

      <NewProfile
        show={showNewProfileModal}
        onHide={() => handleShowNewProfileModal(false)}
        ageRanges={ageRanges}
        relationships={relationships}
        interests={interests}
        selectedInterests={selectedInterests}
        setSelectedInterests={setSelectedInterests}
        handleToggleInterest={handleToggleInterest}
        handleCloseNewProfileModal={handleCloseNewProfileModal}
        handleSaveNewProfile={handleSaveNewProfile}
      />

      <CustomModal
        show={showConfirmationModal}
        onHide={() => setShowConfirmationModal(false)}
        title="¿Estás seguro?"
        bodyContent={`Se eliminará "${interestToRemove?.interest.interest}" de sus intereses`}
        onCancel={() => setShowConfirmationModal(false)}
        onConfirm={handleConfirmRemoveInterest}
        confirmButtonText="Confirmar"
      />

      <CustomModal
        show={showDeleteProfileConfirmationModal}
        onHide={() => setShowDeleteProfileConfirmationModal(false)}
        title="¿Estás seguro?"
        bodyContent={`Se eliminará "${profileToRemove?.name}" de tus perfiles`}
        onCancel={() => setShowDeleteProfileConfirmationModal(false)}
        onConfirm={() => handleConfirmDeleteProfile(profileToRemove)}
        confirmButtonText="Confirmar"
      />

      {selectedProfile ? (
        <div>
          <div className={styles.edit_buttons}>
            <Button
              onClick={() => setSelectedProfile(null)}
              className={styles.go_back_button}
            ></Button>{" "}
            <Button onClick={() => handleEditModal(selectedProfile)}>
              Editar
            </Button>
          </div>
          <table
            className={`${styles.profiles__table} ${styles.profiles__table__info}`}
          >
            <tbody>
              <tr>
                <th className={styles.profiles__table_th}>Nombre</th>
                <td className={styles.profiles__table_td}>
                  {selectedProfile.name}
                </td>
              </tr>
              <tr>
                <th className={styles.profiles__table_th}>Apellido</th>
                <td className={styles.profiles__table_td}>
                  {selectedProfile.last_name}
                </td>
              </tr>
              <tr>
                <th className={styles.profiles__table_th}>Edad</th>
                <td className={styles.profiles__table_td}>
                  {selectedProfile.age_range}
                </td>
              </tr>
              <tr>
                <th className={styles.profiles__table_th}>Relación</th>
                <td className={styles.profiles__table_td}>
                  {selectedProfile.relationship}
                </td>
              </tr>
              <tr>
                <th className={styles.profiles__table_th}>Intereses</th>
                <td className={styles.profiles__table_td}>
                  <div>
                    {selectedProfile.interests &&
                    selectedProfile.interests.length > 0 ? (
                      <div className={styles.profile_interest_container}>
                        {selectedProfile.interests.map((interest, index) => (
                          <Button
                            key={index}
                            className={styles.profile_interest_button}
                            onClick={() =>
                              handleRemoveInterest(selectedProfile, interest)
                            }
                          >
                            {interest.interest}
                            <IoMdClose
                              className={styles.profile_interest_remove_icon}
                            />
                          </Button>
                        ))}
                        <Button
                          className={`${styles.profile_interest_buttons} ${styles.interest_add_button}`}
                          onClick={() =>
                            handleShowInterestModal(selectedProfile)
                          }
                        ></Button>{" "}
                      </div>
                    ) : (
                      <span>N/A</span>
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <div className={styles.create_new_container}>
            <div className={styles.search_bar}>
              <form style={{ position: "relative" }}>
                <input
                  ref={inputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ flex: 1 }}
                />
                {!searchTerm ? (
                  <IoIosSearch
                    className={styles.icon_style}
                    onClick={handleSearchClick}
                  />
                ) : (
                  <IoMdClose
                    className={styles.icon_style}
                    onClick={handleClearClick}
                  />
                )}
              </form>
            </div>

            <Button
              onClick={() => setShowNewProfileModal(true)}
              className={styles.create_new_button}
            >
              <AiOutlinePlus />
              Nuevo perfil
            </Button>
          </div>
          <table className={styles.profiles__table}>
            <tbody>
              {profilesData ? (
                profilesData.length > 0 ? (
                  filteredProfiles.length > 0 ? (
                    filteredProfiles.map((profile) => (
                      <tr
                        key={profile.profile_id}
                        className={styles.profiles__table__container}
                      >
                        <td>
                          <div>
                            <div>{profile.name}</div>
                            <div>{profile.relationship}</div>
                          </div>
                        </td>
                        <td className={styles.action_buttons_td}>
                          <div className={styles.action_buttons_container}>
                            <Button
                              className={styles.action_buttons}
                              onClick={() => handleGiftClick(profile)}
                            >
                              <div className={styles.profile_gift_icon} />
                            </Button>
                            <Button
                              className={styles.action_buttons}
                              onClick={() => handleEdit(profile)}
                            >
                              <div className={styles.profile_edit_icon} />
                            </Button>
                            <Button
                              className={styles.action_buttons}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteProfile(profile);
                              }}
                            >
                              <div className={styles.profile_delete_icon} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2">
                        No se encontraron perfiles que coincidan con la búsqueda
                      </td>
                    </tr>
                  )
                ) : (
                  <tr>
                    <td colSpan="2">Todavía no hay perfiles</td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan="2">Todavía no hay perfiles</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Profiles;
