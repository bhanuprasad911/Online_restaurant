import React, { useState } from "react";
import Style from "../styles/componentStyles/AddTable.module.css";
import { addTable } from "../libs/services";
import toast from "react-hot-toast";

function AddTable({ AllTables, setTabledata }) {
  const [showForm, setShowForm] = useState(false);
  const [capacity, setCapacity] = useState(1);
  const [name, setName] = useState("");

  const handleAddTable = async () => {
    const newTableData = {
      number: AllTables.length+1,
      name: name.trim(), // optional field
      capacity,
      status: "unreserved",
    };
    const res = await addTable(newTableData);
    if (res.status === 201) {
        setName("");
        setCapacity(1);
        setTabledata(res.data.data)
        toast.success('Tablee added successfully')
        }
    else{
        toast.error('failed to add table')
    }
    setShowForm(false)

  };

  return (
    <div className={Style.main}>
      <button
        className={Style.showForm}
        onClick={() => setShowForm(!showForm)}
      >
        +
      </button>

      {showForm && (
        <div className={Style.form}>
          <input
            type="text"
            placeholder="Table name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={Style.nameinput}
          />

          <p className={Style.number}>{AllTables.length+1}</p>
        <div className={Style.select}>

          <label htmlFor="capacitySelect">Chairs</label>
          <select
            id="capacitySelect"
            value={capacity}
            onChange={(e) => setCapacity(parseInt(e.target.value))}
            >
            {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
            </div>

          <button className={Style.addtable} onClick={handleAddTable}>
            Create
          </button>
        </div>
      )}
    </div>
  );
}

export default AddTable;
