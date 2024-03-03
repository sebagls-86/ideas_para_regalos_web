import React from "react";
import Nav from "../../modules/nav/Nav";
import { auth } from "../../utils/firebase";
import { Col } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import Search from "../../components/search/Search";
import banner from "../../assets/bannerExplorar.png";
import SectionCategory from "../../modules/sectionCategory/SectionCategory";
import SectionEvents from "../../modules/sectionEvents/SectionEvents";
import LoginMobile from "../../modules/loginMobile/LoginMobile";
import NavBar from "../../modules/navBar/NavBar";
import AsideLogin from "../../modules/asideLogin/AsideLogin";
import SectionFeatured from "../../modules/sectionFeatured/SectionFeatured";
import EventSnipet from "../../modules/eventSnipet/EventSnipet";
import UserSuggestions from "../../modules/userSuggestions/UserSuggestions";
import Links from "../../components/link/Links";
import styles from "./notificationsPage.module.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import NotificationAll from "../../modules/notificationAll/NotificationAll";
import PageTitle from "../../components/pageTitle/PageTitle";

function NotificationsPage() {
  const [user] = useAuthState(auth);

  return (
    <>
      {!user}
      <NavBar />
      <div className="contenedor">
     
        <div className="left__aside">{user && <Nav />}</div>
        <div className="content">
        <PageTitle title="Notificaciones" />
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
                <NotificationAll/>
              </Tab>
              <Tab eventKey="menciones" title="Menciones">
                {/* <Sonnet /> */}
              </Tab>
              <Tab eventKey="comentarios" title="Comentarios">
                {/* <Sonnet /> */}
              </Tab>
            </Tabs>
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

export default NotificationsPage;
