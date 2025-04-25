const mongoose = require('mongoose')


const expenseSchema = new mongoose.Schema({
    description:{
        type:String,
        required:[true, 'Description is required'],
        trim: true,
    maxlength: [20, 'name can not be more than 20 characters'],
    },
    category:{
        type: String,
        required:[true, 'Description is required'],
        default:'others',
    },
    amount:{
        type:Number,
        required: [true, 'Amount is required'],
        min: [0, 'Amount cannot be negative'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }

})
 module.exports = mongoose.model('Expense',expenseSchema);

