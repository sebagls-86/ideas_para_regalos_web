import React from "react";
import Nav from "../../modules/nav/Nav";
import { auth } from "../../utils/firebase";
import { Col } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import Search from "../../components/search/Search";
import LoginMobile from "../../modules/loginMobile/LoginMobile";
import NavBar from "../../modules/navBar/NavBar";
import AsideLogin from "../../modules/asideLogin/AsideLogin";
import EventSnipet from "../../modules/eventSnipet/EventSnipet";
import UserSuggestions from "../../modules/userSuggestions/UserSuggestions";
import Links from "../../components/link/Links";
import styles from "./usersPage.module.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Users from "../../modules/users/AllUsers";
import PageTitle from "../../components/pageTitle/PageTitle";
import Followers from "../../modules/users/Followers";
import Following from "../../modules/users/Following";
import Actividad from "../../modules/users/Actividad";

function UsersPage() {
  const [user] = useAuthState(auth);
const token = localStorage.getItem("token");
const tokenExists = token !== null && token !== undefined;

  return (
    <>
      {!user}
      <NavBar />
      <div className="contenedor">
     
        <div className="left__aside">{(user || tokenExists) && <Nav />}</div>
        <div className="content">
        <PageTitle title="Usuarios" />
          <Col>
            <LoginMobile />
          </Col>

          <div className="mt-3 p-3">
            <Tabs
              defaultActiveKey="todos"
              id="uncontrolled-tab-example"
              className={styles.notificacionNav}
            >
              <Tab eventKey="todos" title="Todos">
                <Users/>
              </Tab>
              <Tab eventKey="seguidores" title="Seguidores">
              <Followers/>
              </Tab>
              <Tab eventKey="siguiendo" title="Siguiendo">
                <Following/>
              </Tab>
              <Tab eventKey="actividad" title="Actividad">
                <Actividad/>
              </Tab>
            </Tabs>
            
          </div>
        </div>
        <aside className="right__aside">
          <div className="container pt-2">
            {(user || tokenExists)}
            {(!user && !tokenExists) && <AsideLogin />}
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

export default UsersPage;
