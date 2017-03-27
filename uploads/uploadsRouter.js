const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const passport = require('passport');
const path = require('path');
const {AWS_BUCKET} = require('../config');
const {Uploads} = require('./uploadsModel');

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
      cb(null, file.originalname + '-' + Date.now().toString());
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
      return res.status(500).sendFile(path.join(__dirname, '../public', 'error.html'));
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
  if (req.params.filter === 'popular') {
    return Uploads
              .find({})
              .sort({'downloadCount': -1})
              .exec()
              .then(items => {
                return res.status(200).json(items.map((item) => item.apiRepr()));
              });
  }
});

//get items by type and filter
router.get('/type/:type/:filter', (req, res) => {
  //bikes
  if (req.params.type === 'bikes') {
    if (req.params.filter === 'recent') {
      return Uploads
                .find({itemType: 'bike'})
                .sort({'_id': -1})
                .exec()
                .then(items => {
                  return res.status(200).json(items.map((item) => item.apiRepr()));
                });
    }
    if (req.params.filter === 'popular') {
      return Uploads
                .find({itemType: 'bike'})
                .sort({'downloadCount': -1})
                .exec()
                .then(items => {
                  return res.status(200).json(items.map((item) => item.apiRepr()));
                });
    }
    if (req.params.filter === 'skin') {
      return Uploads
                .find({itemType: 'bike', category: 'skin'})
                .exec()
                .then(items => {
                  return res.status(200).json(items.map((item) => item.apiRepr()));
                });
    }
    if (req.params.filter === 'model') {
      return Uploads
                .find({itemType: 'bike', category: 'model'})
                .exec()
                .then(items => {
                  return res.status(200).json(items.map((item) => item.apiRepr()));
                });
    }
}
//tracks
if (req.params.type === 'tracks') {
  if (req.params.filter === 'recent') {
    return Uploads
              .find({itemType: 'track'})
              .sort({'_id': -1})
              .exec()
              .then(items => {
                return res.status(200).json(items.map((item) => item.apiRepr()));
              });
  }
  if (req.params.filter === 'popular') {
    return Uploads
              .find({itemType: 'track'})
              .sort({'downloadCount': -1})
              .exec()
              .then(items => {
                return res.status(200).json(items.map((item) => item.apiRepr()));
              });
  }
  if (req.params.filter === 'arenacross') {
    return Uploads
              .find({itemType: 'track', category: 'arenacross'})
              .exec()
              .then(items => {
                return res.status(200).json(items.map((item) => item.apiRepr()));
              });
  }
  if (req.params.filter === 'supercross') {
    return Uploads
              .find({itemType: 'track', category: 'supercross'})
              .exec()
              .then(items => {
                return res.status(200).json(items.map((item) => item.apiRepr()));
              });
  }
  if (req.params.filter === 'motocross') {
    return Uploads
              .find({itemType: 'track', category: 'motocross'})
              .exec()
              .then(items => {
                return res.status(200).json(items.map((item) => item.apiRepr()));
              });
  }
  if (req.params.filter === 'enduro') {
    return Uploads
              .find({itemType: 'track', category: 'enduro'})
              .exec()
              .then(items => {
                return res.status(200).json(items.map((item) => item.apiRepr()));
              });
  }
}
//gear
if (req.params.type === 'gear') {
  if (req.params.filter === 'recent') {
    return Uploads
              .find({itemType: 'gear'})
              .sort({'_id': -1})
              .exec()
              .then(items => {
                return res.status(200).json(items.map((item) => item.apiRepr()));
              });
  }
  if (req.params.filter === 'popular') {
    return Uploads
              .find({itemType: 'gear'})
              .sort({'downloadCount': -1})
              .exec()
              .then(items => {
                return res.status(200).json(items.map((item) => item.apiRepr()));
              });
  }
  if (req.params.filter === 'skin') {
    return Uploads
              .find({itemType: 'gear', category: 'skin'})
              .exec()
              .then(items => {
                return res.status(200).json(items.map((item) => item.apiRepr()));
              });
  }
  if (req.params.filter === 'model') {
    return Uploads
              .find({itemType: 'gear', category: 'model'})
              .exec()
              .then(items => {
                return res.status(200).json(items.map((item) => item.apiRepr()));
              });
  }
}
});

//get page for items
router.get('/id/:id', (req, res) => {
  console.log(req.params.id);
  return Uploads
            .findOne({'_id': req.params.id})
            .exec()
            .then(item => {
              if (!item) {
                console.log('not found');
                return res.status(404).json({message: 'item not found'});
              }
              return res.status(200).sendFile(path.join(__dirname, '../public', 'item.html'));
            })
            .catch(err => {
              console.log(err);
              return res.status(500).sendFile(path.join(__dirname, '../public', 'error.html'));
            });
});

//get info on specific item
router.get('/info/:id', (req, res) => {
  return Uploads
            .findOne({'_id': req.params.id})
            .exec()
            .then(item => {
              return res.status(200).json({item: item.apiRepr()});
            })
            .catch(err => {
              console.log(err);
              return res.status(200).sendFile(path.join(__dirname, '../public', 'error.html'));
            });
});

//increment download count by 1
router.get('/id/:id/downloadCount', (req, res) => {
  return Uploads
            .findOneAndUpdate({'_id': req.params.id}, { $inc: {'downloadCount' : 1}})
            .exec()
            .then(item => {
              console.log(item);
              return res.status(200).json({message: 'success'});
            })
            .catch(err => {
              return console.log(err);
            });
});

router.get('/by/user/:user', (req, res) => {
  return Uploads
            .find({'creator': req.params.user})
            .exec()
            .then(items => {
              return res.status(200).json(items.map((item) => item.apiRepr()));
            })
            .catch(err => {
              return console.log(err);
            });
});

module.exports = {router};
