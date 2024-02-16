import React from 'react'
import Footer from './Footer'; 
import Nav from './Nav';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (

    <div className="App">
    <Nav/>
    <Outlet/>

    <Footer/>
    </div>
  )
}

export default Layout

