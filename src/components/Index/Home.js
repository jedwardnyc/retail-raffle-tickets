import React from 'react';
import { connect } from 'react-redux';

function Home(props){
  const { authenticated } = props;
    return (
      <div>
         <h1> Welcome to the Ticket Central! </h1>
        {
          !authenticated ? 
          <h2> Please Log in to see more... </h2>
          :
          <h2> Here you will find a leaderboard for all adivsor's tickets and also some personal stats </h2>
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