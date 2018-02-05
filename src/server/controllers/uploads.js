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

    // This takes file from multipart form and uploads it to s3 bucket.

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
        imageKey: req.files.imgFile[0].key,
        imageLocation: req.files.imgFile[0].location
      })
      .then(upload => res.status(200).json({message: 'success', upload}))
      .catch(err => res.status(500).json({message: 'internal server error', err}));
  }
};
