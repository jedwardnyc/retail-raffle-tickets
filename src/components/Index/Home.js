import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Leaderboard from '../Advisors/Leaderboard';

function Home(props){
  const { authenticated } = props;
    return (
      <div id='home'>
        {
          !authenticated ? 
          <div className='home-text'>
            <Leaderboard />
            <p className='home-subtext'> 
              If you want to see more, you're going to have to &nbsp; 
              <Link to='/login'>log in</Link>...
            </p>
          </div>
          :
          null
        }
      </div>
    )
  };

  const mapStateToProps = ({ auth }) => {
    return {
      authenticated: auth.authenticated
    }
  };

  export default connect(mapStateToProps)(Home)