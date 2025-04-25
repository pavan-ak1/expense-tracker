const express = require('express');
const router = require('./routes/expenses');
const app = express();
require('dotenv').config();
const connectDB=require('./db/connect')
const authController = require('./routes/authRoutes')




//middleware
app.get('/', (req, res) => {
    res.redirect('/login.html')
  })


app.use(express.json());
app.use(express.static('./public'))


//routes
app.use('/api/v1/auth', authController)

app.use('/api/v1/expenses',router)



const port = process.env.PORT || 3000;


const start = async ()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        
        
        app.listen(port,()=>console.log(`Server is listening at port ${port}`))
    }catch(error){
        console.log(error);
        
        
    }
}

start()