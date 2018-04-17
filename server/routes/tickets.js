const router = require('express').Router();
const { Ticket } = require('../db/models');

router.get('/', (req,res,next) => {
  Ticket.findAll()
    .then(tickets => res.send(tickets))
    .catch(next)
});

router.post('/', (req,res,next) => {
  Ticket.create(req.body)
    .then(ticket => res.send(ticket))
    .catch(next)
});

router.put('/:id', (req,res,next) => {
  Ticket.findById(req.params.id)
    .then(ticket => ticket.update(req.body))
    .then(ticket => res.send(ticket))
    .catch(next)
});

router.delete('/:id', (req,res,next) => {
  console.log('deleted')
  Ticket.findById(req.params.id)
    .then(ticket => {
      ticket.destroy()
      res.sendStatus(204)
    })
    .catch(next)
});

module.exports = router;