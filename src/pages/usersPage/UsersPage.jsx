import React from "react";
import Nav from "../../modules/nav/Nav";
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
import { useAuth0 } from "@auth0/auth0-react";

function UsersPage() {
  const { isAuthenticated } = useAuth0();
  const user = localStorage.getItem("userInfo");

  return (
    <>
      {!user}
      <NavBar />
      <div className="contenedor">
     
        <div className="left__aside">{(isAuthenticated) && <Nav />}</div>
        <div className="content">
        <PageTitle title="Usuarios" />
          <div  style={{marginTop: "5rem"}}>
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
            {(isAuthenticated)}
            {(!isAuthenticated) && <AsideLogin />}
            {(isAuthenticated) && (
              <div>
                <EventSnipet />
                <UserSuggestions />
                <div className="mt-4 d-flex justify-content-center ">
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
