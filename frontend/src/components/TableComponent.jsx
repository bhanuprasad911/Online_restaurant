import React from 'react'
import Style from '../styles/componentStyles/TableComponent.module.css'
import { RiDeleteBin6Line } from "react-icons/ri";
import { LiaChairSolid } from "react-icons/lia";
import { deleteTable } from '../libs/services';
import toast from 'react-hot-toast'



function TableComponent({table, setTabledata}) {


  const deletetable=async(num)=>{
    const res = await deleteTable(num);
    if(res.status!=200){
      toast.error("Error deleting table")
      return
    }
    toast.success("Table deleted successfully")
    setTabledata(res.data.data)

  }
  return (
    <div className={Style.main}>
     <div className={Style.delete}>
      <button className={Style.deleteTable} onClick={()=>{
        deletetable(table.number)
      }}><RiDeleteBin6Line color='black' size={25}/></button>
     </div>
     <div className={Style.tableNumber}>
      <p className={Style.number}>Table</p>
      <p className={Style.number}>{table.number}</p>

     </div>
     <div className={Style.capacity}>
        <LiaChairSolid color='black' size={20}/>
        {table.capacity}
     </div>
      
    </div>
  )
}

export default TableComponent
