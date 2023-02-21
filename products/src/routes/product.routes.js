const ProductDao = require('../dao/product.dao')
const {Router} = require('express')
const authentication = require("../middleware/verifytoken")
const authorization = require("../middleware/auth")

module.exports = ()=>{
    const api = Router()

    api.get('/', [authentication, authorization(['customer'])], async (req,res)=>{
        try {
            let response = await ProductDao.getAllProducts()
            res.status(200).json({response:"ok",payload:response})
        } catch (error) {
            res.status(500).json({response:"false", payload:error.message})
        }
        
    })

    api.get('/:id', [authentication, authorization(['customer'])], async (req,res)=>{
        let id = req.params.id;
        try {
            let response = await ProductDao.getProduct(id)
            res.status(200).json({response:"ok", payload:response})
        } catch (error) {
            res.status(500).json({response:"false", payload:error.message})
        }
    })

    api.post('/', [authentication, authorization(['admin'])], async (req,res)=>{
        const {productName,productQuantity,productCategory,productAmount,productImage} = req.body
        try {
            console.log(req.body);
            let response = await ProductDao.createProduct(productName,productQuantity,productCategory,productAmount,productImage)
            res.status(200).json({response:"ok", payload:response})
        } catch (error) {
            res.status(500).json({response:"false", payload:error.message})
        }
    })

    api.put('/:id', [authentication, authorization(['admin'])], async (req,res)=>{
        let id = req.params.id
        const {productQuantity,productAmount} = req.body
        
            try {
                let response = await ProductDao.updateProduct(id,productQuantity,productAmount)
                res.status(200).json({response:"ok", payload:response})
            } catch (error) {
                res.status(500).json({response:"false", payload:error.message})
            }
        
    })

    api.delete('/:id', [authentication, authorization(['admin'])], async (req,res)=>{
        const id = req.params.id
        try {
            let response = await ProductDao.deleteProduct(id)
            res.status(200).json({response:"ok", payload:"Product deleted"})
        } catch (error) {
            res.status(500).json({response:"false", payload:error.message})
        }
    })

    return api;
}