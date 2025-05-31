import React, { useContext, useEffect, useState } from "react";
import styles from "../Styles/PageStyles/Order.module.css";
import { CiSearch } from "react-icons/ci";
import ItemSummary from "../Components/ItemSummary";
import { Link, useNavigate } from "react-router";
import SwipeButton from "../Components/SwipeButton";
import toast from "react-hot-toast";
import { FaLocationDot } from "react-icons/fa6";
import { MdTimer } from "react-icons/md";
import { OrderContext } from "../context/OrderContext";
import CookingInstructionsForm from "../Components/CookingInstructionsForm";
import UserDetailsForm from "../Components/UserDetailsForm";
import { addOrder, getTablels } from "../libs/services";
import { MdTableRestaurant } from "react-icons/md";

function OrderPage() {
  const navigate = useNavigate();

  const { order, setOrder } = useContext(OrderContext);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );
  const [deliveryTime, setDeliveryTIme] = useState(0);
  const [cookingInstructions, setCookingInstructions] = useState(
    localStorage.getItem("instructions" || "")
  );
  const [table, setTable] = useState({});
  const [instructionsForm, setInstructionsForm] = useState(false);
  const [showDefailsForm, setShowDetailsForm] = useState(false);
  const [type, setType] = useState("Dine In");
  const [itemTotal, setItemTotal] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const GrandTotal = type === "Take Away"?Math.round((itemTotal + taxes + deliveryCharges) * 100) / 100:Math.round((itemTotal + taxes ) * 100) / 100

  const confirmOrder = async () => {
  
    let items = [];
    let newObj = {};
    order.forEach((item) => {
      newObj = {
        item: item.item._id,
        quantity: item.quantity,
      };
      items.push(newObj);
    });
    const newOrder = {
      items: items,
      type: type,
      total: GrandTotal,
      ordered_By: currentUser?._id,
      originalPrepTime: deliveryTime,
      table_No: type==="Dine In"?table.number:-1,
    };
    try {
      const response = await addOrder(newOrder);
      console.log("Order response:", response);
      return response;
    } catch (error) {
      console.error("Error placing order:", error);
      throw error;
    }
  };
  
  const success = async () => {
      if (!currentUser) {
      toast.error("Please enter your details before confirming the order.");
      return;
    }
    toast("confirming order, please wait...");
    await confirmOrder();
    toast.success("Order Placed Successfully");

    setTimeout(() => {
      localStorage.setItem('order', JSON.stringify([]));
      setOrder([])
      localStorage.setItem("instructions", "");
      localStorage.removeItem("currentUser");
      navigate("/");
    }, 1000);
  };

  useEffect(() => {
    const getTable = async () => {
      const response = await getTablels();
      const available = response.data.data.filter(
        (item) => item.status === "unreserved"
      );
      console.log(available);
      setTable(available[0]);
      console.log(response);
    };

    const setPrices = (order) => {
      console.log(order);
      let total = 0;
      let taxe = 0;
      let delivery = 0;
      let deliveryTm = 0;
      order?.forEach((item) => {
        total += item.item.price * item.quantity;
        deliveryTm += item.item.prepTime * item.quantity;
      });
      taxe += (total / 100) * 5;
      delivery = order?.length * 5;
      total = Math.round(total * 100) / 100;
      taxe = Math.round(taxe * 100) / 100;
      delivery = Math.round(delivery * 100) / 100;
      setItemTotal(total);
      setTaxes(taxe);
      setDeliveryCharges(delivery);
      setDeliveryTIme(deliveryTm);
    };
    setPrices(order);
    getTable();
  }, [order]);

  return (
    <div className={styles.main}>
      <div className={styles.innerDiv}>

      <div className={styles.header}>
        <p className={styles.wish}>
          Good evening <br />
          <span className={styles.span}>place your order here</span>
        </p>
      </div>
      <br />
      <input type="text" className={styles.search} placeholder="Search" />
      <CiSearch className={styles.searchIcon}
        size={25}
        />
      <div className={styles.item}>
        {order?.length > 0 ? (
          order.map((item, index) => {
            return <ItemSummary key={index} item={item} />;
          })
        ) : (
          <p>
            No items available click <Link to={"/"}>Here</Link> to go to home
            and add some items
          </p>
        )}
      </div>
      <div className={styles.instructions}>
        {cookingInstructions?.length===0&& <p style={{
          width:'100%',
          textAlign:"left",
          color:"grey",
          fontSize:"small"
        }}>{`Add cookinng instructions(optional)`}</p>}
        <pre className={styles.text}>{cookingInstructions}</pre>
        <button
          onClick={() => setInstructionsForm(true)}
          className={styles.addInstructions}
          >
          Add
        </button>
      </div>
      {instructionsForm && (
        <CookingInstructionsForm
        setShowForm={setInstructionsForm}
        inst={cookingInstructions}
          setInst={setCookingInstructions}
          />
        )}

      <div className={styles.buttons}>
        <button
          className={`${styles.type} ${
            type === "Dine In" ? styles.select : ""
          }`}
          onClick={() => {
            setType("Dine In");
          }}
          >
          Dine In
        </button>
        <button
          className={`${styles.type} ${
            type === "Take Away" ? styles.select : ""
          }`}
          onClick={() => {
            setType("Take Away");
          }}
          >
          Take Away
        </button>
      </div>
      <div className={styles.price}>
        <div className={styles.innercost}>
          <span>Item Total</span>
          <span>{`₹${itemTotal}`}</span>
        </div>
        {
          type==="Take Away" && (<div className={styles.innercost}>
          <span>Delivery charges</span>
          <span>{`₹${deliveryCharges}`}</span>
        </div>)
        }
        <div className={styles.innercost}>
          <span>Taxes</span>
          <span>{`₹${taxes}`}</span>
        </div>
        <div className={styles.total}>
          <h4>Grand total</h4>
          <h4>{`₹${GrandTotal}`}</h4>
        </div>
      </div>
      <div className={styles.details}>
        <p className={styles.detailsHead}>Your details</p>
        {showDefailsForm || !currentUser ? (
          <button
          className={styles.addUser}
          onClick={() => setShowDetailsForm(true)}
          >
            Add your details here
          </button>
        ) : (
          <p
          className={styles.userdetails}
          >{`${currentUser?.name}, +91 ${currentUser?.number}`}</p>
        )}
      </div>
      {showDefailsForm && (
        <UserDetailsForm
        showForm={setShowDetailsForm}
        setuser={setCurrentUser}
        />
      )}
      <div className={styles.address}>
        {type === "Dine In" && currentUser ? (
          <div className={styles.tableNo}>
            <MdTableRestaurant size={20} />
            Table no: {table.number}
          </div>
        ) : type === "Take Away" && currentUser? (
          <>
            <div className={styles.flex}>
              <FaLocationDot color="green" />
              {currentUser?.address}
            </div>
            <div className={styles.flex}>
              <MdTimer color="green" />
              delivering in {deliveryTime} minutes
            </div>
          </>
        ) : (!currentUser && 
          <p>Add user details above to see more details about your order</p>
        )}
      </div>
      <SwipeButton onSuccess={success} />
        </div>
    </div>
  );
}

export default OrderPage;
