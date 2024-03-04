import React, { useState, useEffect } from "react";
import WordsEdges from "../../components/wordsEdges/WordsEdges";
import styles from "./eventSnipet.module.css";

function EventSnipet() {
  const [eventosProximos, setEventosProximos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/scheduledEvents/upcoming")
      .then(response => response.json())
      .then(data => setEventosProximos(data.data))
      .catch(error => console.error("Error fetching upcoming events:", error));
  }, []);

  return (
    <div className={styles.container}>
      <h5 className={styles.title}>Eventos Próximos</h5>
      <div className={styles.content}>
        {eventosProximos.map(event => (
          <WordsEdges key={event.scheduled_event_id} label={event.event_type_name} to={`/explorar/${event.event_type_name}`} />
        ))}
      </div>
    </div>
  );
}

export default EventSnipet;
