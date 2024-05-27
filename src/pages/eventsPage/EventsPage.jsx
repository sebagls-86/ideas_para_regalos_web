import React, { useEffect, useState } from "react";
import AsideLogin from "../../modules/asideLogin/AsideLogin";
import { Col } from "react-bootstrap";
import Search from "../../components/search/Search";
import Nav from "../../modules/nav/Nav";
import NavBar from "../../modules/navBar/NavBar";
import LoginMobile from "../../modules/loginMobile/LoginMobile";
import EventSnipet from "../../modules/eventSnipet/EventSnipet";
import UserSuggestions from "../../modules/userSuggestions/UserSuggestions";
import Links from "../../components/link/Links";
import { Link } from "react-router-dom";
import PageTitle from "../../components/pageTitle/PageTitle";
import styles from "./eventsPage.module.css";
import { useAuth0 } from "@auth0/auth0-react";

function EventsPage() {
  const [tokenExists, setTokenExists] = useState(false);
  const [scheduledEvents, setScheduledEvents] = useState([]);
  const { user, isAuthenticated } = useAuth0();
  const userInfo =
    (isAuthenticated && JSON.parse(localStorage.getItem("userInfo")).data) ||
    null;
  const API_URL = process.env.REACT_APP_API_URL;
  const URL_IMAGES = process.env.REACT_APP_URL_IMAGES;

  useEffect(() => {
    const token = localStorage.getItem("token");
    setTokenExists(token !== null && token !== undefined);

    // Fetch upcoming events with robust error handling
    fetch(`${API_URL}/scheduledEvents/upcoming`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (!data || !data.data || !data.data.length) {
          console.warn("No upcoming events found from the API response.");
          setScheduledEvents([]);
          return;
        }

        const eventsWithImageURLs = data.data.map((event) => ({
          ...event,
          image: `${URL_IMAGES}${event.image}`,
        }));

        setScheduledEvents(eventsWithImageURLs);
      })
      .catch((error) => {
        console.error("Error fetching scheduled events:", error);
      });
  }, []);

  return (
    <>
      {!isAuthenticated && <NavBar />} 
      <div
        className={`contenedor ${!user && !tokenExists ? "full-width" : ""}`}
      >
        {isAuthenticated && (
          <div className="left__aside">
            <Nav userInfo={userInfo} />
          </div>
        )}
        <div className="content">
          <>
            {isAuthenticated && (
              <div className={styles.page_title}>
                <PageTitle title="Eventos" />
              </div>
            )}
            <div
              className={`${styles.singleColumn} ${styles.singleColumn_signed_in}`}
            >
              {scheduledEvents.map((event, index) => (
                <Link
                  to={`/explorar/eventos/${event.event_type_id}`}
                  key={event.scheduled_event_id}
                >
                  <div
                    className={`${styles.row} ${
                      isAuthenticated
                        ? styles.row_logged_in
                        : styles.row_logged_out
                    }`}
                  >
                    {index % 2 === 0 ? (
                      <>
                        <div>
                          <img
                            src={event.image}
                            alt={event.event_type_name}
                            className={styles.eventImage}
                          />
                        </div>
                        <div>
                          <div
                            className={`${styles.event_info} ${styles.even_event_info}`}
                          >
                            <h3>{event.event_type_name}</h3>
                            <p>{event.date}</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className={`${styles.event_info} ${styles.odd_event_info}`}
                        >
                          <h3>{event.event_type_name}</h3>
                          <p>{event.date}</p>
                        </div>
                        <div>
                          <img
                            src={event.image}
                            alt={event.event_type_name}
                            className={styles.eventImage}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </>
        </div>
        {isAuthenticated && (
          <aside className="right__aside">
            <div className="container pt-2">
              {isAuthenticated && <Search />}
              {!isAuthenticated && <AsideLogin />}
              {isAuthenticated && (
                <>
                  <EventSnipet />
                  <UserSuggestions />
                  <div className="mt-4 d-flex justify-content-center ">
                    <Links
                      title="Post nuevo regalo"
                      url="/nuevoRegalo"
                      type={"primary"}
                    />
                  </div>
                </>
              )}
            </div>
          </aside>
        )}
      </div>
    </>
  );
}

export default EventsPage;
