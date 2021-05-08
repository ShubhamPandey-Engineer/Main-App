
  
//get user liked blogs
console.log("d")
let blogLiked=async ()=>{
    $.ajax({
     url:"/blogs/likedblogs",
     method:"POST",
     success:function(blogs){
       var obj=JSON.parse(blogs)
       changeIcon(obj)
    obj["likedBlogs"].forEach((ele)=>{
      console.log(ele)
     })
     },
     failure:function(err){
       console.log('cannot connect ',err)
     }
   
    }) 
  
   }
   blogLiked()
  
  
  let changeIcon=(data)=>{
    //all like icons
    let likeIcon=document.querySelectorAll(".blog_like_icon")
  
    //blog id array
    let idArr=[]
    likeIcon.forEach((icon)=>{
      
      const iconId=icon.parentElement.getAttribute("data-blogid")
      idArr.push(iconId)
  
    })
  
    likeIcon.forEach(icon=>{
      data["likedBlogs"].filter(function(blog){
        if(blog._id == icon.parentElement.getAttribute("data-blogid"))
        {
      
       icon.classList.remove("not_liked")
      icon.classList.add("liked")
        }
      })
    })
  
  
  
  }
  
  
    