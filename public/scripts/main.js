console.log('js connected')
//Submit new blog
$("#create_blog").on("click",(event)=>{
   // event.preventDefault();
    $("#blog_success").css("display","block")
setTimeout(()=>{
$("#blog_success").hide();
},1500)

})
$(".blog_like").on("click", async function(event)
{
  let id= await $(this).attr("data-blogid")
  

$.ajax({
    url:`/blog/like/${id}`,
    method:"POST",
    success:function(totalLikes){
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
})

