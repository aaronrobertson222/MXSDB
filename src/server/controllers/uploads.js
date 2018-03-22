const models = require('../models');
const logger = require('../config/logger.config.js');

function getQueryParams(queryString) {
  const include = queryString.category ? queryString.category.split(',') : ['bike', 'gear', 'track'];
  const limit = queryString.limit ? queryString.limit : 9;
  const offset = queryString.offset ? queryString.offset : null;
  let order = [['createdAt', 'DESC']];
  if (queryString.by && queryString.by === 'popular') {
    order = [['downloadCount', 'DESC']];
  }

  const query = {
    limit,
    offset,
    order,
    where: {
      category: include
    }
  };

  return query;
}

module.exports = {
  // retrieves current users uploads that match filter criteria
  listMyUploads: async function(req, res) {
    try {
      const query = await getQueryParams(req.query);

      let uploads = await req.user.getUploads(query);
      return res.status(200).json({uploads});

    } catch(err) {
      logger.error(err);
      return res.status(500).json({message: 'Internal server error'});
    }

  },

  list: async function(req, res) {
    try {
      const query = await getQueryParams(req.query);
      const results = await models.upload.scope('public').findAll(query);

      return res.status(200).json({results});
    } catch(err) {
      console.log(err); //eslint-disable-line
      return res.status(200).json({message: 'Internal server error'});
    }

  },

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
