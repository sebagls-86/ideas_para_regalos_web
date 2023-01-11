import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import styles from './secondaryButton.module.css';   
import { Col } from 'react-bootstrap';


function SecondaryButton(props) {
    const {titulo, url} = props;
  return (
    <Col xs={6} sm={6} md={4}>
        <Link className={`${styles.secondary__button} ${styles.btn__hover}`} to={`${url}`}>{titulo}</Link>
    </Col>
  )
}
SecondaryButton.propTypes = {
    titulo: PropTypes.string,
    url: PropTypes.string,
}

export default SecondaryButton