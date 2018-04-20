import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTicket } from '../../store';

class TicketForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      reason:'',
      advisorId: this.props.advisor.id || ''
    }
    this.create = this.create.bind(this);
  }

  create(ev){
    this.setState({ date: Date.now() })
    this.props.createTicket(this.state);
    this.setState({ reason: '' })
  };

  render(){
    return (
      <div>
        <form className='form-inline' onSubmit={this.create}>
          <input 
            className='form-control form-control-sm' 
            value={this.state.reason} 
            onChange={(ev) => this.setState({ reason: ev.target.value })}/> &nbsp;
          <button className='btn btn-sm btn-secondary'> Add Ticket </button>
        </form>
      </div>
    )
  };
};

const mapStateToProps = ({}, { advisor }) => {
  return {
    advisor
  }
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    createTicket: (ticket) => dispatch(createTicket(ticket))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketForm);