const Expense = require('../models/expenseModel');

// GET all expenses
const getMainPage = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.userId });
        res.status(200).json({ expenses });
    } catch (error) {
        console.error('GET /expenses error:', error);
        res.status(500).json({ msg: 'There was an error occurred' });
    }
};

// POST a new expense
const postAllExpenses = async (req, res) => {
    try {
        const { description, category = 'others', amount } = req.body;

        // Basic validation
        if (!description || isNaN(amount) || amount <= 0) {
            return res.status(400).json({ error: 'Invalid data' });
        }

        const expense = await Expense.create({
            description,
            category,
            amount,
            user: req.user.userId
        });

        res.status(201).json({ expense });

    } catch (error) {
        console.error('POST /expenses error:', error);
        res.status(500).json({ msg: 'There was an error occurred' });
    }
};

// DELETE an expense
const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await Expense.findOneAndDelete({
            _id: id,
            user: req.user.userId
        });

        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        res.status(200).json({ msg: 'Expense deleted successfully' });
    } catch (error) {
        console.error('DELETE /expenses error:', error);
        res.status(500).json({ msg: 'There was an error occurred' });
    }
};

module.exports = { getMainPage, postAllExpenses, deleteExpense };
