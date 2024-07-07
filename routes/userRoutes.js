const express = require('express');

const validateAccessToken = require('../middleware/validateToken');

const router = express.Router()

const {registerUser, loginUser, currentUser} = require('../controller/userController');


router.route('/register').post(registerUser);

router.post('/login',loginUser)

router.get('/current', validateAccessToken,  currentUser)

module.exports = router