const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const passport = require('passport');

const {AWS_BUCKET} = require('../config');
const {Uploads} = require('./uploadsModel');

//initializing AWS Config
AWS.config.loadFromPath(__dirname + '/config.json');

const s3 = new AWS.S3({
  apiVersion: '2016-04-01',
});
// multer middleware to handle AWS upload with multer S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: AWS_BUCKET,
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

//POST route handles uploads
router.post('/',
  passport.authenticate('jwt', {session: false}),
  upload.fields([
    { name: 'itemFile', maxCount: 1 },
    { name: 'imgFile', maxCount: 1 }
  ]), (req, res) => {
  const newItem = {
    name: req.body.itemName,
    description: req.body.description,
    itemType: req.body.type,
    category: req.body.category,
    creator: req.user.username,
    uploadDate: Date.now(),
    fileInfo: {
      //fileKey: req.files.itemFile[0].key,
      //imgKey: req.files.imgFile[1].key
    }
  }
  res.status(201).json({files: req.files, item: newItem});
  // inserts new item into mongo database
  /*return Uploads
    .create(newItem)
    .then(item => {
      return res.status(201).json({item: item.apiRepr()});
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({message: 'internal server error'});
    });*/
});

module.exports = {router};
