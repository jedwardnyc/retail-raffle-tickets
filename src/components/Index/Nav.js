import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = (props) => {
  const { authenticated } = props;
  console.log(props)
  return (
    <nav style={{marginBottom: '15px' }} className='navbar navbar-expand navbar-light'>
      { !authenticated ? 
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/' exact> Home </NavLink>
          </li> 
          <li className='nav-item'>
            <NavLink className='nav-link' to='/login'> Log in </NavLink>
          </li>
        </ul>
          :
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/' exact> Home </NavLink>
          </li> 
          <li className='nav-item'>
            <NavLink className='nav-link' to='/leaderboard'> Leaderboard </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/advisors' exact> All Advisors </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/tickets'> All Tickets </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/logout'> Log out </NavLink>
          </li>
        </ul>
      }
    </nav>
  )
};

const mapStateToProps = ({ auth }) => {
  return {
    authenticated: auth.authenticated
  }
};

// export default Nav
export default connect(mapStateToProps)(Nav);