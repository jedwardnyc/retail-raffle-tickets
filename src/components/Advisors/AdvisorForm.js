import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createAdvisor, updateAdvisor } from '../../store';

class AdvisorForm extends Component {
  constructor(props){
    super(props);
    this.state = Object.assign({}, this.props.advisor)
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }

  create(ev){
    ev.preventDefault();
    this.props.createAdvisor(this.state);
  }

  update(ev){
    ev.preventDefault();
    this.props.updateAdvisor(this.state);
  }

  render(){
    console.log(this.props)
    const { editing } = this.props;
    return (
      <div>
        <form className='form-control' onSubmit={ editing ? this.update : this.create }>
          <input 
            value={ this.state.name }
            onChange={(ev) => this.setState({ name: ev.target.value })}
          />
          <button className='btn btn-sm btn-secondary'> { editing ? 'Edit Advisor' : 'Add Advisor' }</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    createAdvisor: (advisor) => dispatch(createAdvisor(advisor)),
    updateAdvisor: (advisor) => dispatch(updateAdvisor(advisor))
  }
}

export default connect(null, mapDispatchToProps)(AdvisorForm);