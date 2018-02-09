const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.js');

router.get('/', userController.retrieve);
router.post('/', userController.create);
router.post('/login', userController.login);

module.exports = router;
