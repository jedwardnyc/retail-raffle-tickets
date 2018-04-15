import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdvisorItem from './AdvisorItem';

const Advisors = (props) => {
  const { advisors } = props;

  return (
    <div>
      <h1> All Advisors </h1>
      <button className='btn btn-dark btn-sm'> Add Advisor </button>
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
};

const mapStateToProps = ({ advisors }) => {
  return {
    advisors
  }
};

export default connect(mapStateToProps)(Advisors);