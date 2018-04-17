import React, { Component } from 'react';
import { connect } from 'react-redux';
import TicketItem from './TicketItem';

const Tickets = (props) => {
  const { tickets, advisors } = props;
  return (
    <div>
      <h1> All Tickets </h1>
      <ul className='list-group'>
        {
          !tickets.length ?
          <h2> Whoops! Looks like no one has any tickets yet...</h2>
          :
          tickets.map(ticket => {
            const advisor = advisors.find(advisor => advisor.id === ticket.advisorId)
            return <TicketItem key={ticket.id} advisor={advisor} ticket={ticket} /> 
          } )
        }
      </ul>
    </div>
  )
};

const mapStateToProps = ({ tickets, advisors }) => {
  const sortedTickets = tickets.sort((a,b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getDay() - dateB.getDay();
  })

  return {
    tickets: sortedTickets, 
    advisors
  }
};

export default connect(mapStateToProps)(Tickets);