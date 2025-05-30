import React, { useEffect, useState } from 'react'
import style from '../styles/pageStyles/OrderLine.module.css'
import OrderDetails from '../components/OrderDetails.jsx'
import { getOrders } from '../libs/services.js'
import Navbar from '../components/Navbar.jsx'




function OrderLine() {
    const [orders, setOrders] = useState([])
    const [searchText, setSearchText] = useState('')
    const [searched, setSearched] = useState([])


     const fetchOrders = async () =>{
            const response = await getOrders()
            setOrders(response.data.data)
        }
    useEffect(()=>{
        fetchOrders()
       

    },[])
    setInterval(()=>{
        fetchOrders()
    }, 60000)

    useEffect(()=>{
        const searched= orders.filter(order =>{
            return String(order.number).includes(searchText)

        })
        setSearched(searched)
    }, [searchText])
    
  return (
    <div className={style.main}>
        <Navbar>
        <div className={style.child}>
          <div className={style.blank}>B</div>
          <input type="text" className={style.searchInput} value={searchText} onChange={(e)=>setSearchText(e.target.value)} placeholder='Search' />
          
        </div>
      </Navbar>
      <div className={style.container}>
        <h1>Order Line</h1>
        <div className={style.orderContainer}>

        {
            searched.length>0?(
                searched.map((order, index)=>(
                    <OrderDetails key={index} order={order} setOrder={setOrders} orders={orders}/>
                ))
            ):(
                orders.map((order, index)=>(
                    <OrderDetails key={index} order={order} setOrder={setOrders} orders={orders}/>
                ))
            )
        }
        </div>

      </div>
      
    </div>
  )
}

export default OrderLine
