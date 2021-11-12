const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        usid:{
            type:String,
            require: [true, "Please provide a username"]
        },
        emid:{
            type:String,
            require: [true, "please provide email"],
            unique: true,
            match: [
                //regular expression for email
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                , "Please provide a valid email"
            ]
        },
        pswd:{
            type:String,
            required: [true,"please add a password"],
            minlength: 6, 
            select: false //when query for user, pswrd wont be send unless we explicitly ask or it. 
        }
    },
    {timestamps: true}
);

// userSchema.pre("save", async function(next){
//     //true if pswrd is encrypted(modified)
//     if(!this.isModified("password")){
//         next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password,salt);
//     next();
// })

const User = mongoose.model("User",userSchema);

module.exports = User;