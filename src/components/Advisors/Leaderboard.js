import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdvisorItem from './AdvisorItem';

const Leaderboard = (props) => {
  const { advisors } = props;
  return (
    <div>
      <h1> Leaderboard </h1>
      <h3> See which advisor has the most tickets right now! </h3>
      <div>
        <ul className='list-group'>
          {
            advisors.map(advisor => {
              return (
                <li key={advisor.id} className='list-group-item'>{advisors.indexOf(advisor)+1}. {advisor.name}: {advisor.tickets.length} </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
};

const mapStateToProps = (state) => {
  const advisors = state.advisors.sort((a,b) => b.tickets.length - a.tickets.length)
  return {
    advisors
  }
};

export default connect(mapStateToProps)(Leaderboard);