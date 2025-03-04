const express = require('express');
const router = require('./routes/expenses');
const app = express();
require('dotenv').config();
const connectDB=require('./db/connect')



//middleware

app.use(express.json());
app.use(express.static('./public'))


//routes
app.use('/api/v1/expenses',router)



const port = 3000;


const start = async ()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        
        
        app.listen(port,()=>console.log(`Server is listening at port ${port}`))
    }catch(error){
        console.log(error);
        
        
    }
}

start()