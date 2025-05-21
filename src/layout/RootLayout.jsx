import React from 'react'
import MySidebar from '../components/MySidebar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div style={{ display:'flex' }}><MySidebar />
         <Outlet/>
    </div>
  )
}

export default RootLayout