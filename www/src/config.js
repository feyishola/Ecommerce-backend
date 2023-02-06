const {ORDER,PRODUCT,USER} = process.env
module.exports = {
    baseUrl:{
        order:ORDER || "http://localhost:3000/" ,
        product: PRODUCT || "http://localhost:3001/",
        user: USER || "http://localhost:3003/"
    }
}