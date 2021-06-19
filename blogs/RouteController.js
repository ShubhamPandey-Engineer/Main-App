var express=require("express"),
app=express(),
{check,validationResult} =require("express-validator"),
jwt=require("jsonwebtoken"),
cookieParser=require("cookie-parser"),
bcrypt=require("bcrypt");

//import jwt token
require('dotenv').config();

//importing object schema and model
const blogModel=require("../models/blogmodel"),
userModel=require("../models/usermodel"),
restify=require("restify")
app.set("view engine","ejs");
var bodyParser=require("body-parser");
const { all } = require("async");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.json())
app.use(cookieParser())
var connectDB=require("../operation/connectDB");
const { json } = require("body-parser");
connectDB()


//HomePage middleware
exports.HomePage=async (req,res)=>
{

try{

await  blogModel.find({},(err,blogs)=>{
if(err)
{
console.log(err)
}
else{
res.render("blogs",{blogs:blogs,data:res.user})
}
}).limit(-6).sort({"createdAt":-1})
}

catch(err){
res.render("404")
}



}

//function to get user liked blog
exports.likedBlog=async (req,res,next)=>{
try{
let blogs=await (await blogModel.find({"likedBy.id":res.user._id},{"_id":1}))
console.log(blogs)
res.send(JSON.stringify({"likedBlogs":blogs}))
}
catch(err){
console.log("error",err)
}

}



//Like a blog

//Like a Blog

exports.likeBlog= async(req,res)=>
{   
console.log("likkekeekek")
try{
await blogModel.findOne({_id:req.params.blogid},(err,blog)=>{
blog.likes++;
blog.save();
res.send(blog.likes.toString())
})

blogModel.updateOne({_id:req.params.blogid},{
$push:{
likedBy:{id:res.user._id}
}
},(err,blog)=>{
console.log("liked",blog)
})

}
catch(err){
console.log(err)
}

}




//remove a like
exports.unlikeBlog=async(req,res)=>
{   
try{
blogModel.findOneAndUpdate({_id:req.params.blogid},{$pull:{likedBy:{id:res.user._id}}},(err,blog)=>{

blog.likes--
blog.save()
res.send(blog.likes.toString())


})
}
catch(err){
console.log(err)  
}
}



//CreatePage middleware
exports.CreateBlog=(req,res,next)=>{
res.render("create",{data:res.user})

}

//CreatePage POST middleware
exports.CreateBlogPost=(
async (req,res)=>{
console.log("mk")
const title= req.body.blog_title
const category= req.body.blog_category
const content= req.body.blog_content
console.log(title)
try{
await blogModel.create({
title:req.body.blog_title,
category:req.body.blog_category,
content:req.body.blog_content,
createdBy:res.user._id
},(err,blog)=>{
if(err)
{
console.log(err)
res.send(JSON.stringify({"error":err}))

//  res.send(err)
}
else{
res.send(JSON.stringify({"data":blog}))

}
})
}
catch(err){
res.send(err)
console.log("could not create the new post")
}


})


//DeatailPage middleware
exports.DetailPage=async(req,res)=>{

//Blog detail
const blogId=req.params.id;
//get the specfic blog 
try{

var myblog=await blogModel.findById(blogId,(err,blog)=>{
console.log(blog)
res.render("Detail",{blog:blog,data:res.user})
})
}
catch(err){
console.log("could not get detail route")
}

}



//EditPage middleware
exports.EditPage=async(req,res)=>{
try{

await blogModel.findById(req.params.id,(err,myblog)=>{

if(!err)
{

res.render("edit",{blog:myblog,data:res.user})

}
})
}
catch(err){
console.log('cannot find the post for edit')
}
}


//Edit Route -POST
exports.UpdateBlog=async (req,res,next)=>{

//Edit  blog-Post
console.log(res.user)
try{
let blogUpdate={
title:req.body.blog_title,
category:req.body.blog_category,
content:req.body.blog_content
}
await  blogModel.findByIdAndUpdate(req.params.id,blogUpdate,(err,updatedBlog)=>{
if(!err)
{
res.redirect("/");
}
else{
res.redirect("blog/:req.params.id/edit")
}
})
}
catch(err){
console.log('cannot update the post')
}
}

//Delete Route 

exports.DeleteBlog=async (req,res,next)=>{
try{
await blogModel.findByIdAndDelete(req.params.id,(err)=>{
if(!err)
{
//  res.redirect("/blog/Allblogs")
res.send("Post Delete !!!")
}
else{
res.send("Cannot delete the respective post")
}
})
}
catch(err){
console.log('cannot delete the post')
}

}

//Auth middleware
exports.AuthUser=(req,res,next)=>{   
res.render("user/auth")
}

//Auth- SignUp

exports.SignUp=(
[
check("userName").notEmpty().withMessage("Username cannot be empty"),
check("userEmail").isEmail().withMessage("Please enter valid email"),
check("userPassword").notEmpty().withMessage("Userpassword cannot be empty").isLength({min:6}).withMessage("Password is too small")
]
, async (req, res) => {

console.log("dcdc")
//signup form errors
const errors=validationResult(req)
console.log(errors)
let response={}
let status=false
response.errors=errors
response.status=status
const userExists=await userModel.findOne({userEmail:req.body.userEmail})
console.log(errors)
if(userExists) errors["errors"].push({msg:"User already exists!!!"})

if(!errors.isEmpty()) return res.json(response)




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
res.json(response)
}
else{
console.log(err)
res.json(response)   

}
})
console.log(hash)
})
.catch(err=>{
console.log('hash not created')
})

})


//SignIn middleware
exports.SignIn=(
[check("email").notEmpty().withMessage("Useremail cannot be empty").isEmail().withMessage("Please enter valid email"),
check("password").notEmpty().withMessage("User Password cannot be empty")],

//validate signup form
async (req, res) => {
let status=false
//sigin form errors
let response={
}
response.status=status
let errors =validationResult(req)
response.errors=errors
console.log('err',req.body)


//empty input fields
if(!errors.isEmpty())

{ 
return res.send(JSON.stringify({"errors":response["errors"]["errors"]}))
}

//check user exitence in DB
let user=await userModel.findOne({userEmail:req.body.email},{userPassword:-1})
let error=[]
if(!user){
errors["errors"].push({msg:"Invalid email"})
return res.send(JSON.stringify({"errors":response["errors"]["errors"]}))
}

//check password
let unhash=await bcrypt.compare(req.body.password,user.userPassword)
if(!unhash) {
errors["errors"].push({msg:"Invalid password"})
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




//Filter middleware

//Filter blogs-show checkboxes
exports.catergoryFilter= async(req,res)=>{
let filterType=req.params.type
try{
let blogs  =await blogModel.distinct("category")
res.send(JSON.stringify({blogs}))
}
catch(err){
console.log("filter not working")
}
}


//Sort middleware
exports.sorting =async (req,res)=>{
let sortType=req.params.type
obj=JSON.parse(sortType)
if(obj["data"].length == 0)
{
try{
let blogs=await blogModel.find()
res.send(JSON.stringify({blogs}))
}
catch(err){
console.log("sort not worked")
}

}
else{
let blogs=await blogModel.find({category:obj["data"]})
res.send(JSON.stringify({blogs}))
}
}


//middleware for handling error
exports.errorPage=async(req,res)=>{
res.render("404")
}




//request stored cookies
exports.cook =(req,res)=>{
res.send(req.cookies)
}


//Logout middleware
exports.Logout=(req,res,next)=>{
//clear cookies
res.clearCookie("token")
res.redirect("/blogs")
}








