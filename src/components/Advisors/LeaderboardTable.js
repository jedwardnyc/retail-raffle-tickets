import React from 'react';

const LeaderboardTable = (props) => {
  const { advisors, tickets, ext, time } = props;
  return (
    <div className={`leaderboard-table${ext ? ext : ''}`}>
      <div className='leaderboard-line leaderboard-header'>
        <div className='leaderboard-name'> Name </div> 
        <div className='leaderboard-tickets'> Tickets </div>
      </div>
      {
        advisors.length ?
        advisors.map(advisor => {
          const advisorTix = tickets.filter(ticket => ticket.advisorId === advisor.id);
          return (
            <div key={advisor.id} className='leaderboard-line'>
              <span className='leaderboard-number'> #{advisors.indexOf(advisor)+1} </span>
              <div className='leaderboard-name'> {advisor.name} </div> 
              <div className='leaderboard-tickets'> {advisorTix.length} </div>
            </div>
          )  
        })
        :
        <div className='leaderboard-line'>
          <div className='leaderboard-name'> No entires yet {time ? `this ${time}` : '' } </div>
        </div>
      }
    </div>
  )
}

export default LeaderboardTable;
