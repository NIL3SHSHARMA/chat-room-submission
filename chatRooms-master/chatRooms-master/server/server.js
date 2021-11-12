const express = require('express');
const connectDB=require('./config/dbconn');
const cors = require('cors');
require('dotenv').config()
// connect DB
connectDB();

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:false}));



app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`server running on port http://localhost:${PORT}`)
})

app.use((req,res)=>{
    res.send('404');
})