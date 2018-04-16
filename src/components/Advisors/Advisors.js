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
    this.props.createAdvisor(this.state);
    this.setState({ editing: false });
  }

  render(){
    const { advisors } = this.props;
    const { editing } = this.state;
    if (!advisors) return null
    return (
      <div>
        <h1> All Advisors </h1>
        {
          !editing ? null :
          <form onSubmit={this.create}>
            <input onChange={(ev) => this.setState({ name: ev.target.value })}/>
            <button> Add Advisor </button>
          </form>
        }
        <button 
          onClick={() => editing ? this.setState({ editing: false }) : this.setState({ editing: true })} 
          className='btn btn-dark btn-sm'> 
            { 
              !editing ? 'Add Advisor' : 'Cancel'
            }
        </button>
        <br />
        <br />
        <ul className='list-group'>
          {
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