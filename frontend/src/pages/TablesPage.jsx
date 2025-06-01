import React, { useEffect, useState } from 'react'
import style from '../styles/pageStyles/TablesPage.module.css'
import Navbar from '../components/Navbar'
import { getAllTables } from '../libs/services'
import TableComponent from '../components/TableComponent.jsx'
import AddTable from '../components/AddTable.jsx'




function TablesPage() {
  const [searchText, setSearchText] = useState('')
  const[allTables, setAllTables] = useState([])
  const [tableData, setTabledata]=useState([])
 
  useEffect(()=>{
    const getTables = async () =>{
      const response = await getAllTables()
      if(response.status === 200){
        setAllTables(response.data.data)
        setTabledata(response.data.data)
      }
    }
    getTables()
    }, [])

  useEffect(()=>{
    const searched = allTables.filter((table) =>table.number.toString().includes(searchText.trim()))
    setTabledata(searched)
  },[searchText, allTables])


  return (
    <div className={style.main}>
      <Navbar>
        <div className={style.child}>
          <div className={style.blank}>B</div>
          <input type="text" className={style.searchInput} value={searchText} onChange={(e)=>setSearchText(e.target.value)} placeholder='Search' />
          
        </div>
      </Navbar>
      <div className={style.tablespage}>
        <p className={style.heading}>Tables</p><br />
        <div className={style.tables}>

        {
          tableData.length>0?(
            
            tableData.map((table,index)=>(
              <TableComponent key={index} table={table} setTabledata={setAllTables}/>
            ))
            
            
          ):(
            <p>No tables available</p>
          )
        }
        <AddTable AllTables={allTables} setTabledata={setAllTables}/>
        </div>
      </div>
    </div>
  )
}

export default TablesPage
