import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Index/Home';
import Nav from './Index/Nav';
import Login from './Index/Login';
import Advisors from './Advisors/Advisors';
import AdvisorForm from './Advisors/AdvisorForm';
import Advisor from './Advisors/Advisor';
import Winner from './Advisors/Winner';
import Tickets from './Tickets/Tickets';
import Leaderboard from './Advisors/Leaderboard';
import { fetchAdvisors, fetchTickets, keepLoggedIn } from '../store';
import noAuthNeeded from './Index/NoAuthNeeded';
import needAuth from './Index/AuthNeeded';


class App extends Component {

  componentWillMount(){
    this.props.fetchAdvisors();
    this.props.fetchTickets();
  }

  render(){
    const user = localStorage.getItem('user');
    if(user) this.props.keepLoggedIn();

    return (
      <div>
        <Router>
          <div>
            <Nav />
            <div className='container-fluid'>
              <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/advisors' exact component={needAuth(Advisors)} />
                <Route path='/advisors/:id' render={({ match }) => needAuth(<Advisor id={match.params.id} />)} />
                <Route path='/advisors/:id/edit' component={needAuth(AdvisorForm)} />  
                <Route path='/login' exact component={noAuthNeeded(Login)} />
                <Route path='/tickets' component={needAuth(Tickets)} />
                <Route path='/leaderboard' component={needAuth(Leaderboard)} />
                <Route path='/winner' component={Winner} />
              </Switch>
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
    fetchTickets: () => dispatch(fetchTickets()),
    keepLoggedIn: () => dispatch(keepLoggedIn()),
  };
};

export default connect(null, mapDispatchToProps)(App);