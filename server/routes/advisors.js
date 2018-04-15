const router = require('express').Router();
const { Advisor, Ticket } = require('../db/models');

router.get('/', (req,res,next) => {
  Advisor.findAll({
    include: [{ model: Ticket }],
    order: [['name', 'ASC']]
  })
    .then(advisors => res.send(advisors))
    .catch(next)
})

module.exports = router;