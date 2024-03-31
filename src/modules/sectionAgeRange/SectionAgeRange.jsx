import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./SectionAgeRange.module.css";
import { Link } from "react-router-dom";

export default function SectionAgeRange() {
  const [ageRanges, setAgeRanges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/age-ranges");
      if (response.ok) {
        const responseData = await response.json();
        const data = responseData.data || [];
        setAgeRanges(data);
      } else {
        console.error("Error fetching categories:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.categoryContainer}>
      <h2 className={styles.title}>Rango de edad</h2>
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
          {ageRanges.map((ageRange, index) => (
            <SwiperSlide key={index}>
              <Link
                to={`/explorar/rango-edad/${ageRange.age_range_id}`}
                className={styles.categoryLink}
              >
                {ageRange.image ? (
                  <img
                    src={`http://localhost:8080${ageRange.image}`}
                    alt="banner"
                    className={styles.categoryImage}
                  />
                ) : (
                  <div className={styles.placeholder}></div>
                )}
                <h3>{ageRange.name}</h3>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}