const express = require('express');
const router = express.Router();
const {login,register,logout} = require('../controller/authController');


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);


module.exports = router