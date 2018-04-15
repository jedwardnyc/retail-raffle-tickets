const router = require('express').Router();
const { Ticket } = require('../db/models');

router.get('/', (req,res,next) => {
  Ticket.findAll()
    .then(advisors => res.send(advisors))
    .catch(next)
})

router.post('/', (req,res,next) => {
  Ticket.create(req.body)
    .then(advisor => res.send(advisor))
    .catch(next)
})

module.exports = router;