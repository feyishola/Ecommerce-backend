const ProductModel = require('../model/product.model')

class ProductDao{

    async createProduct(productName,productQuantity,productCategory,productAvalability,productAmount,productImage){
        let newProduct = new ProductModel({
            productName,
            productQuantity,
            productCategory,
            productAvalability,
            productAmount,
            productImage
        })

        let result = await newProduct.save()
        return result;
    }

    async getAllProducts(){
        let result = await ProductModel.find()
        return result;
    }

    async getProduct(id){
        let result = await ProductModel.findById(id)
        return result;
    }

    async updateProduct(id,productQuantity,productAvalability,productAmount){
        let result = await ProductModel.findByIdAndUpdate({_id:id}, {$set:{productQuantity,productAvalability,productAmount}})
        return result;
    }

    async deleteProduct(id){
        let result = await ProductModel.findByIdAndDelete(id)
        return result;
    }
}

module.exports = new ProductDao()