function auth(userCatArray){
    return(req,res,next)=>{
        if(req.user.userCategory){
            const category = 'admin' 
            if(!userCatArray.includes(category) || req.user.userCategory === 'admin'){
              return  next()
            }else{
               return res.status(403).json({response:"false", message:"sorry u dont have the required permission to dis route"})
            }
    
        }else{
            return res.status(403).json({response:"false", message:"invalid entry"})
        }
    }
}

module.exports = auth