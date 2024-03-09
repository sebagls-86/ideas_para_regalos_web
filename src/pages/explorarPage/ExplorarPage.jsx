import React from "react";
import Nav from "../../modules/nav/Nav";
import { auth } from "../../utils/firebase";
import { Col } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import Search from "../../components/search/Search";
import banner from "../../assets/bannerExplorar.png";
import styles from "./explorarPage.module.css";
import SectionCategory from "../../modules/sectionCategory/SectionCategory";
import SectionEvents from "../../modules/sectionEvents/SectionEvents";
import LoginMobile from "../../modules/loginMobile/LoginMobile";
import NavBar from "../../modules/navBar/NavBar";
import AsideLogin from "../../modules/asideLogin/AsideLogin";
import SectionFeatured from "../../modules/sectionFeatured/SectionFeatured";
import EventSnipet from "../../modules/eventSnipet/EventSnipet";
import UserSuggestions from "../../modules/userSuggestions/UserSuggestions";
import Links from "../../components/link/Links";
import PageTitle from "../../components/pageTitle/PageTitle";

function ExplorarPage() {
  const [tokenExists, setTokenExists] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setTokenExists(true);
    } else {
      setTokenExists(false);
    }
  }, []);

  const [user] = useAuthState(auth);
  return (
    <>
      {!user}
      <NavBar />
      <div className="contenedor">
      <div className="left__aside">{(user || tokenExists) && <Nav user={user?.displayName} />}</div>
        <div className="content">
          <PageTitle title="Explorar" />
          <Col>
            <LoginMobile />
          </Col>
          <Col className="d-flex justify-content-center">
            <img
              src={banner}
              alt="banner"
              className={styles.explorar__banner}
            />
          </Col>
          <div className="mt-3">
            <SectionCategory title={"Categorías"} />
            <SectionEvents title={"Eventos"} />
            <SectionFeatured title={"Productos Destacados"} />
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

export default ExplorarPage;
