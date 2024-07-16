import React from 'react'
import Footer from './components/Footer';
import Nav from './components/Nav';
import { Outlet } from 'react-router-dom';

const Layout = ({UserName,setUserName}) => {
  return (

    <div className="App">
    <Nav UserName={UserName} setUserName={setUserName}/>
    <Outlet/>

    {/* <Footer/> */}
    </div>
  )
}

export default Layout

