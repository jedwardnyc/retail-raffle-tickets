import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const AdvisorItem = (props) => {
  const { advisor, tickets } = props;
  return (
    <div className='jumbotron list-group-item'>
        <Link to={`advisors/${advisor.id}`} >{advisor.name}</Link>:  { tickets.length } { tickets.length > 1 ?  'Tickets' :  'Ticket' }
      <ul>
        {
          advisor && tickets.length ? 
          tickets.map(ticket => {
            return <li key={ticket.id}> {ticket.reason} </li>
          })
          : `${advisor.name} has no tickets yet`
        }
      </ul>
      <button className='btn btn-sm btn-secondary'> Add Ticket </button> &nbsp;
      <button className='btn btn-sm btn-danger'> Clear Advisor </button>
    </div>
  )
};

const mapStateToProps = ({ tickets }, { advisor }) => {
  const filteredTickets = tickets.filter(ticket => ticket.advisorId === advisor.id)
  return {
    tickets: filteredTickets,
    advisor
  }
}

export default connect(mapStateToProps)(AdvisorItem);
