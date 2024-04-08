import React, { useState, useEffect } from "react";
import AsideLogin from "../../modules/asideLogin/AsideLogin";
import Nav from "../../modules/nav/Nav";
import Post from "../../modules/post/Post";
import NavBar from "../../modules/navBar/NavBar";
import EventSnipet from "../../modules/eventSnipet/EventSnipet";
import UserSuggestions from "../../modules/userSuggestions/UserSuggestions";
import ModalSurvey from "../../modules/modalSurvey/ModalSurvey";
import Links from "../../components/link/Links";
import PageTitle from "../../components/pageTitle/PageTitle";
import NuevoRegaloHome from "../../components/nuevoRegaloHome/NuevoRegaloHome";
import { useAuth0 } from "@auth0/auth0-react";
import config from "../../auth_config.json";

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
  const [pendingSurveysResponse, setPendingSurveysResponse] = useState(null);
  const audience = config.audience;
  const storedToken = localStorage.getItem("token");
  const storedUserInfo = localStorage.getItem("userInfo");
  const API_URL = process.env.REACT_APP_API_URL;
  const FRONT_URL = process.env.REACT_APP_FRONT_URL;


  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
  
      console.log('code', code);
  
      if (code && code.startsWith('TG')) {
        setLoading(true);
  
        window.location.href = `/perfil/${userInfo?.data?.user_id}`;
        fetchBackend(code);
      }
    }
  }, []);

  const fetchBackend = async (code) => {
    try {
      const response = await fetch(`${API_URL}/integration/meli/code=${code}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
      });

      if (!response.ok) {
        throw new Error('Error al enviar el código al backend');
      }

      console.log('Código enviado al backend correctamente');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

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
        if (
          (storedToken === undefined || storedToken === null) &&
          isAuthenticated
        ) {
          setLoading(true);

          let newAccessToken;
          if (process.env.NODE_ENV === "development") {
            newAccessToken = await getAccessTokenWithPopup({
              authorizationParams: {
                audience: audience,
                scope: "read:current_user",
              },
            });
          } else {
            newAccessToken = await getAccessTokenSilently({
              audience: audience,
              scope: "openid profile email",
            });
          }

          console.log("newAccessToken", newAccessToken);

          setAccessToken(newAccessToken);
          localStorage.setItem("token", newAccessToken);
          setLoading(true);

          let verifyUserCompleted = false;

          // Start a timeout of 5 seconds
          const timeoutId = setTimeout(() => {
            if (!verifyUserCompleted) {
              localStorage.removeItem("token");
              const userInfoFromStorage = localStorage.getItem("userInfo");
              if (!userInfoFromStorage) {
                setLoading(false);
                logout();
                }
            }
          }, 5000);

          try {
            await verifyUser(newAccessToken);
            setTokenExists(true);
            setLoading(false);
            verifyUserCompleted = true;
            clearTimeout(timeoutId);
          } catch (error) {
            setLoading(false);
            logout();
          }
        }
      } catch (error) {
        setLoading(false);
        logout();
      }
    };

    if (!tokenExists) {
      fetchTokenAndVerifyUser();
    }
  }, [
    tokenExists,
    storedToken,
    getAccessTokenWithPopup,
    getAccessTokenSilently,
    audience,
    logout,
    isAuthenticated,
  ]);

  const verifyUser = async (token) => {
    try {
      const verifyResponse = await fetch(
        `${API_URL}/users/verify`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (verifyResponse.status === 401) {
        throw new Error("unauthorized user")
      }

      if (!verifyResponse.ok) {
        throw new Error("Failed to verify user");
      }

      const verifyData = await verifyResponse.json();
      console.log("verifyData", verifyData);
      localStorage.setItem("userInfo", JSON.stringify(verifyData));
      setUserInfo(verifyData);
    } catch (error) {
      console.error("Error verifying user:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    if (userInfo) {
      verifyPendingSurveys(userInfo);
    }
  }, [userInfo]);

  const verifyPendingSurveys = async (token) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if (!userInfo || !userInfo.data || !userInfo.data.user_id) {
        throw new Error("User info not found in localStorage");
      }

      const pendingSurveys = await fetch(
        `${API_URL}/forums-survey/pending/${userInfo.data.user_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      if (!pendingSurveys.ok) {
        throw new Error("Failed to get pending surveys");
      }

      const pendingSurveysResponse = await pendingSurveys.json();
      setPendingSurveysResponse(pendingSurveysResponse);
    } catch (error) {
      throw error;
    }
  };

  const handleCloseSurveyModal = (survey) => {
    const updatedSurveys = pendingSurveysResponse.data.filter(
      (item) => item.forum_id !== survey.forum_id
    );
    setPendingSurveysResponse({
      ...pendingSurveysResponse,
      data: updatedSurveys,
    });
  };

  if (isLoading || loading) {
    return <div>Loading ...</div>;
  }
  
  if (process.env.NODE_ENV === "development") {
      console.log("token", storedToken);
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
      {pendingSurveysResponse &&
        pendingSurveysResponse.data?.map((survey, index) => (
          <ModalSurvey
            key={index}
            closeModal={() => handleCloseSurveyModal(survey)}
            forumInfo={survey}
          />
        ))}
    </>
  );
}

export default HomePage;
