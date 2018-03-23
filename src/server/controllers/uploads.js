const models = require('../models');
const queryUtils = require('../utils/query-utils');
const logger = require('../config/logger.config.js');

module.exports = {
  // retrieves current users uploads that match filter criteria
  listMyUploads: async function(req, res) {
    try {
      const query = await queryUtils.getQueryParams(req.query);

      let uploads = await req.user.getUploads(query);
      return res.status(200).json({uploads});

    } catch(err) {
      logger.error(err);
      return res.status(500).json({message: 'Internal server error'});
    }

  },
  // list upload items based on query criteria
  list: async function(req, res) {
    try {
      const query = await queryUtils.getQueryParams(req.query);
      const results = await models.upload.scope('public').findAll(query);

      return res.status(200).json({results});
    } catch(err) {
      console.log(err); //eslint-disable-line
      return res.status(200).json({message: 'Internal server error'});
    }

  },
  // create new upload item
  create(req, res) {
    const newUpload = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.type,
      creator: req.user.username,
      userId: req.user.uuid,
      fileKey: req.files.itemFile[0].key,
      fileLocation: req.files.itemFile[0].location,
      imageKey: req.files.imageFile[0].key,
      imageLocation: req.files.imageFile[0].location,
      private: req.body.private,
    };

    // Create DB record for upload
    return models.upload
      .create(newUpload)
      .then(upload => {
        return res.status(200).json({message: 'success', upload});
      })
      .catch(err => {
        console.log(err); //eslint-disable-line
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
