
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
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App
