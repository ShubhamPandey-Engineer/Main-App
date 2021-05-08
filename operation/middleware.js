
//check if user authorize
cookieParser=require("cookie-parser"),
session=require("express-session"),
jwt=require("jsonwebtoken"),
cookieParser=require("cookie-parser"),
bcrypt=require("bcrypt");
var userModel = require("../models/usermodel")

//middlewares
function isAuthenticated(req,res,next)
{
   const userToken= req.cookies.token
   console.log("User token",userToken)
   if(userToken)
   {
       //verfiy token
       const validToken=jwt.verify(userToken,process.env.secret)
       if(validToken) return next()

           //invalid token
           return res.redirect("/blogs/user/auth")
   }
   else{
    console.log("user not loggedin")

    return res.render("user/auth")
}

}


//logged in user data
async function userData   (req,res,next){

    let token=req.cookies.token
   // console.log("s",token)
    if(token)
    {
    const validToken=jwt.verify(token,process.env.secret)
    await userModel.findOne({_id:validToken.id},{userName:1,userEmail:1},(err,user)=>{
    res.user=user
    console.log(res.user)
    next()
    
    })
}
else{
    console.log("user not loggedin")
    next()
}
    
    }
    
module.exports={isAuthenticated,userData}
