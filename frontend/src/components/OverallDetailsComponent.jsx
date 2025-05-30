import React from 'react'
import styles from '../styles/componentStyles/OverallDetails.module.css'

function OverallDetailsComponent({imag, value, tag}) {
    const Icon = imag
  return (
    <div className={styles.main}>
        <div className={styles.image}>
            <Icon  size={30}/>
        </div>
        <div className={styles.tags}>
            <p className={styles.value}>{value}</p>
            <p className={styles.tag}>{tag}</p>
        </div>
      
    </div>
  )
}

export default OverallDetailsComponent
