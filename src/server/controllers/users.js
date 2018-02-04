const models = require('../models');

module.exports = {
  retrieve(req, res) {
    models.user
      .findAll().
      then(users => {
        return res.status(200).json({users: users});
      });
  },
  
  create(req, res) {
    const { username } = req.body;
    models.user
      .findAndCountAll({
        where: {
          username: username.trim()
        }
      })
      .then(result => {
        if (result.count > 0) {
          return res.status(400).json({message: 'user already exists'});
        }
        models.user.create({
          username: username.trim()
        })
          .then(user => res.status(200).json({message: 'user created', user: user}));
      })
      .catch(err => res.status(500).json({message: 'internal server error', err}));
  }
};
