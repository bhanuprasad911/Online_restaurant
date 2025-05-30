import React from 'react'
import TablesPage from './TablesPage.jsx'
import style from '../styles/pageStyles/App.module.css'
import Sidebar from '../components/Sidebar.jsx'
import { Route, Routes } from 'react-router'
import { Toaster } from 'react-hot-toast'
import Analytics from './Analytics.jsx'
import OrderLine from './OrderLine.jsx'






function App() {
  return (
    <div className={style.main}>
      <Toaster />
      <Sidebar />
      <Routes>
        <Route path='/' element={<Analytics />} />
        <Route path='/tables' element={<TablesPage/>}/>
        <Route path='/orders' element={<OrderLine />}/>
      </Routes>

      
    </div>
  )
}

export default App
