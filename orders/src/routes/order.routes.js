const {Router} = require('express')
const OrderDAO = require('../dao/order.dao')
const authentication = require("../middleware/verifytoken")
const authorization = require("../middleware/auth")

const api = Router()

module.exports = ()=>{

    api.get('/', [authentication, authorization(['admin'])], async (req,res)=>{
        try {
            let response = await OrderDAO.getAllOrders()
            res.status(200).json({response:'ok', payload:response})
        } catch (error) {
            res.status(500).json({response:'false', payload:error.message})
        }
    });

    api.get('/:id', [authentication, authorization(['customer'])], async (req,res)=>{
        let id = req.params.id
        try {
            let response = await OrderDAO.getOrder(id)
            res.status(200).json({response:'ok', payload:response})
        } catch (error) {
            res.status(500).json({response:'false', payload:error.message})
        }
    });

    api.post('/', [authentication, authorization(['customer'])], async (req,res)=>{
        const {customerName,productName,quantity,cost} = req.body
        try {
            let response = await OrderDAO.createOrder(customerName,productName,quantity,cost)
            res.status(200).json({response:'ok', payload:response})
        } catch (error) {
            res.status(500).json({response:'false', payload:error.message})
        }
        
    })

    api.put('/:id', [authentication, authorization(['customer'])], async (req,res)=>{
        const id = req.params.id;
        const {quantity,cost} = req.body
        try {
            let response = await OrderDAO.updateOrder(id,quantity,cost)
            res.status(200).json({response:"ok", payload:response})
        } catch (error) {
            res.status(500).json({response:'false', payload:error.message})
        }
        
    });

    api.delete('/:id', [authentication, authorization(['admin'])], async (req,res)=>{
        const id = req.params.id

        try {
            let response = await OrderDAO.deleteOrder(id)
            res.status(200).json({response:"ok", payload:response})
        } catch (error) {
            res.status(500).json({response:'false', payload:error.message})
        }
    })


    return api;
}