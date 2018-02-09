const jwt = require('jsonwebtoken');

const models = require('../models');
const { SECRET, EXPIRATIONTIME } = require('../config/app.config');


module.exports = {
  retrieve(req, res) {
    models.user
      .findAll().
      then((users) => {
        return res.status(200).json({users: users.map(user => user.apiRepr())});
      });
  },

  create: async function(req, res) {
    try {
      const { username, password } = req.body;
      let results = await models.user
        .findAndCountAll({
          where: {
            username: username.trim()
          }
        });

      if (results.count > 0) {
        return res.status(400).json({message: 'user already exists'});
      }

      const hashedPassword = await models.user.prototype.generateHash(password);

      const user = await models.user.create({
        username: username.trim(),
        password: hashedPassword,
        joinedDate: Date.now(),
      });

      return res.status(200).json({user: user});
    } catch(err) {
      console.log(err); //eslint-disable-line
    }
  },

  login: async function(req, res) {
    try{
      const { username, password } = req.body;
      if ( !username || !password ) {
        return res.status(400).json({message: 'missing field in body'});
      }

      const user = await models.user.findOne({
        where: {
          username,
        }
      });

      if (!user) {
        return res.status(404).json({message: 'Incorrect username.'});
      }

      const isValid = await user.validatePassword(password);

      if (!isValid) {
        return res.status(400).json({message: 'Incorrect password.'});
      }

      const jwtToken = jwt.sign(user.apiRepr(), SECRET);

      return res.status(200).json({
        success: true,
        token: 'JWT ' + jwtToken,
        tokenExpiration: new Date(Date.now() + EXPIRATIONTIME),
        user: user.apiRepr()
      });
    } catch(err) {
    console.log(err);//eslint-disable-line
    }

  },
};
