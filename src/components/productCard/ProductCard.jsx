import React from 'react'
import styles from "./productCard.module.css"
import { Link } from 'react-router-dom'
function ProductCard({title, img, url}) {
  return (
    <Link to={url} className={styles.productContainer}>
        
        <img src={img} alt={title} className={styles.image} />
        <p className={styles.title}>{title}</p>
    </Link>
  )
}

export default ProductCard