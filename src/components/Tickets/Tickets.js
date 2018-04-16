import React, { Component } from 'react';
import { connect } from 'react-redux';
import TicketItem from './TicketItem';

const Tickets = (props) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const { tickets } = props;
  console.log(tickets)
  return (
    <div>
      <h1> All Tickets </h1>
      <ul className='list-group'>
        {
          !tickets.length ?
          <h2> Whoops! Looks like no one has any tickets yet...</h2>
          :
          tickets.map(ticket => <TicketItem key={ticket.id} ticket={ticket} /> )
        }
      </ul>
    </div>
  )
};

const mapStateToProps = (state) => {

  const tickets = state.tickets.sort((a,b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getDay() - dateB.getDay();
  })

  return {
    tickets
  }
};

export default connect(mapStateToProps)(Tickets);