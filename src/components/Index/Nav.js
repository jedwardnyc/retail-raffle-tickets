import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../store';

const Nav = (props) => {
  window.scrollTo(0,0);
  const { authenticated, logout } = props;
  return (
    <div id='nav'>
      { !authenticated ? 
        <div className='nav-grid'>
          <div className='nav-list'>
            <Link className='nav-link' to='/'> Home </Link>
          </div> 
          <div className='nav-login'>
            <Link to='/login'> Log in </Link>
          </div>
        </div>
          :
        <div className='nav-grid'>
          <div className='nav-list'>
            <Link className='nav-link' to='/leaderboard'> Leaderboard </Link>
            <Link className='nav-link' to='/advisors'> All Advisors </Link>
            <Link className='nav-link' to='/tickets'> All Tickets </Link>
            <Link className='nav-link' to='/winner'> Pick A Winner </Link>
          </div>
          <div className='nav-login'>
            <Link to='/' onClick={() => logout()}> Log out </Link>
          </div>
        </div>
      }
    </div>
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