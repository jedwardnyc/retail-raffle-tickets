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
      <div className='jumbotron advisorItem'>
        <Link className='advisorLink' to={`advisors/${advisor.id}`} >{advisor.name}</Link> 
        <h3>{ tickets.length } { tickets.length === 1 ?  'Ticket' :  'Tickets' }</h3>
        <ul className='list-group'>
          {
            advisor && tickets.length ? 
            tickets.map(ticket => {
              return (
                <div key={ticket.id}>
                  <li> 
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
                  </li> 
                </div>
              )
            })
            : `Looks like ${advisor.name.split(' ')[0]} has no tickets yet`
          }
        </ul>
        <br />
          {
            addTicket ? <TicketForm advisor={advisor}/> : null
          }
          {
            editing ? <AdvisorForm advisor={advisor} editing={editing}/> : null
          }
        <button 
          disabled={ editing ? true : false }
          className={ addTicket ? 'btn btn-sm btn-danger' : 'btn btn-sm btn-secondary' }
          onClick={() => addTicket ? this.setState({ addTicket: false }) : this.setState({ addTicket: true })}>
          { addTicket ? 'Cancel' : 'Add Ticket' }
        </button> &nbsp;
        <button 
          disabled={ addTicket ? true : false }
          className={ editing ? 'btn btn-sm btn-danger' : 'btn btn-sm btn-success' }
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
