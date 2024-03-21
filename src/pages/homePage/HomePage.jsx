import React, { useState, useEffect } from "react";
import AsideLogin from "../../modules/asideLogin/AsideLogin";
import Nav from "../../modules/nav/Nav";
import Post from "../../modules/post/Post";
import NavBar from "../../modules/navBar/NavBar";
import EventSnipet from "../../modules/eventSnipet/EventSnipet";
import UserSuggestions from "../../modules/userSuggestions/UserSuggestions";
import Links from "../../components/link/Links";
import PageTitle from "../../components/pageTitle/PageTitle";
import NuevoRegaloHome from "../../components/nuevoRegaloHome/NuevoRegaloHome";
import { useAuth0 } from "@auth0/auth0-react";
import configJson from "../../auth_config.json";

function HomePage() {
  const [tokenExists, setTokenExists] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const { isAuthenticated, isLoading, getAccessTokenWithPopup, loginWithRedirect } = useAuth0();
  const audience = configJson.audience;
  const storedToken = localStorage.getItem("token");
    const storedUserInfo = localStorage.getItem("userInfo");

  useEffect(() => {
    if (storedToken) {
      setAccessToken(storedToken);
      setTokenExists(true);
    }

    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, [storedToken, storedUserInfo]);

  useEffect(() => {
    const fetchTokenAndVerifyUser = async () => {
      try {
        if (storedToken === undefined || storedToken === null) {
          const newAccessToken = await getAccessTokenWithPopup({
            authorizationParams: {
              audience: audience,
              scope: "read:current_user",
            },
          });

          console.log("access token", newAccessToken)
  
          setAccessToken(newAccessToken);
          localStorage.setItem("token", newAccessToken);
          await verifyUser(newAccessToken);
          setTokenExists(true);
        }
      } catch (error) {
        console.error("Error during login or registration:", error.message);
      }
    };
  
    if (!tokenExists) {
      fetchTokenAndVerifyUser();
    }
  }, [tokenExists, storedToken, getAccessTokenWithPopup, audience]);
  
  const verifyUser = async (token) => {
    try {
      const verifyResponse = await fetch(
        `http://localhost:8080/api/v1/users/verify`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!verifyResponse.ok) {
        throw new Error("Failed to verify user");
      }
  
      const verifyData = await verifyResponse.json();
      console.log("verifyData", verifyData);
  
      localStorage.setItem("userInfo", JSON.stringify(verifyData));
      setUserInfo(verifyData);
    } catch (error) {
      console.error("Error verifying user:", error.message);
    }
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <NavBar />
      <div className="contenedor">
        <div className="left__aside">
          {(tokenExists || isAuthenticated) && <Nav userInfo={userInfo?.data} />}
        </div>
        <div className="content">
          <PageTitle title="Inicio" />
          <NuevoRegaloHome />
          <div className="mt-3 p-3 bordes-y">
            <Post userInfo={userInfo?.data} />
          </div>
        </div>
        <aside className="right__aside">
          <div className="container pt-2">
            {(isAuthenticated || tokenExists) && (
              <>
                <EventSnipet />
                <UserSuggestions userInfo={userInfo?.data} />
                <div className="mt-5 d-flex justify-content-center ">
                  <Links
                    title="Post nuevo regalo"
                    url="/nuevoRegalo"
                    type={"primary"}
                  />
                </div>
              </>
            )}
            {!isAuthenticated && !tokenExists && <AsideLogin />}
          </div>
        </aside>
      </div>
    </>
  );
}

export default HomePage;
