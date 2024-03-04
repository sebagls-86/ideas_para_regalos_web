import React, { useEffect, useState } from "react";
import AsideLogin from "../../modules/asideLogin/AsideLogin";
import { Col, Row } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import Search from "../../components/search/Search";
import Nav from "../../modules/nav/Nav";
import NavBar from "../../modules/navBar/NavBar";
import LoginMobile from "../../modules/loginMobile/LoginMobile";
import EventSnipet from "../../modules/eventSnipet/EventSnipet";
import UserSuggestions from "../../modules/userSuggestions/UserSuggestions";
import Links from "../../components/link/Links";
import PageTitle from "../../components/pageTitle/PageTitle";
import styles from "./eventsPage.module.css";
import Button from "../../components/button/Button";
import ModalLogin from "../../modules/modalLogin/ModalLogin";

function EventsPage() {
  const [user] = useAuthState(auth);
  const [tokenExists, setTokenExists] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null && token !== undefined) {
      setTokenExists(true);
    }
  }, []);

  return (
    <>
      {!user && !tokenExists}
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
          {user || tokenExists ? (
            <>
              <PageTitle title="Eventos" />
              {/*SIGNED IN*/}
              <div
                className={`${styles.singleColumn} ${styles.singleColumn_signed_in} `}
              >
                <div className={`${styles.row}  ${styles.row_signed_in} `}>
                  <div className={`${styles.banner} ${styles.first_banner}`} />
                  <div>
                    <div className={styles.events_list}>
                      <ul>
                        <li>1 de Enero - Año nuevo</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className={`${styles.row}  ${styles.row_signed_in} `}>
                  <div className={`${styles.banner} ${styles.second_banner}`} />
                  <div>
                    <div className={styles.products_list}>
                      <ul>
                        <li>1 de Enero - Año nuevo</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className={`${styles.row}  ${styles.row_signed_in} `}>
                  <div className={`${styles.banner} ${styles.third_banner}`} />
                  <div>
                    <div className={styles.products_list}>
                      <ul>
                        <li>REGALO</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/*SIGNED OUT*/}
              <div className={styles.singleColumn}>
                <div className={styles.row}>
                  <div className={`${styles.banner} ${styles.first_banner}`} />
                  <div>
                    <div className={styles.events_list}>
                      <ul>
                        <li>1 de Enero - Año nuevo</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={`${styles.banner} ${styles.second_banner}`} />
                  <div>
                    <div className={styles.products_list}>
                      <ul>
                        <li>1 de Enero - Año nuevo</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={`${styles.banner} ${styles.third_banner}`} />
                  <div>
                    <div className={styles.link_to}>
                      <h5>
                        ¡Dale un toque personal a tus regalos en cada ocasión
                        especial!
                      </h5>
                      <p>
                        Encuentra la manera perfecta de expresar tu afecto con
                        nuestras opciones de personalización única.
                      </p>

                      <Button
                        className={`btn primary__button-outline ${styles.start_btn}`}
                        label={"Empezar"}
                        onClick={() => setOpenModal(true)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
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
