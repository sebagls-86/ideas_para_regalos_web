import React from "react";
import WordsEdges from "../../components/wordsEdges/WordsEdges";
import styles from "./eventSnipet.module.css";

function EventSnipet() {
  const eventosProximos = [
    {
      id: 1,
      event: "Dia de la Madre",
    },
    {
      id: 2,
      event: "Día de la secretaria",
    },
    {
      id: 3,
      event: "Día del inmigrante",
    },
    {
      id: 4,
      event: "Día del maestro",
    },
    {
      id: 5,
      event: "Día del bibliotecario",
    },
    {
      id: 6,
      event: "Día del jubilado",
    },
    {
      id: 7,
      event: "Día del estudiante",
    },
    {
      id: 8,
      event: "Primavera",
    },
    {
      id: 9,
      event: "Día del empleado de comercio",
    },
    {
      id: 10,
      event: "Día del turismo",
    },
    {
      id: 11,
      event: "Día del hincha de River",
    },
  ];

  return (
    <div className={styles.container}>
      <h5 className={styles.title}>Eventos Próximos</h5>
      <div className={styles.content}>
        {eventosProximos.map((event, index) => {
          return <WordsEdges key={event.id} label={event.event} to={`/explorar/${event.event}`} />;
        })}
      </div>
    </div>
  );
}

export default EventSnipet;
