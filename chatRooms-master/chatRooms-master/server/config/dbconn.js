const mongoose = require('mongoose');

const connectDB = async() =>{
   
    await mongoose.connect(process.env.MNDB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("mongoDB connected");
}

module.exports= connectDB