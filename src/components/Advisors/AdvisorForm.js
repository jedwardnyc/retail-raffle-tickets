import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createAdvisor } from '../../store';

class AdvisorForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: ''
    }
    this.create = this.create.bind(this);
  }

  create(ev){
    ev.preventDefault();
    this.props.createAdvisor(this.state);
  }

  render(){
    return (
      <form onSubmit={this.create}>
        <input onChange={(ev) => this.setState({ name: ev.target.value })}/>
        <button> Add Advisor </button>
      </form>
    )
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    createAdvisor: (advisor) => dispatch(createAdvisor(advisor))
  }
}

export default connect(null, mapDispatchToProps)(AdvisorForm);