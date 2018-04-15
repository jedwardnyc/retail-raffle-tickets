import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Index/Home';
import Nav from './Index/Nav';
import Login from './Index/Login';
import Advisors from './Advisors/Advisors';
import Tickets from './Tickets/Tickets';
import Leaderboard from './Advisors/Leaderboard';
import { fetchAdvisors, fetchTickets } from '../store';

class App extends Component {

  componentWillMount(){
    this.props.fetchAdvisors();
    this.props.fetchTickets();
  }

  render(){
    return (
      <div>
        <Router>
          <div>
            <Nav />
            <div className='container'>
              <Route path='/' exact component={Home} />
              <Route path='/advisors' component={Advisors} /> 
              <Route path='/login' exact component={Login} />
              <Route path='/tickets' component={Tickets} />
              <Route path='/leaderboard' component={Leaderboard} />
            </div>
          </div>
        </Router>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAdvisors: () => dispatch(fetchAdvisors()),
    fetchTickets: () => dispatch(fetchTickets())
  };
};

export default connect(null, mapDispatchToProps)(App);