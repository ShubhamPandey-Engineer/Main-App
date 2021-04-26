console.log('js connected')
//Submit new blog
$("#create_blog").on("click",(event)=>{
   // event.preventDefault();
    $("#blog_success").css("display","block")
setTimeout(()=>{
$("#blog_success").hide();
},1500)

})
$(".blog_like").on("click",function(event)
{
    
let id=$(this).attr("data-blogid")
  
$.ajax({
    url:`/blog/like/${id}`,
    method:"POST",
    success:function(data){
        const htmlCont=` <div style="position:absolute;z-index:1"  class="alert alert-danger  w-75 alert-dismissible fade show" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <strong>Blog Post liked!!!</strong> 
      </div>`;
      $("#blog_status").html(htmlCont)
      setTimeout(()=>{
 $("#blog_status").fadeOut()
      },1500)
    }
})
})

