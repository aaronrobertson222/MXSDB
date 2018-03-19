const Sequelize = require('sequelize');
const Op = require('sequelize').Op;
const models = require('../models');
const logger = require('../config/logger.config.js');

module.exports = {
  // retrieves current users uploads that match filter criteria
  listMyUploads: async function(req, res) {
    try {
      // storing query string info
      const INCLUDE = req.query.include ? req.query.include.split(',') : ['bike', 'gear', 'track'];
      const OFFSET = req.query.offset;
      const LIMIT = req.query.limit ? req.query.limit : 9;
      let BY = Sequelize.col('createdAt');

      // checking by query is 'popular' or 'recent' and return error if not
      if (req.query.by === 'popular') {
        BY = Sequelize.col('downloadCount');
      } else if(req.query.by !== 'popular' || req.query.by !== 'recent') {
        return res.status(422).json({message: 'Invalid query parameter in request'});
      }

      const query = {
        LIMIT,
        OFFSET,
        order: BY,
        where: {
          category: {
            [Op.in]: INCLUDE,
          }
        }
      };

      let uploads = await req.user.getUploads(query);
      return res.status(200).json({uploads});

    } catch(err) {
      logger.error(err);
      return res.status(500).json({message: 'Internal server error'});
    }

  },

  create(req, res) {
    const newUpload = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.type,
      uploadDate: Date.now(),
      userId: req.user.id,
      fileKey: req.files.itemFile[0].key,
      fileLocation: req.files.itemFile[0].location,
      imageKey: req.files.imageFile[0].key,
      imageLocation: req.files.imageFile[0].location
    };

    // Create DB record for upload
    return models.upload
      .create(newUpload)
      .then(upload => {
        return res.status(200).json({message: 'success', upload});
      })
      .catch(err => {
        logger.error(err);
        return res.status(500).json({message: 'internal server error'});
      });
  },

  destroy(req, res) {
    return models.upload
      .findById(req.body.uploadId)
      .then((item) => {
        if (!item) {
          return res.status(404).json({message: 'item not found'});
        }
        return models.upload
          .destroy()
          .then(() => res.status(204).json({message: 'item successfully deleted'}))
          .catch(() => res.status(500).json({message: 'error'}));
      })
      .catch(() => res.status(500).json({message: 'error internal server error'}));
  }
};
