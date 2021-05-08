const express=require("express")
const router=express.Router();
const {isAuthenticated,userData}=require("../operation/middleware")
//import blogs/ controller
var operation=require("./RouteController")


//Home Route -GET
router.route("/")
.get(userData,operation.HomePage)


router.route("/test")
.post(userData,operation.HomePage)

//get user liked blogs
router.route("/likedblogs").post(userData,operation.likedBlog)



//Like blog
router.route("/like/:blogid")
.post(isAuthenticated,userData,operation.likeBlog)



//Unlike blog

router.route("/unlike/:blogid")
.post(isAuthenticated,userData,operation.unlikeBlog)

//Create Route-GET
router.route("/create")
.get(isAuthenticated,userData,operation.CreateBlog)

//Create Route-POST
router.route("/create")
.post(isAuthenticated,userData,operation.CreateBlogPost)


//Detail Route -GET
router.route("/detail/:id")
.get( userData,operation.DetailPage)


router.route("/delete/:id")
.post(isAuthenticated,operation.DeleteBlog)
//Edit Route -GET

router.route("/edit/:id")
.get(isAuthenticated,userData,operation.EditPage)


router.route("/edit/:id")
.post(isAuthenticated,userData,operation.UpdateBlog)



/////////// filter routes
router.route("/filter")
.get(operation.catergoryFilter)


/////////// sorting routes
router.route("/sort/:type")
.get(operation.sorting)



//////////AUTH routes

router.route("/auth")
.get(isAuthenticated,userData, operation.AuthUser)

//Signup
router.route("/user/signup")
.post(operation.SignUp)

//SignIn
router.route("/user/signin")
.post(operation.SignIn)

router.route("/cook/get").get(operation.cook)

//Logout route
router.route("/user/logout").get(operation.Logout)




///Error route 
router.route("").get(operation.errorPage)

module.exports=router