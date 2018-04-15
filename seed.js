const { Advisor, Ticket, conn }  = require('./server/db')

// randomizers for seeding
const faker = require('faker');
const chance = require('chance')('Warby');

const numOfTickets = 20;
const numOfAdvisors = 15;

const doTimes = (n, func) => {
  const result = [];
  while (n--){
    result.push(func());
  };
  return result;
};

const randomAdvisor = () => {
  const gender = chance.gender();
  const name = chance.name({gender});
  return Advisor.build({ name });
};

const randomTicket = () => {
  const reason = faker.random.words();
  const date = chance.date()
  return Ticket.build({ reason: chance.capitalize(reason), date })
};

const advisors = doTimes(numOfAdvisors, randomAdvisor);
const tickets = doTimes(numOfTickets, randomTicket);

const seed = () => {
  return Promise.all(advisors.map(advisor => advisor.save()))
    .then(() => Promise.all(tickets.map(ticket => ticket.save()
      .then(advisor => {
        const randomAdvisor = chance.pickone(advisors);
        ticket.setAdvisor(randomAdvisor)
      })
    ))
  );
};

console.log('Syncing...');

conn.sync({force: true})
  .then(() => {
    console.log('Seeding...');
    return seed();
  })
  .then(()=> console.log('Database has seeded!'))
  .catch(err => console.log('!! Error while seeding !!', err))
  .finally(() => {
    conn.close();
    return null;
});