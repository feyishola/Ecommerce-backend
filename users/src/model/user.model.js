const mongoose = require('mongoose')

const { Schema, model} = mongoose

const userSchema = new Schema({
    userName:{type:String, required:true},
    userCategory:{type: String, enum:["admin", "customer"], default:"customer", required:true},
    password:{type:String, required:true},
    email:{type:String, required:true}
})

const userModel = model("users",userSchema)

module.exports = userModel