import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import camera from "../../assets/camera.png";
import hairdryer from "../../assets/hair-dryer.png";
import airpods from "../../assets/airpodsmax.png";
import facemassage from "../../assets/face-massage.png"
import sunscreen from "../../assets/sunscreen.png"
import serum from "../../assets/serum.png"
import styles from "./sectionFeatured.module.css";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";
import ProductCard from "../../components/productCard/ProductCard";


export default function SectionFeatured() {

  return (
    <>
      <div className={styles.productsContainer}>
        <h2 className={styles.title}>Productos destacados</h2>
        <Swiper
          slidesPerView={3}
          navigation={true}
          spaceBetween={30}
          modules={[Navigation]}
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
            <SwiperSlide className={styles.swiperSlide}>
              <ProductCard image={airpods} name="Airpods Max" />
            </SwiperSlide>
          </Link>
          <Link to="">
          <SwiperSlide className={styles.swiperSlide}>
              <ProductCard image={hairdryer} name="Secadora de pelo" />
            </SwiperSlide>
          </Link>
          <Link to="">
          <SwiperSlide className={styles.swiperSlide}>
              <ProductCard image={camera} name="Cámara de fotos" />
            </SwiperSlide>
          </Link>
          <Link to="">
          <SwiperSlide className={styles.swiperSlide}>
              <ProductCard image={facemassage} name="Set guasha" />
            </SwiperSlide>
          </Link>
          <Link to="">
          <SwiperSlide className={styles.swiperSlide}>
              <ProductCard image={sunscreen} name="Protector solar" />
            </SwiperSlide>
          </Link>
          <Link to="">
          <SwiperSlide className={styles.swiperSlide}>
              <ProductCard image={serum} name="Sérum" />
            </SwiperSlide>
          </Link>
        </Swiper>
      </div>
    </>
  );
}
