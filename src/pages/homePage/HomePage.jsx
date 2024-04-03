import React, { useEffect, useState } from "react";
import AsideLogin from "../../modules/asideLogin/AsideLogin";
import { Col } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import Nav from "../../modules/nav/Nav";
import Post from "../../modules/post/Post";
import NavBar from "../../modules/navBar/NavBar";
import LoginMobile from "../../modules/loginMobile/LoginMobile";
import EventSnipet from "../../modules/eventSnipet/EventSnipet";
import UserSuggestions from "../../modules/userSuggestions/UserSuggestions";
import Links from "../../components/link/Links";
import PageTitle from "../../components/pageTitle/PageTitle";
import NuevoRegaloHome from "../../components/nuevoRegaloHome/NuevoRegaloHome";

function HomePage() {
  const [user] = useAuthState(auth);
  const [tokenExists, setTokenExists] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null && token !== undefined) {
      setTokenExists(true);
    }
}, []);



console.log(process.env.REACT_APP_PRUEBA)


  
  return (
    <>
      {(!user && !tokenExists)}
      <NavBar />
      <div className="contenedor">
        <div className="left__aside">{(user || tokenExists) && <Nav user={user?.displayName} />}</div>
        <div className="content">
          <PageTitle title="Inicio" />
          
          {(!user && !tokenExists) && <Col>
            <LoginMobile />
          </Col>}
          <NuevoRegaloHome></NuevoRegaloHome>
          <div className="mt-3 p-3 bordes-y">
            <Post />
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

export default HomePage;
