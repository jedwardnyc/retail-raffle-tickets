import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chance from 'chance';

class Winner extends Component {
  constructor(props){
    super(props);
    this.state = {
      winner: '',
      disabled: false
    }
    this.pickWinner = this.pickWinner.bind(this);
  }
  
  pickWinner(ev){
    const chance = new Chance
    this.setState({ disabled: true, winner: '' })
    setTimeout(() => this.setState({ 
      winner: chance.pickone(this.props.entries), 
      disabled: false 
    }), 1500)
  }

  render(){
    const { entries } = this.props;
    const { winner, disabled } = this.state;
    const drumrollUrls = ['/public/gifs/drumroll-1.gif', '/public/gifs/drumroll-2.gif', '/public/gifs/drumroll-3.gif'];
    const chance = new Chance
    return (
      <div id='winner'>
        <div className='winner-title'> Pick a Winner </div>
        { winner ? 
          <div className='winner'> {winner} is the Winner! </div> : null
        }
        {
          disabled ? 
          <div className='drumroll'>
            <div className='drumroll-text'> Drum Roll Please... </div>
            <img className='drumroll-gif' src={chance.pickone(drumrollUrls)} /> 
          </div> : null
        }
        <button disabled={disabled} onClick={(ev) => this.pickWinner(ev)} className='winner-button'> Select a Winner </button>
      </div>
    )
  }
}

const mapStateToProps = ({ advisors, tickets }) => {

  const advisorMap = tickets.reduce((memo, ticket) => {
    const advisor = advisors.find(advisor => advisor.id === ticket.advisorId);
      memo[advisor.name] ? memo[advisor.name]++ : memo[advisor.name] = 1;
      return memo;   
  }, {})

  const entries = [];
  const advisorArr = Object.keys(advisorMap);

  advisorArr.map(advisor => {
    let tickets = advisorMap[advisor]
    while (tickets){
      entries.push(advisor)
      tickets--
    }
  });

  return {
    entries
  }
}

export default connect(mapStateToProps)(Winner);
