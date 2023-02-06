const userModel = require('../model/user.model')

class UserDao{

   async createUser(userName,userCategory,password,email){
        const newUser = new userModel({
            userName,
            userCategory,
            password,
            email
        })
        
        let result = await newUser.save()
        return result;
    }

    async getUser(id){
        let result = await userModel.findById(id)
        return result;
    }

    async getAllUsers(){
        let result = await userModel.find()
        return result;
    }

    async updateUser(id,userName,password){
        let result = await userModel.findByIdAndUpdate({_id:id},{$set:{userName,password}})
        return result;
    }

    async checkUser(email){
        let result = await userModel.findOne({email})
        return result
    }

    async deleteUser(id){
        let result = await userModel.findByIdAndDelete(id)
        return result;
    }

    login(userName,password){
        let result = userModel.find()
    }
}

module.exports = new UserDao()