const mongoose = require('mongoose') 

const { Schema, model } = mongoose

const productSchema = new Schema({
    productName:{type:String, required:true},
    productQuantity:{type:Number, required:true},
    productCategory:{type:String, required:true},
    productAmount:{type:Number, required:true},
    productImage:{type:String}
})

const ProductModel = model('products',productSchema)

module.exports = ProductModel