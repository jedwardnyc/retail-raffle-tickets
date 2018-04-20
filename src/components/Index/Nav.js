import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../store';

const Nav = (props) => {
  const { authenticated, logout } = props;
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
            <NavLink className='nav-link' to='/leaderboard'> Leaderboard </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/advisors' exact> All Advisors </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/tickets'> All Tickets </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/' exact onClick={() => logout()}> Log out </NavLink>
          </li>
        </ul>
        
      }
    </nav>
  )
};

const mapStateToProps = ({ auth }) => {
  return {
    authenticated: auth.authenticated,
  }
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    logout: () => dispatch(logout()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);