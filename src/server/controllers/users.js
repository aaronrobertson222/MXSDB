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
    const { username, firstname, lastname, password } = req.body;
    models.user
      .findAndCountAll({
        where: {
          username: username.trim()
        }
      })
      .then(result => {
        // check if user exists. if so returns error
        if (result.count > 0) {
          return res.status(400).json({message: 'user already exists'});
        }

        return models.user.prototype.generateHash(password);
      })
      .then(hash => {
        // if user does not exists creates new user and returns success
        models.user.create({
          username: username.trim(),
          firstname: firstname.trim(),
          lastname: lastname.trim(),
          password: hash,
          joinedDate: Date.now(),
        })
          .then((user) => res.status(200).json({message: 'user created', user: user.apiRepr()}));
      })
      .catch(() => res.status(500).json({message: 'internal server error'}));
  }
};
