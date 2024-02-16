import React from 'react'
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className='Nav'>



            <ul className='navitems' >
                <li><Link to="/">Home</Link></li>
                <li><Link to="/addpost">Post</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>

    </div>
              

  )
}

export default Nav