const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const {Uploads} = require('./uploadsModel');

AWS.config.loadFromPath(__dirname + '/config.json');


const s3 = new AWS.S3({
  apiVersion: '2016-04-01',
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'mxs-db-uploads',
    metadata: function(req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});

const router = express.Router();

router.use(bodyParser.json());

router.post('/', upload.array('item-file', 1), (req, res, next) => {
  console.log(req.files);
});

module.exports = {router};
