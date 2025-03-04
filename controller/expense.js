const expense = require('../models/expenseModel');


const getMainPage = async (req,res)=>{
    try{
        const expenses = await expense.find({})
        res.status(201).json({expenses})
    }
    catch(error){
        res.status(500).json({msg:'There was an error occured'})
    }
}

const postAllExpenses = async (req,res)=>{
    try{
        const { description, category, amount } = req.body;
        if (!description || !category || isNaN(amount) || amount <= 0) {
            return res.status(400).json({ error: 'Invalid data' });
        }
        const expenses = await expense.create({ description, category, amount });
        res.status(201).json({ expenses });

    }catch(error){
        res.status(500).json({msg:'There was an error occured'})
    }
    
    
    
    
}


module.exports = {getMainPage,postAllExpenses}