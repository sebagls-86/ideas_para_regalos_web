import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./SectionEvents.module.css";
import { Link } from "react-router-dom";

export default function SectionEvents({ slidesPerView }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL;
  const URL_IMAGES = process.env.REACT_APP_URL_IMAGES;

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_URL}/eventTypes`);
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
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Swiper
          slidesPerView={slidesPerView}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          loop={true}
          autoplay={{ delay: 3000 }}
        >
          {events.map((event, index) => (
            <SwiperSlide key={index} style={{ marginLeft: "2rem" }}>
              <Link to={`/explorar/eventos/${event.event_type_id}`}>
                <img
                  src={`${URL_IMAGES}${event.image}`}
                  alt="banner"
                  className={styles.eventImage}
                />
                <h3>{event.name}</h3>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}
