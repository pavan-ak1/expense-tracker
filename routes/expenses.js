const express = require('express');
const { getMainPage, postAllExpenses, deleteExpense } = require('../controller/expense');
const authenticateUser = require('../middleware/authenticateUser');
const router = express.Router();

router.route('/')
    .get(authenticateUser, getMainPage)
    .post(authenticateUser, postAllExpenses);

router.route('/:id')
    .delete(authenticateUser, deleteExpense);

module.exports = router;