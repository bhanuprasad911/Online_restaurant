import React, { useState, useEffect, useMemo } from "react";
import Styles from "../styles/pageStyles/Analytics.module.css";
import Navbar from "../components/Navbar.jsx";
import Select from "react-select";
import { PiBowlFood } from "react-icons/pi";
import { FaRupeeSign } from "react-icons/fa";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { LuContact } from "react-icons/lu";
import OverallDetailsComponent from "../components/OverallDetailsComponent.jsx";
import {
  getAllTables,
  getChefs,
  getOrders,
  getUsers,
} from "../libs/services.js";
import {PieChart} from 'react-minimal-pie-chart'
import {Chart} from 'react-google-charts'

function Analytics() {
  const [filter, setFilter] = useState("");
  const [clients, setClients] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [chefs, setChefs] = useState([]);
  const [orders, setOrders] = useState([]);
  const [tables, setTables] = useState([]);
  const [orderFilter, setOrderFilter] = useState("daily");
  const [graphFilter, setGraphFilter] = useState("daily");

  const updateData = async () => {
    const userData = await getUsers();
    const chefData = await getChefs();
    const orderData = await getOrders();
    const tableData = await getAllTables();

    setChefs(chefData.data);
    setOrders(orderData.data.data);
    setTables(tableData.data.data);
    setClients(userData.data.data);

    let total = 0;
    orderData.data.data.forEach((order) => {
      total += order.total;
    });
    setTotalRevenue(parseFloat((total / 1000).toFixed(1)));
  };

  useEffect(() => {
    updateData();
    const interval = setInterval(() => {
      updateData();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const filterOrdersByRange = (range, orders) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let startDate;

    switch (range) {
      case "daily":
        startDate = new Date(today);
        break;
      case "weekly":
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 6);
        break;
      case "monthly":
        startDate = new Date(today);
        startDate.setMonth(today.getMonth() - 1);
        break;
      case "yearly":
        startDate = new Date(today);
        startDate.setFullYear(today.getFullYear() - 1);
        break;
      default:
        return [];
    }

    return orders.filter((order) => {
      const created = new Date(order.createdAt);
      return created >= startDate && created <= now;
    });
  };

  const filteredOrders = useMemo(() => filterOrdersByRange(orderFilter, orders), [orderFilter, orders]);

  const total = filteredOrders.length;
  const servedCount = filteredOrders.filter(
    (order) => order.status?.trim().toLowerCase() !== "not picked up"
  ).length;
  const dineInCount = filteredOrders.filter((order) => order.type === "Dine In").length;
  const takeAwayCount = filteredOrders.filter((order) => order.type === "Take Away").length;

  const orderSummaryOptions = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
  ];

  const options = [
    { value: "Order Summary", label: "Order Summary" },
    { value: "Revenue", label: "Revenue" },
    { value: "Table", label: "Tables" },
  ];

  const customStyles = {
    container: (base) => ({ ...base, width: "50%" }),
    control: (base) => ({
      ...base,
      height: "8vh",
      minHeight: "8vh",
      borderRadius: "50px",
      boxShadow: "none",
      borderColor: "#ccc",
      width: "60%",
    }),
    valueContainer: (base) => ({ ...base, height: "8vh", padding: "0 20px" }),
    singleValue: (base) => ({ ...base, fontSize: "1.5rem", fontWeight: "500" }),
    indicatorsContainer: (base) => ({ ...base, height: "8vh" }),
    indicatorSeparator: () => ({ display: "none" }),
    input: (base) => ({ ...base, margin: 0, padding: 0 }),
    menu: (base) => ({ ...base, width: "60%" }),
  };

  const customStylesOrder = {
    ...customStyles,
    control: (base) => ({
      ...base,
      height: "5vh",
      minHeight: "5vh",
      borderRadius: "50px",
      boxShadow: "none",
      borderColor: "#ccc",
      width: "60%",
    }),
    valueContainer: (base) => ({ ...base, height: "5vh", padding: "0 20px" }),
    singleValue: (base) => ({ ...base, fontSize: "1rem", fontWeight: "500" }),
    indicatorsContainer: (base) => ({ ...base, height: "5vh" }),
  };
const data = [
                ["Type", "count"],
                [`Served ${servedCount}%`, servedCount],
                ["Dine In", dineInCount],
                ["Take Away", takeAwayCount] 

              ]

  const Pieoptions = {
    title:"Order summary",
    pieHole:0.6,
    is3D:false,
    backgroundColor:"transparent",
    colors:['rgb(189, 189, 189)', 'rgb(91,91,91)', 'rgb(44,44,44)'],
    pieSliceText: "none",
    tooltip: { trigger: "focus" }, 
  }
  return (
    <div className={Styles.main}>
      <Navbar>
        <Select
          options={options}
          styles={customStyles}
          placeholder="Filter..."
          value={filter}
          onChange={setFilter}
        />
      </Navbar>
      <div className={Styles.container}>
        <h1>Analytics</h1>
        <br />
        <div className={Styles.overall}>
          <OverallDetailsComponent value={chefs.length} tag={"Total chefs"} imag={PiBowlFood} />
          <OverallDetailsComponent value={`${totalRevenue}K`} tag={"Total Revenue"} imag={FaRupeeSign} />
          <OverallDetailsComponent value={orders.length} tag={"Total orders"} imag={LuContact} />
          <OverallDetailsComponent value={clients.length} tag={"Total clients"} imag={LiaUserFriendsSolid} />
        </div>

        <div className={Styles.graphs}>
          <div className={Styles.pie}>
            <div className={Styles.divHead}>
              <div className={Styles.orderhead}>
                <p className={Styles.orderP}>Order Summary</p>
                <p className={Styles.orderTagP}>iyawhhbfvadyfvcyahcaougdaiuyfvhcauybcl</p>
              </div>
              <Select
                options={orderSummaryOptions}
                styles={customStylesOrder}
                value={orderSummaryOptions.find((opt) => opt.value === orderFilter)}
                onChange={(selected) => setOrderFilter(selected.value)}
              />
            </div>
            <div className={Styles.summary}>
              <div className={Styles.innerSummary}>
                <h1>{servedCount}</h1>
                <p>served</p>
              </div>
              <div className={Styles.innerSummary}>
                <h1>{dineInCount}</h1>
                <p>Dine in</p>
              </div>
              <div className={Styles.innerSummary}>
                <h1>{takeAwayCount}</h1>
                <p>Take Away</p>
              </div>
            </div>
            <div className={Styles.pie}>
              

              <Chart chartType="PieChart" options={Pieoptions} data={data} width={'100%'} height={'100%'} />
            </div>
          </div>
 
          <div className={Styles.graph}>
            <div className={Styles.divHead}>
              <div className={Styles.orderhead}>
                <p className={Styles.orderP}>Revenue</p>
                <p className={Styles.orderTagP}>iyawhhbfvadyfvcyahcaougdaiuyfvhcauybcl</p>
              </div>
              <Select
                options={orderSummaryOptions}
                styles={customStylesOrder}
                value={graphFilter}
                onChange={setGraphFilter}
              />
            </div>
          </div>

          <div className={Styles.tableInfo}>
            <div className={Styles.tabledivHead}>
              <h2>Tables</h2>
              <div className={Styles.statusDiv}>
                <div className={Styles.reserved}>
                  <div className={Styles.green}>B</div>
                  <p>Reserved</p>
                </div>
                <div className={Styles.reserved}>
                  <div className={Styles.white}>B</div>
                  <p>Unreserved</p>
                </div>
              </div>
            </div>
            <div className={Styles.tablesBody}>
              {tables.map((table, index) => (
                <div
                  key={index}
                  className={`${Styles.eachTable} ${
                    table.status === "reserved" ? Styles.tableReserved : ""
                  }`}
                >
                  <p>Table</p>
                  <p>{table.number}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={Styles.chefs}>
          <table className={Styles.table}>
            <thead className={Styles.tableHead}>
              <tr>
                <th>Chef</th>
                <th>Orders Taken</th>
              </tr>
            </thead>
            <tbody className={Styles.tableBody}>
              {chefs.map((chef, index) => (
                <tr key={index}>
                  <td>{chef.name}</td>
                  <td>{chef.ordersTaken}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
