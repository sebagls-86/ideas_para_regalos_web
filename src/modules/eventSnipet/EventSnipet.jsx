import React, { useState, useEffect } from "react";
import WordsEdges from "../../components/wordsEdges/WordsEdges";
import styles from "./eventSnipet.module.css";

function EventSnipet() {
  const [eventosProximos, setEventosProximos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/scheduledEvents/upcoming")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        if (data.data === "No results found") {
          setEventosProximos([]);
        } else {
          setEventosProximos(data.data);
        }
      })
      .catch(error => {
        setError(error);
        console.error("Error fetching upcoming events:", error);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.container}>
      <h5 className={styles.title}>Eventos Próximos</h5>
      <div className={styles.content}>
        {eventosProximos.length === 0 ? (
          <p>No hay eventos disponibles</p>
        ) : (
          eventosProximos.map(event => (
            <WordsEdges key={event.scheduled_event_id} label={event.event_type_name} to={`/explorar/${event.event_type_name}`} />
          ))
        )}
      </div>
    </div>
  );
}

export default EventSnipet;
