import React, { useContext, useEffect, useState } from "react";
import styles from "../Styles/ComponentStyles/FoodItem.module.css";
import { FaPlus } from "react-icons/fa6";
import toast from 'react-hot-toast'
import { OrderContext } from "../context/OrderContext";

function FoodItem({ item }) {
  const {order, setOrder, increaseQuantity, decreaseQuantity} = useContext(OrderContext)
  const [currentItem, setCurrentItem] = useState(null)
  const [quantity, setQuantity] = useState(0)


  useEffect(()=>{
      const current = order?.find((i) =>{
    return i.item.name===item.name
  })

    setCurrentItem(current||null)
    setQuantity(current?.quantity||null)


  

  },[order])

  const updateOrder = (item) => {
    let updatedOrder;
    if(order){

      
      const existing = order?.find((ord) => ord.item.name === item.name);
      
      if (existing) {
        const updatedProducts = order.map((ord) =>
          ord.item === item ? { ...ord, quantity: ord.quantity + 1 } : ord
      );
      updatedOrder = updatedProducts;
    } else {
      updatedOrder = [...order, { item: item, quantity: 1,}];
    }
  }

    setOrder(updatedOrder);
    localStorage.setItem("order", JSON.stringify(updatedOrder));
    toast.success('Item added succesfully')
  };

  return (
    <>
      <div className={styles.main}>
        <img
          src={item.image}
          alt={item.name}
          style={{
            height: "50%",
            width: "100%",
            borderRadius: "7px",
          }}
        />

        <div className={styles.info}>
          <p>{item.name}</p>
          <p>{`₹ ${item.price}`}</p>
          {
            !currentItem?(<button
            className={styles.addbutton}
            onClick={() => {
              updateOrder(item);
            }}
          >
            +
          </button>):(
           <div   className={styles.incrementDiv}>
            <button disabled={quantity===0} onClick={()=>{decreaseQuantity(currentItem,quantity,setQuantity)}}>-</button>
            <p>{quantity}</p>
            <button onClick={()=>{increaseQuantity(currentItem,quantity,setQuantity)}}>+</button>
           </div>
          )
          }
        </div>
      </div>
    </>
  );
}

export default FoodItem;
