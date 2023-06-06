const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    user: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
    role:{type:String, required:true, default:"admin"}
})

const user = mongoose.model("users", userSchema)

module.exports = user;