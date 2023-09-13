import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import electronics from "../../assets/simpleCard.png";
import beauty from "../../assets/beauty-categoty.png";
import fashion from "../../assets/fashion-category.png";
import styles from "./SectionCategory.module.css";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";


export default function SectionCategory() {
  return (
    <>
    <div className={styles.categoryContainer}>
      <h2 className={styles.title}>Categorías</h2>
      <Swiper
        slidesPerView={3}
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
            src={electronics}
            alt="banner"
            className={styles.categoryImage}
          />
          <h3 id="category">Electrónicos</h3>
        </SwiperSlide>
        </Link>
        <SwiperSlide className={styles.category}> 
          <img
            src={beauty}
            alt="beauty"
            className={styles.categoryImage}
          />
          <h3>Belleza</h3>
          </SwiperSlide>
        <SwiperSlide> <img
            src={fashion}
            alt="fashion"
            className={styles.categoryImage}
          />
          <h3>Moda</h3></SwiperSlide>
        <SwiperSlide> <img
            src={fashion}
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