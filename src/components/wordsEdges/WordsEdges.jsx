import React from 'react'
import { Link } from 'react-router-dom'
import styles from './wordsEdges.module.css'

function WordsEdges({to, label }) {
  return (
    <Link to={to}>
        <p className={styles.content}>{label}</p>
    </Link>
  )
}

export default WordsEdges