import { useState } from 'react'
import MySidebar from './pages/MySidebar.jsx'
import Company from './pages/CompanyPage.jsx'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <MySidebar />

      <main style={{ padding: 40, flex: 1 }}>
        <Routes>
          <Route path="/company-list" element={<Company />} />
        </Routes>
      </main>
    </div>
  );
}


export default App
