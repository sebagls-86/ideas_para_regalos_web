import React, { useState, useEffect } from "react";
import AsideLogin from "../../modules/asideLogin/AsideLogin";
import Nav from "../../modules/nav/Nav";
import Post from "../../modules/post/Post";
import EventSnipet from "../../modules/eventSnipet/EventSnipet";
import UserSuggestions from "../../modules/userSuggestions/UserSuggestions";
import ModalSurvey from "../../modules/modalSurvey/ModalSurvey";
import Links from "../../components/link/Links";
import PageTitle from "../../components/pageTitle/PageTitle";
import NuevoRegaloHome from "../../components/nuevoRegaloHome/NuevoRegaloHome";
import Search from "../../components/search/Search";
import { useAuth0 } from "@auth0/auth0-react";
import config from "../../auth_config.json";
import Footer from "../../modules/footer/Footer";
import banner1 from "../../assets/banner-promo-1.png";
import { Swiper, SwiperSlide } from "swiper/react";

function HomePage() {
  const [tokenExists, setTokenExists] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Agrega el estado para searchTerm
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
  const userId =
    storedUserInfo?.user_id ||
    (localStorage.getItem("userInfo") &&
      JSON.parse(localStorage.getItem("userInfo")).data.user_id) ||
    null;
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code && code.startsWith("TG")) {
        setLoading(true);

        window.location.href = `/perfil/${userId}`;
        fetchBackend(code);
      }
    }
  }, []);

  const fetchBackend = async (code) => {
    try {
      const response = await fetch(`${API_URL}/integration/meli/code=${code}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el código al backend");
      }
    } catch (error) {
      console.error("Error:", error);
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
              authorizationParams: {
                audience: audience,
                scope: "read:current_user",
              },
            });
          }

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
          }, 10000);

          try {
            await verifyUser(newAccessToken);
            setTokenExists(true);
            setLoading(false);
            verifyUserCompleted = true;
            clearTimeout(timeoutId);
          } catch (error) {
            localStorage.removeItem("token");
            setLoading(false);
            logout();
          }
        }
      } catch (error) {
        setLoading(false);
        localStorage.removeItem("token");
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
      const verifyResponse = await fetch(`${API_URL}/users/verify`, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      });

      if (verifyResponse.status === 401) {
        throw new Error("unauthorized user");
      }

      if (!verifyResponse.ok) {
        throw new Error("Failed to verify user");
      }

      const verifyData = await verifyResponse.json();
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
        const errorMessage = await pendingSurveys.text();
        if (errorMessage.includes("Failed to validate JWT")) {
          localStorage.removeItem("token");
          localStorage.removeItem("userInfo");
          logout();
        } else {
          console.error("Failed to get pending surveys:", errorMessage);
        }
      } else {
        const pendingSurveysResponse = await pendingSurveys.json();
        setPendingSurveysResponse(pendingSurveysResponse);
      }
    } catch (error) {
      console.error("Error verifying pending surveys:", error);
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

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  if (isLoading || loading) {
    return <div>Loading ...</div>;
  }

  if (process.env.NODE_ENV === "development") {
    console.log("token", storedToken);
  }

  return (
    <>
      {/*  {!isAuthenticated && !tokenExists && <NavBar />}*/}
      <div className="contenedor">
        <div className="left__aside">
          <Nav userInfo={userInfo?.data} />
        </div>
        <div className="content">
          {(tokenExists || isAuthenticated) && <PageTitle title="Inicio" />}

          {(!tokenExists || !isAuthenticated) && (
            <img src={banner1} alt="banner" className="home_banner" />
          )}

          {(tokenExists || isAuthenticated) && (
            <div className="mb-3">
              <NuevoRegaloHome />{" "}
            </div>
          )}
          <div className=" bordes-y">
            <Post searchTerm={searchTerm} userInfo={userInfo?.data} />
          </div>
        </div>
        <aside
          className={`right__aside ${
            !isAuthenticated && !tokenExists ? "right_aside_loggedout" : ""
          }`}
        >
          <div className="container pt-2 d-flex flex-column justify-content-between h-100">
            <div>
              <Search
                onSearch={handleSearch}
                placeholder={"Buscar publicaciones"}
              />
              <EventSnipet />
              {(isAuthenticated || tokenExists) && (
                <>
                  <UserSuggestions userInfo={userInfo?.data} />

                  <div className="mt-4 d-flex justify-content-center ">
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
            <div>
              <Footer />
            </div>
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
