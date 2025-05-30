import React from 'react'
import Style from '../styles/componentStyles/Navbar.module.css'

function Navbar({children}) {
  return (
    <div className={Style.main}>
        {children}
      
    </div>
  )
}

export default Navbar
