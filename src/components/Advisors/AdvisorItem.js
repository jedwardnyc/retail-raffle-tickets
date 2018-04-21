import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteAdvisor, deleteTicket } from '../../store';
import AdvisorForm from './AdvisorForm';
import TicketForm from '../Tickets/TicketForm';

class AdvisorItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      addTicket: false
    };
  };
  render() {
    const { advisor, tickets, deleteAdvisor, deleteTicket } = this.props;
    const { editing, addTicket } = this.state;
    return (
      <div className='advisor-item'>
        <div className='advisor-link'>
          <Link to={`advisors/${advisor.id}`} >{advisor.name}</Link>: { tickets.length } { tickets.length === 1 ?  'Ticket' :  'Tickets' }
        </div>
        <div className='list-group advisor-tickets'>
          {
            advisor && tickets.length ? 
            tickets.map(ticket => {
              return (
                <div key={ticket.id}>
                    {ticket.reason}&nbsp;
                    {
                      editing ? 
                      <span 
                        onClick={() => {
                          deleteTicket(ticket)
                          this.setState({ editing: false })
                        }}
                        className='badge badge-danger'> 
                        x 
                      </span>
                      : null
                    }
                </div>
              )
            })
            : `Looks like ${advisor.name.split(' ')[0]} has no tickets yet`
          }
        </div>
        <div className='advisor-form'>
          {
            addTicket ? <TicketForm advisor={advisor}/> : null
          }
          {
            editing ? <AdvisorForm advisor={advisor} editing={editing}/> : null
          }
        </div>
        <div className='advisor-buttons'>
          <button 
            disabled={ editing ? true : false }
            className={ addTicket ? 'btn btn-sm btn-danger' : 'btn btn-sm btn-dark' }
            onClick={() => addTicket ? this.setState({ addTicket: false }) : this.setState({ addTicket: true })}>
            { addTicket ? 'Cancel' : 'Add Ticket' }
          </button> &nbsp;
          <button 
            disabled={ addTicket ? true : false }
            className={ editing ? 'btn btn-sm btn-danger' : 'btn btn-sm btn-secondary' }
            onClick={() => editing ? this.setState({ editing: false }) : this.setState({ editing: true })}>
            { editing ? 'Cancel' : 'Edit Advisor' }
          </button> &nbsp;
          <button 
            disabled={ editing || addTicket ? true : false } 
            className={ 'btn btn-sm btn-danger' }
            onClick={() => deleteAdvisor(advisor)}> 
            Delete Advisor 
          </button>
        </div>
      </div>
    ) 
  }
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
    deleteAdvisor: (advisor) => dispatch(deleteAdvisor(advisor)),
    deleteTicket: (ticket) => dispatch(deleteTicket(ticket))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdvisorItem);
