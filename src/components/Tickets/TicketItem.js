import React from 'react';
import moment from 'moment';

const TicketItem = (props) => {

  const { ticket, advisor } = props;
  return (
    <div className='jumbotron list-group-item'>
      <div className=''>
        <strong>{`${moment(ticket.date).format('dddd M/D')}`}</strong>
          <br />
        <strong>Reason:</strong> {ticket.reason}
          <br />
        <strong>Advisor:</strong> { advisor ? advisor.name : null }
      </div>
    </div>
  )
};

export default TicketItem;