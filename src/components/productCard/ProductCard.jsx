import React, { useState } from "react";
import styles from "./productCard.module.css";

export default function ProductCard({ image, name }) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveClick = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div className={styles.productCard}>
      <img src={image} alt="" className={styles.productImage} />
      <button
        className={`${styles.saveButton} ${isSaved ? styles.clicked : ""}`}
        onClick={handleSaveClick}
      ></button>
      <h3 id="product">{name}</h3>
    </div>
  );
}
