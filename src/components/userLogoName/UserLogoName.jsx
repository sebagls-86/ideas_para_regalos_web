import React from 'react'
import { Link } from 'react-router-dom'
import styles from './userLogoName.module.css'

function UserLogoName({name, userName, logo, to}) {
  return (
    <Link to={to} className={styles.container}>
        <img src={logo} alt={name} className={styles.image} width='54' height='54'/>
        <p className={styles.text}>{name}</p>
        <p>{userName}</p>
    </Link>
  )
}

export default UserLogoName