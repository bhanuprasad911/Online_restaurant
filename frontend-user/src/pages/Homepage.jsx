import React, { useContext } from "react";
import styles from "../Styles/PageStyles/Home.module.css";

import FoodFilter from "../Components/FoodFilter";
import { CiSearch } from "react-icons/ci";
import FoodItem from "../Components/FoodItem";
import { useState } from "react";
import { useEffect } from "react";
import { getAllItems } from "../libs/services";
import { Link} from "react-router";
import { OrderContext } from "../context/OrderContext";




function Homepage() {
  const filters = ["Burger", "Pizza", "Drink", "French fries", "Veggies"];
  const [allFoodItems, setAllFoodItems] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const {order, setOrder} = useContext(OrderContext)
const [totalItems, setTotalItems]=useState(0)






  useEffect(() => {
    const fetchFoodItems = async () => {
      const response = await getAllItems();
      if (response.status === 200) {
        setAllFoodItems(response.data);
        setFoodItems(response.data);
        setIsLoading(false)

      }
    };
    fetchFoodItems();
  }, []);

  useEffect(() => {
  if (search.trim() === "" && (filter.trim() === "" || filter.trim() === "All")) {
    setFoodItems(allFoodItems);
  } else if (filter.trim() !== "" && filter.trim() !== "All" && search.trim() === "") {
    const filteredFoodItems = allFoodItems.filter(
      (item) => item.category.toLowerCase() === filter.toLowerCase()
    );
    setFoodItems(filteredFoodItems);
  } else if ((filter.trim() === "" || filter.trim() === "All") && search.trim() !== "") {
    const searched = allFoodItems.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFoodItems(searched);
  } else {
    const filteredFoodItems = allFoodItems.filter(
      (item) => item.category.toLowerCase() === filter.toLowerCase()
    );
    const searched = filteredFoodItems.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFoodItems(searched);
  }
}, [filter, allFoodItems, search]);


  useEffect(() => {
  const itemsCount = (orders) => {
    const count = orders?.reduce((acc, ord) => acc + ord.quantity, 0);
    setTotalItems(count);
  };

  itemsCount(order);
}, [order]);


  // if (isLoading){
  //   return <div>Loading...!</div>
  // }

  return (
    <div className={styles.main}>
      <div className={styles.innerdiv}>
      <div className={styles.header}>

      <p className={styles.wish}>
        Good evening <br />{" "}
        <span className={styles.span}>place your order here</span>
      </p>
      </div>
<br />
      <input type="text" className={styles.search} placeholder="Search" value={search} onChange={(e)=>{
        setSearch(e.target.value)
      }}/>
      <CiSearch className={styles.searchIcon}
        
        size={25}
      />
      <div className={styles.filters}>
        {isLoading&&<div> Loading...</div>}
        {filters.map((filte, index) => {
          return (
            <button
              key={index}
              className={styles.filterbutton}
              onClick={() => {
                setFilter(filte);
              }}
            >
              <FoodFilter name={filte} selected={filte === filter} />
            </button>
          );
        })}
      </div>

      {filter.length > 0 && <p style={{
        textAlign:'left',
        width:'100%',
        margin:'2%',
        marginLeft:'7%',
        fontSize:'medium'
      }}>{filter}</p>}
      <div className={styles.items}>
        {foodItems.map((item, index) => {
          return (
            <FoodItem
              key={index}
              item={item}
            />
          );
        })}
      </div>
      {
        order?.length>0 &&(
          <div className={styles.next}>
            <p>{`${order.length>1?"items":"item"} | ${totalItems}`}</p>
            <button className={styles.nextButton}><Link className={styles.link} to={'/order'}>Next</Link></button>
          </div>
        )
      }
      </div>
    </div>
  );
}

export default Homepage;
