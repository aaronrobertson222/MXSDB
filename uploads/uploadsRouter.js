const AWS = require('aws-sdk');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const mongoosePaginate = require('mongoose-paginate');
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
            cb(null, {
                fieldName: file.fieldname
            });
        },
        key: function(req, file, cb) {
            cb(null, file.originalname + '-' + Date.now().toString());
        }
    })
});

const router = express.Router();

//POST route handles uploads
router.post('/',
    passport.authenticate('jwt', {
        session: false
    }),
    upload.fields([{
            name: 'itemFile',
            maxCount: 1
        },
        {
            name: 'imgFile',
            maxCount: 1
        }
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
        // inserts new item into mongo database
        return Uploads
            .create(newItem)
            .then(item => {
                return res.status(201).json({
                    item: item
                });
            })
            .catch(err => {
                return res.status(500).sendFile(path.join(__dirname, '../public', 'error.html'));
            });
    });

const perPage = 9;
router.post('/:filter', (req, res) => {
    if (req.params.filter === 'recent') {
        const page = parseInt(req.body.currentPage);
        return Uploads
            .paginate({}, {
                page: page + 1,
                limit: perPage,
                sort: {
                    '_id': -1
                }
            })
            .then(items => {
                return res.status(200).json({
                    items: items.docs.map((item) => item.apiRepr()),
                    page: items.page,
                    pages: items.pages
                })
            })
            .catch(err => {
                return res.status(500).sendFile(path.join(__dirname, '../public', 'error.html'));
            });
    }

    if (req.params.filter === 'popular') {
        const page = parseInt(req.body.currentPage);
        return Uploads
            .paginate({}, {
                page: page + 1,
                limit: perPage,
                sort: {
                    'downloadCount': -1
                }
            })
            .then(items => {
                return res.status(200).json({
                    items: items.docs.map((item) => item.apiRepr()),
                    page: items.page,
                    pages: items.pages
                });
            })
            .catch(err => {
                return res.status(500).sendFile(path.join(__dirname, '../public', 'error.html'));
            });
    }
});

//get items by type and filter
router.post('/type/:type/:filter', (req, res) => {
    //bikes
    const page = parseInt(req.body.currentPage);
    if (req.params.type === 'bikes') {
        if (req.params.filter === 'recent') {
            return Uploads
                .paginate({
                    itemType: 'bike'
                }, {
                    page: page + 1,
                    limit: perPage,
                    sort: {
                        '_id': -1
                    }
                })
                .then(items => {
                    return res.status(200).json({
                        items: items.docs.map((item) => item.apiRepr()),
                        page: items.page,
                        pages: items.pages
                    });
                })
                .catch(err => {
                    return res.status(500).sendFile(path.join(__dirname, '../public', 'error.html'));
                });
        }
        if (req.params.filter === 'popular') {
            return Uploads
                .paginate({
                    itemType: 'bike'
                }, {
                    page: page + 1,
                    limit: perPage,
                    sort: {
                        'downloadCount': -1
                    }
                })
                .then(items => {
                    return res.status(200).json({
                        items: items.docs.map((item) => item.apiRepr()),
                        page: items.page,
                        pages: items.pages
                    });
                })
                .catch(err => {
                    return res.status(500).sendFile(path.join(__dirname, '../public', 'error.html'));
                });
        }
        if (req.params.filter === 'skin') {
            return Uploads
                .paginate({
                    itemType: 'bike',
                    category: 'skin'
                }, {
                    page: page + 1,
                    limit: perPage,
                    sort: {
                        '_id': -1
                    }
                })
                .then(items => {
                    return res.status(200).json({
                        items: items.docs.map((item) => item.apiRepr()),
                        page: items.page,
                        pages: items.pages
                    });
                })
                .catch(err => {
                    return res.status(500).sendFile(path.join(__dirname, '../public', 'error.html'));
                });
        }
        if (req.params.filter === 'model') {
            return Uploads
                .paginate({
                    itemType: 'bike',
                    category: 'model'
                }, {
                    page: page + 1,
                    limit: perPage,
                    sort: {
                        '_id': -1
                    }
                })
                .then(items => {
                    return res.status(200).json({
                        items: items.docs.map((item) => item.apiRepr()),
                        page: items.page,
                        pages: items.pages
                    });
                })
                .catch(err => {
                    return res.status(500).sendFile(path.join(__dirname, '../public', 'error.html'));
                });
        }
    }
    //tracks
    if (req.params.type === 'tracks') {
        if (req.params.filter === 'recent') {
            return Uploads
                .paginate({
                    itemType: 'track'
                }, {
                    page: page + 1,
                    limit: perPage,
                    sort: {
                        '_id': -1
                    }
                })
                .then(items => {
                    return res.status(200).json({
                        items: items.docs.map((item) => item.apiRepr()),
                        page: items.page,
                        pages: items.pages
                    });
                })
                .catch(err => {
                    return res.status(500).sendFile(path.join(__dirname, '../public', 'error.html'));
                });
        }
        if (req.params.filter === 'popular') {
            return Uploads
                .paginate({
                    itemType: 'track'
                }, {
                    page: page + 1,
                    limit: perPage,
                    sort: {
                        'downloadCount': -1
                    }
                })
                .then(items => {
                    return res.status(200).json({
                        items: items.docs.map((item) => item.apiRepr()),
                        page: items.page,
                        pages: items.pages
                    });
                })
                .catch(err => {
                    return res.status(500).sendFile(path.join(__dirname, '../public', 'error.html'));
                });
        }
        if (req.params.filter === 'arenacross') {
            return Uploads
                .paginate({
                    itemType: 'track',
                    category: 'arenacross'
                }, {
                    page: page + 1,
                    limit: perPage,
                    sort: {
                        '_id': -1
                    }
                })
                .then(items => {
                    return res.status(200).json({
                        items: items.docs.map((item) => item.apiRepr()),
                        page: items.page,
                        pages: items.pages
                    });
                })
                .catch(err => {
                    return res.status(500).sendFile(path.join(__dirname, '../public', 'error.html'));
                });
        }
        if (req.params.filter === 'supercross') {
            return Uploads
                .paginate({
                    itemType: 'track',
                    category: 'supercross'
                }, {
                    page: page + 1,
                    limit: perPage,
                    sort: {
                        '_id': -1
                    }
                })
                .then(items => {
                    return res.status(200).json({
                        items: items.docs.map((item) => item.apiRepr()),
                        page: items.page,
                        pages: items.pages
                    });
                })
                .catch(err => {
                    return res.status(500).sendFile(path.join(__dirname, '../public', 'error.html'));
                });
        }
        if (req.params.filter === 'motocross') {
            return Uploads
                .paginate({
                    itemType: 'track',
                    category: 'motocross'
                }, {
                    page: page + 1,
                    limit: perPage,
                    sort: {
                        '_id': -1
                    }
                })
                .then(items => {
                    return res.status(200).json({
                        items: items.docs.map((item) => item.apiRepr()),
                        page: items.page,
                        pages: items.pages
                    });
                })
                .catch(err => {
                    return res.status(500).sendFile(path.join(__dirname, '../public', 'error.html'));
                });
        }
        if (req.params.filter === 'enduro') {
            return Uploads
                .paginate({
                    itemType: 'track',
                    category: 'enduro'
                }, {
                    page: page + 1,
                    limit: perPage,
                    sort: {
                        '_id': -1
                    }
                })
                .then(items => {
                    return res.status(200).json({
                        items: items.docs.map((item) => item.apiRepr()),
                        page: items.page,
                        pages: items.pages
                    });
                })
                .catch(err => {
                    return res.status(500).sendFile(path.join(__dirname, '../public', 'error.html'));
                });
        }
    }
    //gear
    if (req.params.type === 'gear') {
        if (req.params.filter === 'recent') {
            return Uploads
                .paginate({
                    itemType: 'gear'
                }, {
                    page: page + 1,
                    limit: perPage,
                    sort: {
                        '_id': -1
                    }
                })
                .then(items => {
                    return res.status(200).json({
                        items: items.docs.map((item) => item.apiRepr()),
                        page: items.page,
                        pages: items.pages
                    });
                })
                .catch(err => {
                    return res.status(500).sendFile(path.join(__dirname, '../public', 'error.html'));
                });
        }
        if (req.params.filter === 'popular') {
            return Uploads
                .paginate({
                    itemType: 'track'
                }, {
                    page: page + 1,
                    limit: perPage,
                    sort: {
                        'downloadCount': -1
                    }
                })
                .then(items => {
                    return res.status(200).json({
                        items: items.docs.map((item) => item.apiRepr()),
                        page: items.page,
                        pages: items.pages
                    });
                })
                .catch(err => {
                    return res.status(500).sendFile(path.join(__dirname, '../public', 'error.html'));
                });
        }
        if (req.params.filter === 'skin') {
            return Uploads
                .paginate({
                    itemType: 'track',
                    category: 'skin'
                }, {
                    page: page + 1,
                    limit: perPage,
                    sort: {
                        '_id': -1
                    }
                })
                .then(items => {
                    return res.status(200).json({
                        items: items.docs.map((item) => item.apiRepr()),
                        page: items.page,
                        pages: items.pages
                    });
                })
                .catch(err => {
                    return res.status(500).sendFile(path.join(__dirname, '../public', 'error.html'));
                });
        }
        if (req.params.filter === 'model') {
            return Uploads
                .paginate({
                    itemType: 'track',
                    category: 'model'
                }, {
                    page: page + 1,
                    limit: perPage,
                    sort: {
                        '_id': -1
                    }
                })
                .then(items => {
                    return res.status(200).json({
                        items: items.docs.map((item) => item.apiRepr()),
                        page: items.page,
                        pages: items.pages
                    });
                })
                .catch(err => {
                    return res.status(500).sendFile(path.join(__dirname, '../public', 'error.html'));
                });
        }
    }
});

//get page for items
router.get('/id/:id', (req, res) => {
    console.log(req.params.id);
    return Uploads
        .findOne({
            '_id': req.params.id
        })
        .exec()
        .then(item => {
            if (!item) {
                console.log('not found');
                return res.status(404).json({
                    message: 'item not found'
                });
            }
            return res.status(200).sendFile(path.join(__dirname, '../public', 'item.html'));
        })
        .catch(err => {
            return res.status(500).sendFile(path.join(__dirname, '../public', 'error.html'));
        });
});

//get info on specific item
router.get('/info/:id', (req, res) => {
    return Uploads
        .findOne({
            '_id': req.params.id
        })
        .exec()
        .then(item => {
            return res.status(200).json({
                item: item.apiRepr()
            });
        })
        .catch(err => {
            return res.status(200).sendFile(path.join(__dirname, '../public', 'error.html'));
        });
});

//increment download count by 1
router.get('/id/:id/downloadCount', (req, res) => {
    return Uploads
        .findOneAndUpdate({
            '_id': req.params.id
        }, {
            $inc: {
                'downloadCount': 1
            }
        })
        .exec()
        .then(item => {
            console.log(item);
            return res.status(200).json({
                message: 'success'
            });
        })
        .catch(err => {
            return res.status(500).sendFile(path.join(__dirname, '../public', 'error.html'));
        });
});

router.post('/by/user/:user', (req, res) => {
    const page = parseInt(req.body.currentPage);
    return Uploads
        .paginate({
            'creator': req.params.user
        }, {
            page: page + 1,
            limit: perPage,
            sort: {
                '_id': -1
            }
        })
        .then(items => {
            return res.status(200).json({
                items: items.docs.map((item) => item.apiRepr()),
                page: items.page,
                pages: items.pages
            });
        })
        .catch(err => {
            return res.status(500).sendFile(path.join(__dirname, '../public', 'error.html'));
        });
});

module.exports = {router};
