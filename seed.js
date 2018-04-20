const { Advisor, Ticket, User, db }  = require('./server/db/models');
const router = require('./server/index');

// randomizers for seeding
const faker = require('faker');
const chance = require('chance')('Warby');

const numOfTickets = 10;
const numOfAdvisors = 5;
const numOfUsers = 1;

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
  const date = chance.date({year:2018})
  return Ticket.build({ reason: chance.capitalize(reason), date })
};

const randomUser = () => {
  const gender = chance.gender();
  const name = chance.name({ gender })
  const username = `${name[0]}.${name[1]}`
  const password = 'password'
  const email = `${username}@gmail.com`
  return User.build({ name, username, password, email })
};

const advisors = doTimes(numOfAdvisors, randomAdvisor);
const tickets = doTimes(numOfTickets, randomTicket);
const users = doTimes(numOfUsers, randomUser);

const seed = () => {
  return Promise.all(advisors.map(advisor => advisor.save()))
    .then(() => Promise.all(tickets.map(ticket => ticket.save()
      .then(advisor => {
        const randomAdvisor = chance.pickone(advisors);
        ticket.setAdvisor(randomAdvisor)
      })
    )))
    // .then(() => Promise.all(users.map(user => user.save()))
    //   .then(user => login(user))
    // );
};

// const login = (credentials) => {
//   router.post('/auth/local/register', credentials)
// };

console.log('Syncing...');

db.sync({ force: true })
  .then(() => {
    console.log('Seeding...');
    return seed();
  })
  .then(()=> console.log('Database has seeded!'))
  .catch(err => console.log('!! Error while seeding !!', err))
  .finally(() => {
    db.close();
    return null;
});