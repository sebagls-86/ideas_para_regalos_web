import React, { useEffect, useState } from "react";
import NavBar from "../../modules/navBar/NavBar";
import styles from "./faqPage.module.css";
import { Col } from "react-bootstrap";

function FaqPage() {
  const userInfo = localStorage.getItem("userInfo");
  const [tokenExists, setTokenExists] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null && token !== undefined) {
      setTokenExists(true);
    }
  }, []);

  return (
    <>
      {!userInfo && !tokenExists}
      <NavBar />
      <div className={styles.container}>
        <div className="">
          <h1 className={styles.page_title}>Preguntas frecuentes</h1>
          <Col className={styles.column}>
            <div>
              <h4 className={styles.question_title}>
                ¿Cómo puedo encontrar ideas de regalos adecuadas para mis seres
                queridos?
              </h4>
              <div className={styles.divider}></div>
              <p>
                En el foro, puedes armar el perfil del agasajado completando un
                formulario con su información personal, como gustos, intereses,
                edad, entre otros. Esto nos ayudará a proporcionarte
                recomendaciones más personalizadas y precisas según las
                preferencias del destinatario del regalo.
              </p>
            </div>
            <div>
              <h4 className={styles.question_title}>
                ¿Cómo puedo interactuar con otros usuarios y compartir ideas de
                regalos?
              </h4>
              <div className={styles.divider}></div>
              <p>
                En nuestra plataforma, puedes participar activamente en la
                comunidad comentando en publicaciones y compartiendo fotos
                relacionadas con ideas de regalos. Esta interacción te permite
                recibir retroalimentación instantánea de otros usuarios y
                compartir tus propias experiencias y sugerencias de regalos de
                una manera visual y atractiva.
              </p>
            </div>
          </Col>
          <Col className={styles.column}>
            <div>
              <h4 className={styles.question_title}>
                ¿Existe alguna función para guardar o marcar las ideas de
                regalos que me interesen para consultarlas más tarde?
              </h4>
              <div className={styles.divider}></div>
              <p>
                Sí, en nuestra plataforma ofrecemos una función muy útil que te
                permite guardar las ideas de regalos que te interesen para
                consultarlas más tarde. Esta función te permite crear y
                gestionar listas personalizadas de productos, donde puedes
                almacenar tus ideas de regalos favoritas de una manera
                organizada y fácil de acceder.
                <br /> Una vez que encuentres un producto que te guste,
                simplemente selecciona la opción de "Guardar en lista" y elige
                la lista en la que deseas agregarlo. Además, tienes la libertad
                de personalizar el nombre de tus listas para reflejar el tema o
                la ocasión específica, como "Regalos de cumpleaños para mamá" o
                "Ideas de regalos para Navidad". Posteriormente, puedes acceder
                a tus listas guardadas en cualquier momento para revisarlas,
                comparar opciones y tomar decisiones informadas sobre tus
                compras de regalos
              </p>
            </div>

            <div>
              <h4 className={styles.question_title}>
                ¿Cómo puedo asegurarme de que las recomendaciones de regalos
                sean útiles y apropiadas?
              </h4>
              <div className={styles.divider}></div>
              <p>
                Es importante responder y completar el formulario de perfil del
                agasajado de manera precisa y detallada. Cuanta más información
                proporciones sobre los gustos, intereses y preferencias del
                destinatario del regalo, mejores serán las recomendaciones que
                recibas. Además, asegúrate de proporcionar comentarios claros y
                constructivos sobre las recomendaciones que recibas para ayudar
                a mejorar la calidad de las sugerencias en la plataforma.
              </p>
            </div>
          </Col>
        </div>
      </div>
    </>
  );
}

export default FaqPage;
