import React, { useEffect, useState } from "react";
import AsideLogin from "../../modules/asideLogin/AsideLogin";
import { Col } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
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
import ModalLogin from "../../modules/modalLogin/ModalLogin";

function EventsPage() {
  const [user] = useAuthState(auth);
  const [tokenExists, setTokenExists] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [scheduledEvents, setScheduledEvents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null && token !== undefined) {
      setTokenExists(true);
    }

    // Llamada a la API para obtener eventos programados
    fetch("http://localhost:8080/api/v1/scheduledEvents/upcoming")
      .then((response) => response.json())
      .then((data) => {
        // Agregar URL base a las rutas de las imágenes
        const eventsWithImageURLs = data.data.map((event) => ({
          ...event,
          image: `http://localhost:8080/images/eventTypes/${event.image}`,
        }));
        setScheduledEvents(eventsWithImageURLs);
      })
      .catch((error) =>
        console.error("Error fetching scheduled events:", error)
      );
  }, []);

  return (
    <>
      <NavBar />
      <div
        className={`contenedor ${!user && !tokenExists ? "full-width" : ""}`}
      >
        {user ||
          (tokenExists && (
            <div className="left__aside">
              <Nav user={user?.displayName} />
            </div>
          ))}
        <div className="content">
          {!user && !tokenExists && (
            <Col>
              <LoginMobile />
            </Col>
          )}
          <>
            <PageTitle title="Eventos" />
            <div
              className={`${styles.singleColumn} ${styles.singleColumn_signed_in}`}
            >
              {scheduledEvents.map((event) => (
                <Link to={`/explorar/${event.event_type_name}`} key={event.scheduled_event_id}>
                  <div className={`${styles.row} ${styles.row_signed_in}`}>
                    <div>
                      <img
                        src={event.image}
                        alt={event.event_type_name}
                        className={styles.eventImage}
                      />
                    </div>
                    <div>
                      <div>
                        <h3>{event.event_type_name}</h3>
                        <p>{event.date}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        </div>
        {openModal && <ModalLogin closeModal={() => setOpenModal(false)} />}
        {user ||
          (tokenExists && (
            <aside className="right__aside">
              <div className="container pt-2">
                {user || (tokenExists && <Search />)}
                {!user && !tokenExists && <AsideLogin />}
                {(user || tokenExists) && (
                  <>
                    <EventSnipet />
                    <UserSuggestions />
                    <div className="mt-5 d-flex justify-content-center ">
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
          ))}
      </div>
    </>
  );
}

export default EventsPage;
