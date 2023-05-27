import React from 'react'
import styles from "./productCard.module.css"

function ProductCard({title, img}) {
  return (
    <div className={styles.productContainer}>
        <img src={img} alt={title} className={styles.image} />
        <p className={styles.title}>{title}</p>
    </div>
  )
}

export default ProductCard