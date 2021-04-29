console.log('js connected')
let pageTitle=document.title





//create blog


if(pageTitle == 'Create')
{
  
let blogTitle=document.querySelector("#blog_c_title")
let blogTitleLength=document.querySelector("#blog_c_titleLength")
let blogCategory=document.querySelector("#blog_c_category")
let blogCategoryLength=document.querySelector("#blog_c_categoryLength")

blogTitle.addEventListener("input",()=>{
  inputLimit(blogTitle,blogTitleLength,40)
  
})

blogCategory.addEventListener("input",()=>{
  inputLimit(blogCategory,blogCategoryLength,15)

})



var inputLimit=(inputField,inputFiledLength,maxLimit)=>{
    
  inputFiledLength.textContent=inputField.value.length
  if(inputField.value.length == maxLimit)
  {
    inputFiledLength.style.color="red"
  }
  else{
    inputFiledLength.style.color=""

  }

}



}

//Submit new blog
$("#create_blog").on("click",(event)=>{
   // event.preventDefault();
    $("#blog_success").css("display","block")
setTimeout(()=>{
$("#blog_success").hide();
},1500)

})


$(".blog_like").on("click",(event)=>{
{

  event.stopPropagation()
  let id= event.currentTarget.getAttribute("data-blogid")

$.ajax({
    url:`/blog/like/${id}`,
    method:"POST",
    success:function(totalLikes){
   
      event.stopPropagation()

    event.target.parentNode.parentNode.parentNode.children[1].querySelector(".blog_likes").textContent=totalLikes
        const successContent=`<div style="position:fixed;top:15vh;z-index:1;left: 0;right: 0;text-align:center"  class="alert alert-danger  m-auto alert-dismissible fade show m-0" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        </button>
        <strong class="text-center">Post Liked !!! <i class="fa fa-heart" aria-hidden="true"></i>
        </strong> 
      </div>`;
    $("#blog_status").show()

    
     $("#blog_status").html(successContent)
     setTimeout(()=>{
 $("#blog_status").hide()
      },2000)
    }
})
}
})



//Delete blog



if(pageTitle == 'Detail')
{

const deleteTitle=document.querySelector("#delete_title")
const deleteConfirm=document.querySelector("#delete_confirm")
deleteConfirm.setAttribute("disabled",true)
const originalTitle=deleteConfirm.getAttribute("data-blogtitle")
const id=deleteConfirm.getAttribute("data-blogid")



deleteTitle.addEventListener("input",(event)=>{


if(originalTitle == deleteTitle.value){
  deleteConfirm.removeAttribute("disabled")

}
else{
  deleteConfirm.setAttribute("disabled",true)

}

})

deleteConfirm.addEventListener("click",(event)=>{
console.log(originalTitle,deleteTitle)
if(deleteTitle.value == originalTitle)
{
$.ajax({
  url:`/blog/delete/${id}`,
  method:"POST",
  success:function(mess){
console.log(mess)
window.location.href="/"
},
failure:function(){
  console.log('blog not deleted')
}
})
}
else{
  console.log('no delete operation')
}
})

}