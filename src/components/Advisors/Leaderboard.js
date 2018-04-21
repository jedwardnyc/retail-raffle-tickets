import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdvisorItem from './AdvisorItem';
import moment from 'moment';
import advisorReducer from '../../store/advisors';

const Leaderboard = (props) => {
  
  const { advisors, 
    tickets, 
    weeklyAdvisors,
    monthlyAdvisors, 
    quarterlyAdvisors, 
    weeklyTickets,
    monthlyTickets,
    quarterlyTickets } = props;
  
  return (
    <div id='leaderboard'>
      <div className='leaderboard-title'>
       { 
         location.hash === '#/leaderboard' ? 'Leaderboard' : 'Welcome!' 
        } 
      </div>
      <hr />
      <div className='leaderboard-subtext'> 
        { 
          location.hash === '#/' ? 'See which advisor has the most tickets right now!' : null 
        } 
      </div>
      <h3 className='leaderboard-subtitle-1'> All Time </h3>
      <div className='leaderboard-table-1'>
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
      <h3 className='leaderboard-subtitle-2'> Quarterly </h3>
      <div className='leaderboard-table-2'>
        <div className='leaderboard-line leaderboard-header'>
          <div className='leaderboard-name'> Name </div> 
          <div className='leaderboard-tickets'> Tickets </div>
        </div>
        {
          quarterlyAdvisors.map(advisor => {
            const advisorTix = quarterlyTickets.filter(ticket => ticket.advisorId === advisor.id)
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
      <h3 className='leaderboard-subtitle-2'> Monthly </h3>
      <div className='leaderboard-table-2'>
        <div className='leaderboard-line leaderboard-header'>
          <div className='leaderboard-name'> Name </div> 
          <div className='leaderboard-tickets'> Tickets </div>
        </div>
        {
          monthlyAdvisors.map(advisor => {
            const advisorTix = monthlyTickets.filter(ticket => ticket.advisorId === advisor.id)
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
      <h3 className='leaderboard-subtitle-3'> Weekly </h3>
      <div className='leaderboard-table-3'>
        <div className='leaderboard-line leaderboard-header'>
          <div className='leaderboard-name'> Name </div> 
          <div className='leaderboard-tickets'> Tickets </div>
        </div>
        {
          weeklyAdvisors.map(advisor => {
            const advisorTix = weeklyTickets.filter(ticket => ticket.advisorId === advisor.id)
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

  const weeklyTickets = tickets.filter(ticket => {
    return (
      moment(ticket.date).week() === moment().week()
      && moment(ticket.date).year() === moment().year()
    );
  });

  const weeklyAdvisors = advisors.reduce((memo, advisor) => {
    weeklyTickets.forEach(ticket => {
      if(ticket.advisorId === advisor.id){
        !memo.includes(advisor) ? memo.push(advisor) : null
      };
    });
    return memo
  }, []);

  const monthlyTickets = tickets.filter(ticket => {
    return (
      moment(ticket.date).month() === moment().month()
      && moment(ticket.date).year() === moment().year()
    );
  });

  const monthlyAdvisors = advisors.reduce((memo, advisor) => {
    monthlyTickets.forEach(ticket => {
      if(ticket.advisorId === advisor.id){
        !memo.includes(advisor) ? memo.push(advisor) : null
      };
    });
    return memo
  }, []);

  const quarterlyTickets = tickets.filter(ticket => {
    return ( 
      moment(ticket.date).quarter() === moment().quarter()
      && moment(ticket.date).year() === moment().year() 
    )
  });
  
  const quarterlyAdvisors = advisors.reduce((memo, advisor) => {
    quarterlyTickets.forEach(ticket => {
      if(ticket.advisorId === advisor.id){
        !memo.includes(advisor) ? memo.push(advisor) : null
      };
    });
    return memo
  }, []);

  const rankedAdvisors = (advisors) => advisors.sort((a,b) => { 
    const aTickets = tickets.filter(ticket => ticket.advisorId === a.id*1)
    const bTickets = tickets.filter(ticket => ticket.advisorId === b.id*1)
    return bTickets.length - aTickets.length
  });

  return {
    tickets,
    advisors: rankedAdvisors(advisors),
    weeklyAdvisors: rankedAdvisors(weeklyAdvisors),
    monthlyAdvisors: rankedAdvisors(monthlyAdvisors),
    quarterlyAdvisors: rankedAdvisors(quarterlyAdvisors),
    weeklyTickets,
    monthlyTickets,
    quarterlyTickets
  }

};

export default connect(mapStateToProps)(Leaderboard);