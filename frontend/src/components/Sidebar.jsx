import React from 'react'
import {Link} from 'react-router'
import { BiSolidFoodMenu } from "react-icons/bi";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { MdOutlineEventSeat } from "react-icons/md";
import { MdBarChart } from "react-icons/md";
import Style from '../styles/componentStyles/Sidebar.module.css'

function Sidebar() {
  return (
    <div className={Style.main}>
        <div className={Style.fake}>B</div>
        <div className={Style.links}>
            <div className={Style.upper}>


        <Link to={'/'} className={Style.link}><BsFillGrid1X2Fill color='black' size={25}/></Link>
        <Link to={'/tables'} className={Style.link}><MdOutlineEventSeat color='black' size={25}/></Link>
        <Link to={'/orders'} className={Style.link}>
            <BiSolidFoodMenu color='black' size={25}/>
            </Link>
        <a href="/user" className={Style.link}><MdBarChart color='black' size={30}/></a>

            </div>
            <div className={Style.lower}>B</div>
        </div>

        

      
    </div>
  )
}

export default Sidebar
