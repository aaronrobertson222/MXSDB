const express = require('express');
const router = express.Router();
const uploadsController = require('../controllers/uploads.js');
const passport = require('passport');

const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const {AWS_BUCKET} = require('../config/app.config');
const s3 = new AWS.S3({
  apiVersion: '2016-04-01',
});

const fileUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: AWS_BUCKET,
    metadata: function(req, file, cb) {
      cb(null, {
        fieldName: file.fieldname
      });
    },
    key: function(req, file, cb) {
      cb(null, `${file.orignalname}- ${Date.now().toString()}`);
    }
  })
});

router.post('/', passport.authenticate('jwt', {session: false}), fileUpload.fields([{
  name: 'itemFile',
  maxCount: 1
},
{
  name: 'imageFile',
  maxCount: 1
}
]), uploadsController.create);

router.get('/', uploadsController.retrieve);

module.exports = router;
