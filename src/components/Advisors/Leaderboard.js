import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdvisorItem from './AdvisorItem';

const Leaderboard = (props) => {
  const { advisors, tickets } = props;
  return (
    <div>
      <h1> Leaderboard </h1>
      <h3> See which advisor has the most tickets right now! </h3>
      <div>
        <ul className='list-group'>
          {
            advisors.map(advisor => {
              const advisorTix = tickets.filter(ticket => ticket.advisorId === advisor.id)
              return (
                <li key={advisor.id} className='list-group-item'>{advisors.indexOf(advisor)+1}. {advisor.name}: {advisorTix.length} </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
};

const mapStateToProps = ({ advisors, tickets }) => {
  const rankedAdvisors = advisors.sort((a,b) => { 
    const aTickets = tickets.filter(ticket => ticket.advisorId === a.id*1)
    const bTickets = tickets.filter(ticket => ticket.advisorId === b.id*1)
    return bTickets.length - aTickets.length
  });
  return {
    tickets,
    advisors: rankedAdvisors
  }
};

export default connect(mapStateToProps)(Leaderboard);