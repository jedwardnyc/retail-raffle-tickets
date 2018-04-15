const advisors = {
    baize: 9,
    carlo: 2,
    corey: 8,
    deanna: 6,
    donald: 1,
    donkia: 6,
    iz: 6,
    joseph: 5,
    marcus: 4,
    roger: 2,
    rosemary: 3,
    sazid: 1,
    serge: 5
  }
  
  const pickWinner = (advisors) => {
    
    const entries = [];
    const advisorArr = Object.keys(advisors);
   
    advisorArr.forEach(advisor => {
      let tickets = advisors[advisor]
      while (tickets){
        entries.push(advisor)
        tickets--
      }
    });
    
    const randomNum =  Math.floor(Math.random()*entries.length);
    const winner = entries[randomNum];
    
    return winner;
    
  };
  
  pickWinner(advisors)