const Op = require('sequelize').Op;
const jwt = require('jsonwebtoken');
const models = require('../models');
const { SECRET, EXPIRATIONTIME } = require('../config/app.config');
const { logger } = require('../config/logger.config');


module.exports = {
  create: async function(req, res) {
    
    const { username, password } = req.body;
    let results = await models.user
      .findAndCountAll({
        where: {
          [Op.and]: {
            username: username.trim()
          }
        }
      });

    if (results.count > 0) {
      return res.status(400).json({message: 'user already exists'});
    }

    const hashedPassword = await models.user.prototype.generateHash(password);

    try {
      const user = await models.user.create({
        username: username.trim(),
        password: hashedPassword,
        joinedDate: Date.now(),
      });

      return res.status(200).json({user});
    } catch(err) {
      logger.error(err);
    }
  },

  login: async function(req, res) {
    
    // Check that body has correct fields
    const { username, password } = req.body;
    if ( !username || !password ) {
      return res.status(400).json({message: 'missing field in body'});
    }

    try{
      const user = await models.user.findOne({
        where: {
          [Op.and]: {
            username: username,
          },
        }
      });

      if (!user) {
        return res.status(404).json({message: 'Incorrect username or password'});
      }

      const isValid = await user.validatePassword(password);

      if (!isValid) {
        return res.status(400).json({message: 'Incorrect username or password'});
      }

      const jwtToken = jwt.sign(user.dataValues, SECRET);

      return res.status(200).json({
        success: true,
        token: 'JWT ' + jwtToken,
        tokenExpiration: new Date(Date.now() + EXPIRATIONTIME),
      });
    } catch(err) {
      logger.error(err);
    }

  },

  retrieveMe: async function(req, res) {
    let user;
    try{
      user = await models.user.findOne({
        where: {
          [Op.and]: {
            username: req.user.username,
          },
        },
      });

      // IDK a better way to get user uploadCount
      let posts = await req.user.getUploads();
      user.uploadCount = posts.length - 1;

    } catch(err) {
      logger.error(err);
    }

    return res.status(200).json({user});
  }
};
