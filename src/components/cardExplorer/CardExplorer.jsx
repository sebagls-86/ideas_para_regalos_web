import React from "react";
import styles from "./cardExplorer.module.css";
import { Link } from "react-router-dom";



function CardExplorer({ label, img, url }) {
  return (
    <Link to={url} className={styles.content}>
      <img src={img} alt={label} width="300" height="200" className={styles.image}/>
      <h3 className={styles.title}>{label}</h3>
    </Link>
  );
}

export default CardExplorer;
