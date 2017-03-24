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
    description: req.body.itemDescription,
    itemType: req.body.itemType,
    category: req.body.itemCategory,
    creator: req.user.username,
    uploadDate: Date.now(),
    fileKey: req.files.itemFile[0].key,
    fileLocation: req.files.itemFile[0].location,
    imgKey: req.files.imgFile[0].key,
    imgLocation: req.files.imgFile[0].location
  }

    console.log(newItem);
  //res.status(201).json({files: req.files, item: newItem});
  // inserts new item into mongo database
  return Uploads
    .create(newItem)
    .then(item => {
      return res.status(201).json({item: item});
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({message: 'internal server error'});
    });
});

router.get('/:filter', (req, res) => {
  if (req.params.filter === 'recent') {
    return Uploads
              .find({})
              .sort({'_id': -1})
              .exec()
              .then(items => {
                return res.status(200).json(items.map((item) => item.apiRepr()));
              });
  }
});

module.exports = {router};
