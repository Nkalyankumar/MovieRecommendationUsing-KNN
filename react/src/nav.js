import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from './auth';
import './nav.css';

const Navbar = () => {
  const auth = useAuth();

  return (
    <div>
      <nav className='nav1'>
        {!auth.user && <NavLink to='/' className="nav-link">Home</NavLink>}
        {auth.user && <NavLink to='/mainpage' className="nav-link">MainPage</NavLink>}
        {!auth.user && <NavLink to="/login" className="nav-link">Login</NavLink>}
        {!auth.user && <NavLink to="/signup" className="nav-link">Signup</NavLink>}
        {auth.user && <NavLink to='/history' className="nav-link">History</NavLink>}
        {auth.user && <NavLink to='/profile' className="nav-link">Profile</NavLink>}
      </nav>
    </div>
  );
};

export default Navbar;
