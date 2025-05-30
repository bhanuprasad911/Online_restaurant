import React, { useContext, useState } from "react";
import styles from "../Styles/ComponentStyles/ItemSummary.module.css";
import toast from 'react-hot-toast'
import { OrderContext } from "../context/OrderContext";



function ItemSummary({ item }) {
  const [quantity, setQuantity] = useState(item.quantity);
   const {order, setOrder, increaseQuantity, decreaseQuantity } = useContext(OrderContext)
  



  const removeItem = (item)=>{
    const updatedOrder = order.filter((i) =>
        i.item.name !== item.name
    );
    toast.success('item removed successfully')
    if(updatedOrder.length === 0){
        localStorage.setItem("order", JSON.stringify(updatedOrder));
        setOrder(updatedOrder)
        return
    }
    setOrder(updatedOrder);
    localStorage.setItem("order", JSON.stringify(updatedOrder));

  }

  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <img
          src={item.item.image}
          alt={item.item.name}
          className={styles.image}
        />
      </div>
      <div className={styles.right}>
        <span className={styles.itemName}>{item.item.name}</span>
        <span>{`₹${item.item.price}`}</span>
        <div className={styles.quantity}>
          <button className={styles.quantityChange} disabled={quantity===1} onClick={()=>decreaseQuantity(item,quantity, setQuantity)}>
            -
          </button>
          <p className={styles.quantityNumber}>{` ${quantity} `}</p>
          <button className={styles.quantityChange} onClick={()=>increaseQuantity(item,quantity, setQuantity)}>
            +
          </button>
        </div>
      </div>
      <button className={styles.removeItem} onClick={()=>{
        removeItem(item.item)
      }}>X</button>
    </div>
  );
}

export default ItemSummary;
