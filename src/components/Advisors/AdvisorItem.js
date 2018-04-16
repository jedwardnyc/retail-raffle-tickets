import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteAdvisor } from '../../store';

const AdvisorItem = (props) => {
  const { advisor, tickets, deleteAdvisor } = props;
  return (
    <div className='jumbotron list-group-item'>
        <Link to={`advisors/${advisor.id}`} >{advisor.name}</Link>:  { tickets.length } { tickets.length === 1 ?  'Ticket' :  'Tickets' }
      <ul>
        {
          advisor && tickets.length ? 
          tickets.map(ticket => {
            return <li key={ticket.id}> {ticket.reason} </li>
          })
          : `Looks like ${advisor.name.split(' ')[0]} has no tickets yet`
        }
      </ul>
      <button className='btn btn-sm btn-secondary'> Add Ticket </button> &nbsp;
      <button onClick={() => deleteAdvisor(advisor)} className='btn btn-sm btn-danger'> Delete Advisor </button>
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

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAdvisor: (advisor) => dispatch(deleteAdvisor(advisor))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdvisorItem);
