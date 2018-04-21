import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../store';

const Nav = (props) => {
  window.scrollTo(0,0);
  const { authenticated, logout } = props;
  return (
    <nav className='navbar navbar-expand navbar-light navGrid'>
      { !authenticated ? 
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <Link className='nav-link' to='/'> Home </Link>
          </li> 
          <li className='nav-item loginNav'>
            <Link className='nav-link loginNav' to='/login'> Log in </Link>
          </li>
        </ul>
          :
        <ul className='navbar-nav navGrid'>
          <li className='nav-item'>
            <Link className='nav-link' to='/leaderboard'> Leaderboard </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/advisors'> All Advisors </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/tickets'> All Tickets </Link>
          </li>
          <li className='nav-item loginNav'>
            <Link className='nav-link' to='/' onClick={() => logout()}> Log out </Link>
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