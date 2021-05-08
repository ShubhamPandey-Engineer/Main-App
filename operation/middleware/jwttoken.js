const jwt=require("jsonwebtoken")


var createToken=()=>{
    const token=jwt.sign({id:user._id},process.env.secret,{expiresIn:process.env.token_expires})
    return token
}

module.exports=createToken

