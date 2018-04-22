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

    const filteredTickets = filteredAdvisors.length ? filteredAdvisors.reduce((memo, advisor) => {
      tickets.forEach(ticket => {
        if(ticket.advisorId === advisor.id){
          memo.push(ticket)
        }
      })
      return memo
    }, []) : tickets;
    
    return (
      <div id='tickets'>
        <div className='tickets-title'>
          <div className='tickets-text'> All Tickets </div>
          <div className='tickets-filter'>
            <p className='filter-text'> Filter by Name: </p>
            <form className='filter-input'>
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
                placeholder='Advisor Name'/> 
            </form>
          </div>
        </div>
        <div className='tickets-list'>
          {
            !tickets.length ?
            <h2> Whoops! Looks like no one has any tickets yet...</h2>
            :
            filteredTickets.map(ticket => {
              const advisor = advisors.find(advisor => advisor.id === ticket.advisorId)
              return (
              <div key={ticket.id} className='tickets-line'>
                <TicketItem advisor={advisor} ticket={ticket} />
              </div>
              )
            })
          }
        </div>
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