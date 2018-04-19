import React, { Component } from 'react';
import { connect } from 'react-redux';
import TicketItem from './TicketItem';

class Tickets extends Component {
  constructor(){
    super();
    this.state = {
      filteredAdvisors: []
    }
  }
  render(){
    const { tickets, advisors } = this.props;
    const { filteredAdvisors } = this.state;
    const filteredTickets = tickets;
    // const filteredTickets = filteredAdvisors ? tickets.reduce() : tickets;
    return (
      <div>
        <div className='row'>
          <h1 className='col'> All Tickets </h1>
          <form className='col form-inline justify-content-end'>
            <input 
              onChange={(ev) => {
                let filteredAdvisors = advisors.filter(advisor => {
                  return (
                    advisor.name
                    .toLowerCase()
                    .includes(ev.target.value.toLowerCase())
                  )
                })
                this.setState({ filteredAdvisors: filteredAdvisors ? filteredAdvisors : [] })
              }}
              className='form-control' 
              name='search' 
              type='search' 
              placeholder='Search'/> 
              &nbsp;
             Filter
          </form>
        </div>
        <ul className='list-group'>
          {
            !tickets.length ?
            <h2> Whoops! Looks like no one has any tickets yet...</h2>
            :
            filteredTickets.map(ticket => {
              const advisor = advisors.find(advisor => advisor.id === ticket.advisorId)
              return <TicketItem key={ticket.id} advisor={advisor} ticket={ticket} /> 
            } )
          }
        </ul>
      </div>
    )
  }
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