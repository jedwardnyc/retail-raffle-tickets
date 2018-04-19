const router = require('express').Router();
const User = require('../db/models/User');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const { secret } = require('./config');

router.post('/register', (req,res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  User.create(Object.assign({}, req.body, { password: hashedPassword }))
  .then(user => {
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: 86400 })
    res.send({ auth: true, token })
  })
  .catch(err => res.status(500).send({type: 'unique', message: 'Looks like that email is already in use, please use another!'}))
});

router.get('/me', (req, res) => {
  const token = req.headers['x-access-token'];
  jwt.verify(token, secret, (err, decoded) => {
    User.findById(decoded.id, { attributes: { exclude: ['password'] } })
    .then(user => res.send(user))
    .catch(err => res.status(404).send({ auth: false, message: 'Whoops! Looks like we can\'t find you!' }))
  });
});

router.post('/login', (req, res) => {
  User.findOne({where: { email: req.body.email } })
    .then(user => {
      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null, type: 'password', message: 'Incorrect password, please try again...'});
      const token = jwt.sign({ id: user.id }, secret, {expiresIn: 86400 })
      res.status(200).send({ auth: true, token: token });
    })
    .catch(err => res.status(404).send({ auth: false, type: 'email', message: 'Uh Oh! Looks like we can\'t find a user with that email...'}))
});

module.exports = router;