import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import styles from './primaryButton.module.css';   
import { Col } from 'react-bootstrap';


function PrimaryButton(props) {
    const {titulo, url} = props;
  return (
    <Col xs={6} sm={6} md={4}>
        <Link className={styles.primary__button} to={`${url}`}>{titulo}</Link>
    </Col>
  )
}
PrimaryButton.propTypes = {
    titulo: PropTypes.string,
    url: PropTypes.string,
}

export default PrimaryButton