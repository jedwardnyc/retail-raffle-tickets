import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdvisorItem from './AdvisorItem';

const Leaderboard = (props) => {
  const { advisors, tickets } = props;
  console.log(location.hash)
  return (
    <div id='leaderboard'>
      <div className='leaderboard-title'> { location.hash === '#/leaderboard' ? 'Leaderboard' : 'Welcome!' } </div>
      <hr />
      <div className='leaderboard-subtext'> { location.hash === '#/' ? 'See which advisor has the most tickets right now!' : null } </div>
      <div className='leaderboard-table'>
        <div className='leaderboard-line leaderboard-header'>
          <div className='leaderboard-name'> Name </div> 
          <div className='leaderboard-tickets'> Tickets </div>
        </div>
        {
          advisors.map(advisor => {
            const advisorTix = tickets.filter(ticket => ticket.advisorId === advisor.id)
            return (
              <div key={advisor.id} className='leaderboard-line'>
                <span className='leaderboard-number'> #{advisors.indexOf(advisor)+1} </span>
                <div className='leaderboard-name'> {advisor.name} </div> 
                <div className='leaderboard-tickets'> {advisorTix.length} </div>
              </div>
            )
          })
        }
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