console.log("like / dislike")

let status=document.querySelector("#page_status")

//checkCookiees

function checkCookiees()
 {
    if(!document.cookie)
    {
      status.innerHTML=`  <div class="alert  fixed-top alert-dismissible fade show  " role="alert">
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
  <strong>Please SignIn to continue <a href="blogs/user/auth"><button class="btn btn-md btn-light " type="button">SignIn here</button></a> </strong> 
</div>`
status.classList.toggle("hide_box")
      return false
      //  document.location.href="/blogs/user/auth"
    }
    else{
        return true
    }

}


//user like/dislike action
let likeOrDislike=(event)=>{

    //if user authenticate
    if(checkCookiees())
    {
    const blogId=event.parentElement.getAttribute("data-blogid")
    let iconThumb=event.parentNode.parentNode.parentNode.querySelector(".likes_icon")
  
  
  
    //already liked
    if(event.classList.contains("liked"))
    {
  //call unlike request
  handleUnlikes(blogId,event,iconThumb)
    }
  
    //like blog
    else{
      handleLikes(blogId,event,iconThumb)
    }
  
  }
  
  }
  
  //unlike blog
  let handleLikes=(blogId,event,iconThumb)=>{
  
    //scale icon
    iconThumb.classList.add("scale")
  
     //add .likes and .not_liked
     event.classList.toggle("liked")
     event.classList.remove("not_liked")
     
     //call ajaz (like)
     let url =`blogs/like/${blogId}`
  
     likeDisAjax(url,blogId,event)
    
  }
  let handleUnlikes =(blogId,event,iconThumb)=> {
  
  iconThumb.classList.remove("scale")
    event.classList.remove("liked")
    event.classList.toggle("not_liked")
    
  
    //call ajax
    const url =`blogs/unlike/${blogId}`
    likeDisAjax(url,blogId,event)
  }
  
  
  
  //Ajax call for like or dislike
  let likeDisAjax=(url,blogId,event)=>{
  console.log(url)
    $.ajax({
      url:url,
      headers: { "Content-Type" : "application/json" },
      method:"POST",
      success:function(totalLikes){
     event.parentNode.parentNode.parentNode.children[1].querySelector(".blog_likes").textContent=totalLikes
      },
      failure:function(err){
        console.log("like/dislike ajax errr",err,url)
      }
      })
  
  
  }
  
  