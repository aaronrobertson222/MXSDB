const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/users.js');

router.get('/me', passport.authenticate('jwt', { session: false }), userController.retrieveMe);


router.post('/', userController.create);
router.post('/login', userController.login);

module.exports = router;
