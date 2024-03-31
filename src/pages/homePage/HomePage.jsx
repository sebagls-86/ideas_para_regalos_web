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
  const {
    isAuthenticated,
    isLoading,
    getAccessTokenWithPopup,
    getAccessTokenSilently,
    logout,
  } = useAuth0();
  const [loading, setLoading] = useState(null);
  const audience = configJson.audience;
  const storedToken = localStorage.getItem("token");
  const storedUserInfo = localStorage.getItem("userInfo");

  console.log("home isAuthenticated", isAuthenticated);

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
        if ((storedToken === undefined || storedToken === null) && isAuthenticated) {
          setLoading(true); // Set loading to true heres
          const newAccessToken = await getAccessTokenWithPopup({
            authorizationParams: {
              audience: audience,
              scope: "read:current_user",
            },
          });

          setAccessToken(newAccessToken);
          localStorage.setItem("token", newAccessToken);
          setLoading(true); // Set loading to true here

          let verifyUserCompleted = false; // Variable to track if verifyUser completed successfully

          // Start a timeout of 5 seconds
          const timeoutId = setTimeout(() => {
            if (!verifyUserCompleted) {
              localStorage.removeItem("token"); // Remove token from localStorage
              const userInfoFromStorage = localStorage.getItem("userInfo");
              if (!userInfoFromStorage) {
                setLoading(false); // Set loading to false
                logout(); // Logout if userInfo is not present in localStorage
                console.log(
                  "userInfo not present in localStorage, logging out..."
                );
              }
            }
          }, 5000);

          try {
            // Call verifyUser and wait for it to complete
            await verifyUser(newAccessToken);
            
            console.log("verifyUser completed")
            setTokenExists(true);
            setLoading(false); // Set loading to false
            verifyUserCompleted = true; // Mark verifyUser as completed
            clearTimeout(timeoutId); // Clear the timeout if verification succeeds
          } catch (error) {
            console.error("Error verifying user:", error.message);
            setLoading(false); // Set loading to false on error
            logout(); // Logout on error
          }
        }
      } catch (error) {
        console.error("Error during login or registration:", error.message);
        setLoading(false); // Set loading to false on error
        logout(); // Logout on error
      }
    };

    if (!tokenExists) {
      fetchTokenAndVerifyUser();
    }

  }, [tokenExists, storedToken, getAccessTokenWithPopup, audience, logout, isAuthenticated]);

  const verifyUser = async (token) => {
    try {
      console.log("verifyUser");
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
      throw error; // Re-throw the error to be caught by the timeout
    }
  };

  if (isLoading || loading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <NavBar />
      <div className="contenedor">
        <div className="left__aside">
          {(tokenExists || isAuthenticated) && (
            <Nav userInfo={userInfo?.data} />
          )}
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
