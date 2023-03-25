import React from "react";
import { Link } from "react-router-dom";
import styles from "./simpleCard.module.css";

function SimpleCard({ title, url = "/", image }) {
  return (
    <Link to={url}>
      <img clasName="br-10" src={image} alt={title} />
      <h3 className={styles.cardTitle}>{title}</h3>
    </Link>
  );
}

export default SimpleCard;
