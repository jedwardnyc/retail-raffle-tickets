import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AdvisorItem from './AdvisorItem';

const Advisor = (props) => {
  return <AdvisorItem advisor={props.advisor}/>
};

const mapStateToProps = ({ advisors }, { id }) => {
  const advisor = advisors.find(advisor => advisor.id === id*1)
  return {
    advisor
  }
};

export default connect(mapStateToProps)(Advisor);