import React, { useState, useEffect } from "react";
import styles from "./css/profiles.module.css";
import { Modal, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import InterestModal from "./InterestsModal";
import EditProfileModal from "./EditProfileModal";
import NuevoPerfilModal from "./NuevoPerfilModal";

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
  const { user_id } = useParams();
  const userId = parseInt(user_id);
  const navigate = useNavigate();

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

  const fetchAvailableInterests = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/interests");
      if (response.ok) {
        const data = await response.json();
        setAvailableInterests(data.data);
      }
    } catch (error) {
      console.error("Error fetching available interests:", error);
    }
  };

  useEffect(() => {
    const fetchAgeRangesAndRelationships = async () => {
      try {
        const ageRangeResponse = await fetch(
          "http://localhost:8080/api/v1/ageRanges"
        );
        const ageRangeData = await ageRangeResponse.json();
        setAgeRanges(ageRangeData.data);

        const relationshipResponse = await fetch(
          "http://localhost:8080/api/v1/relationships"
        );
        const relationshipData = await relationshipResponse.json();
        setRelationships(relationshipData.data);
      } catch (error) {
        console.error("Error fetching age ranges and relationships:", error);
      }
    };

    fetchAgeRangesAndRelationships();
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
    const newProfilesData = profilesData.map((profile) => {
      if (profile.profile_id === selectedProfile.profile_id) {
        const updatedProfile = { ...profile };
        updatedProfile.interests = [
          ...updatedProfile.interests,
          ...newInterests,
        ];
        return updatedProfile;
      }
      return profile;
    });
    setProfilesData(newProfilesData);

    setSelectedInterests([]);
  };

  const filterAvailableInterests = () => {
    if (!selectedProfile) return availableInterests; // Si no hay perfil seleccionado, retornar todos los intereses disponibles

    const selectedInterestIds = selectedProfile.interests.map(
      (interest) => interest.interest_id
    );

    const filteredInterests = availableInterests.filter((interest) => {
      return !selectedInterestIds.includes(interest.interest_id);
    });

    console.log("Intereses filtrados:", filteredInterests);

    return filteredInterests;
  };

  const filteredAvailableInterests = filterAvailableInterests();

  const handleShowInterestModal = (profile) => {
    console.log(
      "Perfil seleccionado para mostrar el modal de intereses:",
      profile
    );
    fetchAvailableInterests();
    setSelectedProfile(profile);
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
      console.log(
        "Perfil seleccionado para confirmar eliminación de interés:",
        profile
      );
      console.log("Interés a eliminar confirmado:", interest);
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

      setShowConfirmationModal(false);
      alert("Interés eliminado con éxito");
      const updatedProfilesData = profilesData.map((p) => {
        if (p.profile_id === profile.profile_id) {
          return {
            ...p,
            interests: p.interests.filter((i) => i.interest_id !== interestId),
          };
        }
        return p;
      });
      setProfilesData(updatedProfilesData);
    } catch (error) {
      console.error("Error removing interest:", error);
    }
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

      <NuevoPerfilModal
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

      <Modal
        show={showConfirmationModal}
        onHide={() => setShowConfirmationModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro de que desea eliminar el interés "
          {interestToRemove?.interest}"?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmationModal(false)}
          >
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirmRemoveInterest}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showDeleteProfileConfirmationModal}
        onHide={() => setShowDeleteProfileConfirmationModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro de que desea eliminar el perfil "{profileToRemove?.name}
          "?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteProfileConfirmationModal(false)}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={() => handleConfirmDeleteProfile(profileToRemove)}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>

      {selectedProfile ? (
        <div>
          <table className={styles.profiles__table}>
            <tbody>
              <tr>
                <th className={styles.profiles__table_th}>Name</th>
                <td className={styles.profiles__table_td}>
                  {selectedProfile.name}
                </td>
              </tr>
              <tr>
                <th className={styles.profiles__table_th}>Last Name</th>
                <td className={styles.profiles__table_td}>
                  {selectedProfile.last_name}
                </td>
              </tr>
              <tr>
                <th className={styles.profiles__table_th}>Age Range</th>
                <td className={styles.profiles__table_td}>
                  {selectedProfile.age_range}
                </td>
              </tr>
              <tr>
                <th className={styles.profiles__table_th}>Relationship</th>
                <td className={styles.profiles__table_td}>
                  {selectedProfile.relationship}
                </td>
              </tr>
              <tr>
                <th className={styles.profiles__table_th}>Interests</th>
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
                            <FaTimes
                              className={styles.profile_interest_remove_icon}
                            />
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <span>N/A</span>
                    )}
                    <div className={styles.profile_interest_container}>
                      <Button
                        className={styles.profile_interest_buttons}
                        onClick={() => handleShowInterestModal(selectedProfile)}
                      >
                        Agregar
                      </Button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <Button onClick={() => handleEditModal(selectedProfile)}>
            Editar
          </Button>
          <Button onClick={() => setSelectedProfile(null)}>Atras</Button>
        </div>
      ) : (
        <div>
          <Button onClick={() => setShowNewProfileModal(true)}>
            Crear nuevo perfil
          </Button>
          {profilesData === null ? (
            <p>Todavía no hay perfiles</p>
          ) : (
            <table className={styles.profiles__table}>
              <thead>
                <tr>
                  <th className={styles.profiles__table_th}>Name</th>

                  <th className={styles.profiles__table_th}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {profilesData.map((profile) => (
                  <tr key={profile.profile_id}>
                    <td className={styles.profiles__table_td}>
                      {profile.name}
                    </td>
                    <td className={styles.action_buttons_td}>
                      <div className={styles.action_buttons_container}>
                        <Button
                          className={styles.action_buttons}
                          onClick={() => handleEdit(profile)}
                        >
                          <FaEdit
                            className={styles.profile_interest_remove_icon}
                          />
                        </Button>
                        <Button
                          className={styles.action_buttons}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProfile(profile);
                          }}
                        >
                          <FaTrash
                            className={styles.profile_interest_remove_icon}
                          />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default Profiles;
