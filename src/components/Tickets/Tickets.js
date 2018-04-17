import React, { Component } from 'react';
import { connect } from 'react-redux';
import TicketItem from './TicketItem';

const Tickets = (props) => {
  const { tickets, advisors } = props;
  return (
    <div>
      <div className='row'>
        <h1 className='col'> All Tickets </h1>
        <form className='col form-inline justify-content-end'>
          <input className='form-control' placeholder='Search' /> &nbsp;
          <button className='btn btn-sm btn-secondary' disabled={true}> Search </button>
        </form>
      </div>
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