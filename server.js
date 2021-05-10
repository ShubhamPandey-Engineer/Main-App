var express=require("express"),
app=express(),
{check,validationResult} =require("express-validator"),
jwt=require("jsonwebtoken"),
cookieParser=require("cookie-parser"),
bcrypt=require("bcrypt");


//importing middlewares
const{isAuthenticated,userData}=require("./operation/middleware")
console.log(isAuthenticated)



//import jwt token
const createToken=require("./operation/middleware/jwttoken")

require('dotenv').config();
//importing object schema and model
const model=require("./models/blogmodel"),
userModel=require("./models/usermodel"),
restify=require("restify")
app.set("view engine","ejs");
var bodyParser=require("body-parser");
/*
app.use(session({
    secret: 'djhxcvxfgshajfgjhgsjhfgsakjeauytsdfy',
    resave: false,
    saveUninitialized: true
    }));
    */
const { all } = require("async");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'));
const { schema, create } = require("./models/blogmodel");

    

const router=require("./blogs/Routes")



model.remove({},(err)=>{
    console.log(err)
})
//home route---------------
app.use("/",router)


//router for  blogs route-----------------------
app.use("/blogs" ,router)


//Post request handler -----------------------------

//POST -Signup
app.post('/blog/signup'
,
//validate signup form
[
check("userName").notEmpty().withMessage("Username cannot be empty"),
check("userEmail").isEmail().withMessage("Please enter valid email"),
check("userPassword").notEmpty().withMessage("Userpassword cannot be empty").isLength({min:6}).withMessage("Password is too small")
]
, async (req, res) => {

console.log(req.body)
    //signup form errors
    const errors=validationResult(req)
console.log(errors)
let response={}
let status=false
response.errors=errors
response.status=status
    const userExists=await userModel.findOne({userEmail:req.body.userEmail})
    if(userExists) errors["errors"].push({msg:"User already exists!!!"})

    if(!errors.isEmpty()) return res.send(JSON.stringify({"errors":errors["errors"]}))
   
   
    

    //valid form data
    //form data
    const{userName,userEmail,userPassword}=req.body
    const hashPassword=await bcrypt.hash(userPassword,10).then(hash=>{

    //enter user to DB
   userModel.create({
    userName:userName,
    userEmail:userEmail,
    userPassword:hash
     },(err,newUser)=>{

    if(!err){
        console.log("user inserted")
        status=true
        res.send(JSON.stringify({"success":newUser}))
    }
    else{  
        res.send(JSON.stringify({"errors":"Try again"}))

    }
})
    })
    .catch(err=>{
        console.log('hash not created')
    })

})





//user Signin POT request
app.post('/blog/signin',[check("email").notEmpty().withMessage("Useremail cannot be empty").isEmail().withMessage("Please enter valid email"),

check("password").notEmpty().withMessage("User Password cannot be empty")],
//validate signin form
 async (req, res) => {
    let status=false
    //sigin form errors
    let response={
    }
    response.status=status
  let errors =validationResult(req)
  response.errors=errors

 
//empty input fields
    if(!errors.isEmpty()) return res.send(JSON.stringify({"errors":response["errors"]["errors"]}))

    //check user exitence in DB
    let user=await userModel.findOne({userEmail:req.body.email},{userPassword:-1})
    let error=[]
    if(!user){
        errors["errors"].push({msg:"Invalid email or password"})
        return res.send(JSON.stringify({"errors":response["errors"]["errors"]}))
    }

    //check password
    let unhash=await bcrypt.compare(req.body.password,user.userPassword)
    if(!unhash) {
        errors["errors"].push({msg:"Invalid email or password"})
    //  return   res.json(response)
    return res.send(JSON.stringify({"errors":response["errors"]["errors"]}))

    }

    //user Authenticated
    //create and assign jwt token
    const token=jwt.sign({id:user._id},process.env.secret,{expiresIn:process.env.token_expires})
    const cook={

        "token":token,secure:false,httpOnly:true,status:status
               }
        
      if(token) 
      {   response.status=true
        //  response.cookie=cook

          res.send(JSON.stringify({"token":cook["token"]}))

      }
        console.log(token)
    


    })

        
app.get("*",(req,res)=>{
    res.render("404")
})


const hostname='0.0.0.0'
app.listen(process.env.PORT || 3000,hostname,(err)=>{
    if(!err)
    {
        console.log("server is fine!!!");
        }
})