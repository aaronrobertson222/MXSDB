const models = require('../models');

module.exports = {
  retrieve(req, res) {
    models.upload
      .findAll().
      then(uploads => {
        return res.status(200).json({uploads: uploads});
      });
  },

  create(req, res) {
    // destructuring upload into variables
    const {
      title,
      description,
      itemType,
      category,
      creator,
      uploadDate,
    } = req.body;
    // Create DB record for upload
    models.upload
      .create({
        title,
        description,
        itemType,
        category,
        creator,
        uploadDate,
        fileKey: req.files.itemFile[0].key,
        fileLocation: req.files.itemFile[0].location,
        imageKey: req.files.imageFile[0].key,
        imageLocation: req.files.imageFile[0].location
      })
      .then(upload => res.status(200).json({message: 'success', upload}))
      .catch(err => res.status(500).json({message: 'internal server error', err}));
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
