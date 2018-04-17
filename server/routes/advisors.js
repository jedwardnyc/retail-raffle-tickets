const router = require('express').Router();
const { Advisor, Ticket } = require('../db/models');

router.get('/', (req,res,next) => {
  Advisor.findAll({
    order: [['name', 'ASC']]
  })
    .then(advisors => res.send(advisors))
    .catch(next)
});

router.post('/', (req,res,next) => {
  Advisor.create(req.body)
    .then(advisor => res.send(advisor))
    .catch(next)
});

router.put('/:id', (req,res,next) => {
  Advisor.findById(req.params.id)
    .then(advisor => advisor.update(req.body))
    .then(advisor => res.send(advisor))
    .catch(next)
});

router.delete('/:id', (req,res,next) => {
  Advisor.findById(req.params.id)
    .then(advisor => {
      advisor.destroy()
      res.sendStatus(204)
    })
    .catch(next)
});

module.exports = router;