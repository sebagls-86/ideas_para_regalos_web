import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./SectionEvents.module.css";
import { Link } from "react-router-dom";

export default function SectionEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/eventTypes");
      if (response.ok) {
        const responseData = await response.json();
        const data = responseData.data || [];
        setEvents(data);
      } else {
        console.error("Error fetching events:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.eventsContainer}>
        <h2 className={styles.title}>Eventos</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              768: {
                slidesPerView: 3,
              },
              0: {
                slidesPerView: 1,
              },
            }}
            loop={true}
            autoplay={{ delay: 3000 }}
          >
            {events.map((event, index) => (
                <SwiperSlide>
                
                <Link to={`/explorar/eventos/${event.event_type_id}`}>
                  <img
                    src={`http://localhost:8080${event.image}`}
                    alt="banner"
                    className={styles.eventImage}
                  />
                  <h3>{event.name}</h3>
                  </Link>
                </SwiperSlide>
              
            ))}
          </Swiper>
        )}
      </div>
    </>
  );
}
