import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdvisorItem from './AdvisorItem';
import { createAdvisor } from '../../store';

class Advisors extends Component {
  constructor(props){
    super(props);
    this.state = {
      editing: false,
      name: ''
    }
    this.create = this.create.bind(this);
  }

  create(ev){
    ev.preventDefault();
    console.log(this.state)
    this.props.createAdvisor(this.state);
    this.setState({ editing: false })
  }

  render(){
    const { advisors } = this.props;
    const { editing } = this.state;
    if (!advisors) return null
    return (
      <div>
        <div>
          <h1> All Advisors </h1>
          {
            !editing ? null :
            <form className='form-inline' onSubmit={this.create}>
              <input className='form-control' onChange={(ev) => this.setState({ name: ev.target.value })}/>&nbsp;
              <button className='btn btn-sm btn-secondary'> Add Advisor </button>
            </form>
          }
          <button 
            onClick={() => editing ? this.setState({ editing: false }) : this.setState({ editing: true })} 
            className={editing ? 'btn btn-danger btn-sm' : 'btn btn-secondary btn-sm' }> 
              { 
                !editing ? 'Add Advisor' : 'Cancel'
              }
          </button>
        </div>
        <br />
        <br />
        <ul className='list-group'>
          {
            !advisors.length ? 
            <h2> There are no Advisors, please add some! </h2>
            :
            advisors.map(advisor => {
              return (
                <AdvisorItem key={advisor.id} advisor={advisor}/>
              )
            })
          }
        </ul>
      </div>
    )
  }
};

const mapStateToProps = ({ advisors }) => {
  const sortedAdvisors = advisors.sort((a,b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1 )
  return {
    advisors: sortedAdvisors
  }
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    createAdvisor: (advisor) => dispatch(createAdvisor(advisor))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Advisors);