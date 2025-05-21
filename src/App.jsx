<<<<<<< HEAD
import { useState } from 'react'
import MySidebar from './pages/MySidebar.jsx'
import Company from './pages/CompanyPage.jsx'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
=======

import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import RootLayout from './layout/RootLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ActiveLicenses from './pages/ActiveLicenses.jsx'
import Compony from './pages/Compony.jsx'
import ExpiredLisenses from './pages/ExpiredLisenses.jsx'
import Licences from './pages/Licences.jsx'
import PendingLisence from './pages/PendingLisence.jsx'
import Product from './pages/Product.jsx'
import Pagenotfound from './pages/Pagenotfound.jsx'
import Login from './pages/Login.jsx'
>>>>>>> origin/route

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements( 
      <>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<RootLayout/>}>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='activelicense'element={<ActiveLicenses/>}/>
        <Route path='compony' element={<Compony/>}/>
        <Route path='expiredlicense' element={<ExpiredLisenses/>}/>
        <Route path='licenses' element={<Licences/>}/>
        <Route path='pendinglicense' element={<PendingLisence/>}/>
        <Route path='Product' element={<Product/>}/>
      </Route>
        <Route path='*' element={<Pagenotfound/>}/>
      </>
    )
  )

  return (
<<<<<<< HEAD
    <div style={{ display: 'flex', height: '100vh' }}>
      <MySidebar />

      <main style={{ padding: 40, flex: 1 }}>
        <Routes>
          <Route path="/company-list" element={<Company />} />
        </Routes>
      </main>
    </div>
  );
=======
    <>
     <RouterProvider router={router}/>
    </>
  )
>>>>>>> origin/route
}


export default App
