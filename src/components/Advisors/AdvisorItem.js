import React from 'react';
import { Link } from 'react-router-dom';

const AdvisorItem = (props) => {
  const { advisor } = props;
  return (
    <div className='jumbotron list-group-item'>
      <Link to={`advisors/${advisor.id}`} >{advisor.name}</Link>: { advisor.tickets.length } { advisor.tickets.length > 1 ?  'Tickets' :  'Ticket' }
      <ul>
        {
          advisor.tickets ? 
          advisor.tickets.map(ticket => {
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

export default AdvisorItem;
