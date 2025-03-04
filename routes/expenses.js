const express = require('express');
const { getMainPage, postAllExpenses } = require('../controller/expense');
const router = express.Router();


router.route('/').get(getMainPage).post(postAllExpenses)


module.exports = router