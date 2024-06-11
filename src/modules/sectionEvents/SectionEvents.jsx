import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./SectionEvents.module.css";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

export default function SectionEvents({ slidesPerView }) {
  const [events, setEvents] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL;

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

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredEvents = events.filter((category) =>
    category.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <>
      <div className={styles.eventsContainer}>
        <div className={styles.title}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Eventos"
            value={searchInput}
            onChange={handleInputChange}
            className={styles.searchInput}
          />
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {searchInput && filteredEvents.length === 0 ? (
            <p className={styles.nomatch_msg}>
              No se encontraron eventos para "{searchInput}".
            </p>
          ) : (
            <Swiper
              slidesPerView={slidesPerView}
              spaceBetween={20}
              pagination={{
                dynamicBullets: true,
              }}
              loop={true}
              autoplay={{ delay: 3000 }}
              //modules={[Pagination]}
              breakpoints={{
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
            >
              {filteredEvents.map((event, index) => (
                <SwiperSlide key={index} style={{ marginLeft: "2rem" }}>
                  <Link to={`/explorar/eventos/${event.event_type_id}`}>
                    <img
                      src={`${event.image}`}
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
      )}
    </>
  );
}
