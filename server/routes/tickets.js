const router = require('express').Router();
const { Ticket } = require('../db/models');

router.get('/', (req,res,next) => {
  Ticket.findAll()
    .then(advisors => res.send(advisors))
    .catch(next)
});

router.post('/', (req,res,next) => {
  Ticket.create(req.body)
    .then(advisor => res.send(advisor))
    .catch(next)
});

router.put('/:id', (req,res,next) => {
  Ticket.findById(req.params.id)
    .then(ticket => ticket.update(req.body))
    .then(ticket => res.send(ticket))
    .catch(next)
});

module.exports = router;