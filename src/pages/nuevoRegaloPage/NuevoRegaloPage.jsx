import React, { useState } from 'react';
import Nav from "../../modules/nav/Nav";
import { auth } from "../../utils/firebase";
import { Col } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import Search from "../../components/search/Search";
import styles from "./nuevoRegaloPage.module.css";
import LoginMobile from "../../modules/loginMobile/LoginMobile";
import NavLoggedOut from "../../modules/navLoggedOut/NavLoggedOut";
import AsideLogin from "../../modules/asideLogin/AsideLogin";
import EventSnipet from "../../modules/eventSnipet/EventSnipet";
import UserSuggestions from "../../modules/userSuggestions/UserSuggestions";
import Links from "../../components/link/Links";
import PageTitle from "../../components/pageTitle/PageTitle";
import SelectUser from "../../modules/selectUser/SelectUser";
import SelectButton from "../../components/selectButton/SelectButton";
import NuevoRegaloForm from "../../modules/nuevoRegaloForm/NuevoRegaloForm";
import ModalCreateProfile from "../../modules/modalCreateProfile/ModalCreateProfile"

function NuevoRegaloPage() {
  const [user] = useAuthState(auth);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showNewProfileModal, setShowNewProfileModal] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    if (option.value === 'Open Modal') {
      handleNewProfileClick(); // Open modal for 'Crear nuevo'
    } else {
      setSelectedOption(option);
      setIsOpen(false);
    }
  };

  const handleNewProfileClick = () => {
    setShowNewProfileModal(true);
    setIsOpen(false); // Close the dropdown when opening the modal
  };

  const options = [
    { label: 'Crear nuevo', value: 'Open Modal', type: 'link', link: '#modal' },
    {
      label: 'user1',
      value: 'Picture with Labels',
      type: 'imageWithLabels',
      imageUrl: require('../../assets/person3.svg').default,
      label1: 'Username1',
      label2: '@username1',
    },
    {
      label: 'user2',
      value: 'Picture with Labels',
      type: 'imageWithLabels',
      imageUrl: require('../../assets/person3.svg').default,
      label1: 'Username2',
      label2: '@username2',
    },
    {
      label: 'user3',
      value: 'Picture with Labels',
      type: 'imageWithLabels',
      imageUrl: require('../../assets/person3.svg').default,
      label1: 'Username3',
      label2: '@username3',
    },
  ];
  return (
    <>
      {!user && <NavLoggedOut />}
      <div className="contenedor">
        <div className="left__aside">{user && <Nav />}</div>
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
                <circle cx="27" cy="27" r="27" fill="#A9D097" />
                <path
                  d="M22.8551 13.6106L25.0573 17.3568H20.4188C19.0203 17.3568 17.8875 16.2241 17.8875 14.8256C17.8875 13.4271 19.0203 12.2943 20.4188 12.2943H20.558C21.5009 12.2943 22.3805 12.7943 22.8551 13.6106ZM14.85 14.8256C14.85 15.7368 15.0715 16.5975 15.4575 17.3568H12.825C11.705 17.3568 10.8 18.2618 10.8 19.3818V23.4318C10.8 24.5519 11.705 25.4568 12.825 25.4568H41.175C42.2951 25.4568 43.2 24.5519 43.2 23.4318V19.3818C43.2 18.2618 42.2951 17.3568 41.175 17.3568H38.5425C38.9286 16.5975 39.15 15.7368 39.15 14.8256C39.15 11.7501 36.6568 9.25684 33.5813 9.25684H33.4421C31.4234 9.25684 29.5503 10.3263 28.5251 12.0665L27 14.6674L25.475 12.0729C24.4498 10.3263 22.5767 9.25684 20.558 9.25684H20.4188C17.3433 9.25684 14.85 11.7501 14.85 14.8256ZM36.1125 14.8256C36.1125 16.2241 34.9798 17.3568 33.5813 17.3568H28.9428L31.145 13.6106C31.6259 12.7943 32.4992 12.2943 33.4421 12.2943H33.5813C34.9798 12.2943 36.1125 13.4271 36.1125 14.8256ZM12.825 27.4818V38.6193C12.825 40.2963 14.1856 41.6568 15.8625 41.6568H24.975V27.4818H12.825ZM29.025 41.6568H38.1375C39.8145 41.6568 41.175 40.2963 41.175 38.6193V27.4818H29.025V41.6568Z"
                  fill="#139CBA"
                />
              </svg>
            <p>¿Para quién es el regalo?</p>
     
            </div>
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
            <NuevoRegaloForm></NuevoRegaloForm>
            {showNewProfileModal && (
            <ModalCreateProfile closeModal={() => setShowNewProfileModal(false)} />
          )}
          </div>
        </div>
        <aside className="right__aside">
          <div className="container pt-2">
            {user && <Search />}
            <AsideLogin />
            {user && (
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
