const OrderModel = require('../model/order.model')

class OrderDAO{

    async createOrder(customerName,productName,quantity,cost){
        let newOrder = new OrderModel({
            customerName,
            productName,
            quantity,
            cost
        })

        let response = await newOrder.save()
        return response;
    }

    async getAllOrders(){
        let result = await OrderModel.find()
        return result;
    }

    async getOrder(id){
        let result = await OrderModel.findById(id)
        return result;
    }

    async updateOrder(id,quantity,cost){
        let result = await OrderModel.findByIdAndUpdate({_id:id}, {$set:{quantity,cost}})
        return result;
    }

    async deleteOrder(id){
        let result = await OrderModel.findByIdAndDelete(id)
        return result;
    }
}

module.exports = new OrderDAO()