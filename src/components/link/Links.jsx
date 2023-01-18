import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./css/links.module.css";
import { Col } from "react-bootstrap";

function Links(props) {
  const { title, url, type } = props;

  return (
    <>
      {type === "primary" ? (
        <Link className={styles.primary__button} to={`${url}`}>
          {title}
        </Link>
      ) : (
        <Link className={styles.secondary__button} to={`${url}`}>
          {title}
        </Link>
      )}
    </>
  );
}
Links.propTypes = {
  titulo: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string,
};

export default Links;
