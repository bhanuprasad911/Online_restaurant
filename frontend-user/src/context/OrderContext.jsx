import { createContext, useState } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) =>{
    const [order, setOrder] = useState(() => {
      const storedOrder = localStorage.getItem('order');
      return storedOrder ? JSON.parse(storedOrder) : [];
    }); 

     const updateQuantity = (item,newQuantity) => {

    const updatedOrder = order.map((i) => {
      if (i.item.name === item.item.name) {
        return { ...i, quantity: newQuantity };
      }
      return i;
    });
    setOrder(updatedOrder);
    localStorage.setItem("order", JSON.stringify(updatedOrder));
  };

  const increaseQuantity = (item,quantity, setQuantity) => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(item,newQuantity);
  };

  const decreaseQuantity = (item, quantity, setQuantity) => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(item,newQuantity);
    } else {
      const updatedOrder = order.filter((i) => i.item.name !== item.item.name);
      setOrder(updatedOrder);
      localStorage.setItem("order", JSON.stringify(updatedOrder));
    }
  };


    return(
        <OrderContext.Provider value={{order, setOrder, increaseQuantity, decreaseQuantity, updateQuantity}}>
            {children}
        </OrderContext.Provider>
    )
}
