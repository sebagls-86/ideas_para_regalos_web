
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import valentin from "../../assets/san-valentin-event.png";
import christmas from "../../assets/xmas-event.png";
import birthday from "../../assets/birthday-event.png";
import styles from "./sectionFeatured.module.css";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";


export default function SectionFeatured() {
  return (
    <>
    <div className={styles.productsContainer}>
      <h2 className={styles.title}>Productos destacados</h2>
      <Swiper

        slidesPerView={4}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        autoplay={{ delay: 3000 }}
        breakpoints={{
         
          768: {
            slidesPerView: 3,
          },
          
          0: {
            slidesPerView: 1,
          },
        }}
        
      >
        <Link to="">
        <SwiperSlide>
          {" "}
          <img
            src={christmas}
            alt="banner"
            className={styles.eventImage}
          />
          <h3 id="category">Navidad</h3>
        </SwiperSlide>
        </Link>
        <SwiperSlide className={styles.category}> 
          <img
            src={birthday}
            alt="beauty"
            className={styles.eventImage}
          />
          <h3>Cumpleaños</h3>
          </SwiperSlide>
        <SwiperSlide> <img
            src={valentin}
            alt="fashion"
            className={styles.eventImage}
          />
          <h3>San Valentín</h3></SwiperSlide>
        <SwiperSlide> <img
            src={birthday}
            alt="fashion"
          />
          <label>Belleza</label></SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
      </div>
    </>
  );
}