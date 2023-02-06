const mongoose = require('mongoose')

const { Schema, model } = mongoose

let orderSchema = new Schema({
    customerName:{type:String, required:true},
    productName:{type:String, required:true},
    quantity:{type:String, required:true},
    cost:{type:Number, required:true}
}) 

const OrderModel = model('order',orderSchema)

module.exports = OrderModel

