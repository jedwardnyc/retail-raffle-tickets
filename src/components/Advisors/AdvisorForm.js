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
      <div>
        <form className='form-control' onSubmit={this.create}>
          <input onChange={(ev) => this.setState({ name: ev.target.value })}/>
          <button className='btn btn-sm btn-success'> Add Advisor </button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    createAdvisor: (advisor) => dispatch(createAdvisor(advisor))
  }
}

export default connect(null, mapDispatchToProps)(AdvisorForm);