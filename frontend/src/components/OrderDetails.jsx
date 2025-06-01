import React from 'react'
import styles from '../styles/componentStyles/OrderDetails.module.css'
import { CircleCheckBig } from 'lucide-react';
import { FaHourglassEnd } from "react-icons/fa6";
import { PiForkKnifeFill } from "react-icons/pi";
import { updateOrderStatus } from '../libs/services.js';


function OrderDetails({order, setOrder, orders}) {
    const options = [
      {value:"Not picked up", label:"Not picked up"},
      {value:"Picked up", label:"Picked up"},
    ]
    const updateOrder = async()=>{
     const res = await updateOrderStatus({id:order._id, status:'Picked up'})

setOrder(res.data.data)
      console.log(res)
    
    }



    function getTotalItemCount(order) {
  return order.items.reduce((sum, i) => sum + i.quantity, 0);
}
const count = getTotalItemCount(order)
function formatDateTime(input) {
  const date = new Date(input);
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const getOrdinal = (n) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  const formatTime = (d) =>
    d.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

  if (isToday) {
    return formatTime(date);
  } else {
    const day = getOrdinal(date.getDate());
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const time = formatTime(date);
    return `${day}, ${month}, ${year} - ${time}`;
  }
}
const time = formatDateTime(order.createdAt);
  return (
    <div className={`${styles.main} ${order.prepTime === 0?(order.type==='Dine In'? styles.DineIn:styles.TakeAway):""}`}>
        <div className={styles.details}>
            <div className={styles.left}>
                <div className={styles.number}>
                    <PiForkKnifeFill size={30} color='rgb(43, 145, 255)'/>
                    <p className={styles.numberP}>{`# ${order.number}`}</p>
                </div>
                 {order.type === "Dine In" && <p className={styles.table_No}>{`Table-${order.table_No}`}</p>} 
              
                <p className={styles.table_No}>{time}</p>
                <p>{`${count} ${count>1?"items":"item"}`}</p>
            </div>
            <div className={styles.right}>
                <div className={`${styles.statusDiv} ${order.prepTime === 0?(order.type==='Dine In'? styles.DineIn:styles.TakeAway):""}`}>
                   {
                    order.prepTime === 0?(
                        order.type ==='Dine In'?(
                            <>
                            <p className={styles.DineInStatusText}>Dine In</p>
                            <p className={styles.time}>Served</p>
                            </>
                        ):(
                            <>
                            <p className={styles.takeAwayStatusText}>Take Away</p>
                           {
                            order.status === 'Not picked up'?(
                              <select className={styles.selection} name="" id="" onChange={()=>{
                                updateOrder()
                              }}>
                                <option value="Not picked up">Not picked up</option>
                                <option value="Picked up">Picked up</option>
                              </select>
                            ):(
                             <p>{order.status}</p> 
                            )
                           }
                            </>
                        )
                    ):(
                        <>
                        <p className={styles.pendingText}>{order.type}</p>
                        <p className={styles.time}>{`${order.prepTime} mins`}</p>
                        </>
                        
                    )
                   }
                </div>
            </div>
        </div>
        <div className={styles.items}>
            {
                order.items.map((item, index) =>(
                    <p key={index}>{`${item.quantity}x ${item.item.name}`}</p>
                ))
            }
        </div>
        <div className={`${styles.status} ${order.prepTime === 0?(order.type==='Dine In'? styles.DineInStatusColor:styles.TakeAwayStatusColor):""}`}>
            {
                order.prepTime === 0?(order.type === 'Dine In' ?<>
                <p className={styles.donestatusP}> Done
                    </p>
                    <CircleCheckBig color='rgb(14,145,47)' />
                    </>:<>
                    <p className={styles.takeAwayStatusP}>Done</p>
                    <CircleCheckBig color='rgb(100,112,111)'/>
                    </>):<>
                    <p className={styles.pendingStatusP}>Processing</p>
                    <FaHourglassEnd color='rgb(216,115,0)' />
                    </>
            }
        </div>
      
    </div>
  )
}

export default OrderDetails
