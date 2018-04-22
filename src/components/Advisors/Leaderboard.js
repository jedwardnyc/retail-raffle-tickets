import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import AdvisorItem from './AdvisorItem';
import Table from './LeaderboardTable';
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
      <h3 className='leaderboard-subtitle-root'> All Time </h3>
      <Table ext={'-root'} advisors={advisors} tickets={tickets} />
      <h3 className='leaderboard-subtitle'> Quarterly </h3>
      <Table time={'Quarter'} advisors={quarterlyAdvisors} tickets={quarterlyTickets} />
      <h3 className='leaderboard-subtitle'> Monthly </h3>
      <Table time={'Month'} advisors={monthlyAdvisors} tickets={monthlyTickets} />
      <h3 className='leaderboard-subtitle'> Weekly </h3>
      <Table time={'Week'} advisors={weeklyAdvisors} tickets={weeklyTickets} />
    </div>
  )
};

const mapStateToProps = ({ advisors, tickets }) => {

  const filterAdvisors = (memo, advisor, ticket) => {
    if(ticket.advisorId === advisor.id){
      !memo.includes(advisor) ? memo.push(advisor) : null
    };
  };

  const weeklyTickets = tickets.filter(ticket => {
    return (
      moment(ticket.date).week() === moment().week()
      && moment(ticket.date).year() === moment().year()
    );
  });

  const weeklyAdvisors = advisors.reduce((memo, advisor) => {
    weeklyTickets.map(ticket => {
      filterAdvisors(memo, advisor, ticket)
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
    monthlyTickets.map(ticket => {
      filterAdvisors(memo, advisor, ticket)
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
    quarterlyTickets.map(ticket => {
      filterAdvisors(memo, advisor, ticket)
    });
    return memo
  }, []);

  const rankedAdvisors = (advisors) => advisors.sort((a,b) => { 
    const aTickets = tickets.filter(ticket => ticket.advisorId === a.id*1)
    const bTickets = tickets.filter(ticket => ticket.advisorId === b.id*1)
    return bTickets.length - aTickets.length
  });

  return {
    advisors: rankedAdvisors(advisors),
    weeklyAdvisors: rankedAdvisors(weeklyAdvisors),
    monthlyAdvisors: rankedAdvisors(monthlyAdvisors),
    quarterlyAdvisors: rankedAdvisors(quarterlyAdvisors),
    tickets,
    weeklyTickets,
    monthlyTickets,
    quarterlyTickets
  }

};

export default connect(mapStateToProps)(Leaderboard);