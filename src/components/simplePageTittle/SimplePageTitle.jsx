import React from "react";
import styles from "./simplePageTitle.module.css";
import PropTypes from "prop-types";

function SimplePageTitle({ title }) {
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
    </div>
  );
}

SimplePageTitle.propTypes = {
    title: PropTypes.string
  };
export default SimplePageTitle;
