

const deleteTitle=document.querySelector("#delete_title")
const deleteConfirm=document.querySelector("#delete_confirm")
deleteConfirm.setAttribute("disabled",true)
const originalTitle=deleteConfirm.getAttribute("data-blogtitle").trimEnd()
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
  url:`/blogs/delete/${id}`,
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

