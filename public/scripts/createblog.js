

//create blog
l=document.querySelector("#page_status")
console.log('c')
const pageStatuss =document.querySelector("#page_status")
let successAlert=`<div class="alert  fixed-top alert-dismissible fade show" role="alert">
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
<strong>Blog Created !!! <a href="/blogs/detail/$["_id"]}"></strong><button class="btn btn-sm m-2 font-weight-normal " type="button">click here to view</button></a></strong> 

</div>
`




let  createForm=document.querySelector("#blog_c_form")
let createBtn=document.querySelector("#create_blog")

createForm.addEventListener("submit",(event)=>{
  event.preventDefault()
  formLoading(createBtn)
  var data=new FormData(createForm)
dataObject={}
data.forEach((ele,index)=>{
    dataObject[index] = ele
})

var formValidation=(data,formBtn)=>{
 let inputValues=Object.values(data);
 let errorArr=[]
 formBtn.removeAttribute("disabled")


 for (const key in data) {
    if(key =="blog_title" && data[key] =="")
    {
      errorArr.push("Blog title cannot be empty")
    }
      if(key =="blog_category" && data[key] =="")
    {
      errorArr.push("Blog category cannot be empty")
    }if(key =="blog_content" && data[key] =="")
    {
      errorArr.push("Blog content cannot be empty")
    }
 }

 //if error
 if(errorArr.length  !=0)
 {
   //show modal
   let count=0
      const doc=document.querySelector(".error_msg")
      const errorBox=document.querySelector("#error_box")
      let errorHtml=`<div class='filter_wrapper  justify-content-center'>`   
      errorArr.map(ele=>{
        count++
        errorHtml+=`<div class="d-block"><span class="badge badge-light m-2">${count}</span><strong class="text-left mb-1 font-weight-normal ">${ele}</strong>`

      })
      

      $("#myModal").modal("show")
      errorBox.innerHTML=errorHtml
return false
 }
 else{

   //call ajax request
return true
 }
}


var createBlogAjax=(url,data,formBtn)=>{

  $.ajax({
          url: url,
          type: "POST",
          data: data,
          success: function(result) {
            formBtn.removeAttribute("disabled")
           let object=JSON.parse(result)["data"]


            if(object)
            {
              cleanForm()
             const pageStatus =document.querySelector("#page_status")
             const pageStatuss =document.querySelector("#page_status")
             let successAlert=`<div class="alert m-1 fixed-top alert-dismissible fade show" role="alert">
             <button type="button" class="close" data-dismiss="alert" aria-label="Close">
               <span aria-hidden="true">&times;</span>
             </button>
             <strong>Blog Created !!! <a href="/blogs/detail/${object["_id"]}"></strong><button class="btn btn-sm m-2 font-weight-normal bg-light " type="button">click here to view</button></a></strong> 
             
             </div>
             `

            pageStatuss.classList.toggle("hide_box")
            pageStatuss.classList.remove("hide_box")
            
                     
            pageStatus.innerHTML=successAlert
            }
          },
          failure:function(err){
              console.log("create ajax errr",err)
          }

      });
  }
  
    

let formValid=formValidation(dataObject,createBtn)
if(formValid)
{
createBlogAjax("/blogs/create",dataObject,createBtn)
}


})
let blogTitle=document.querySelector("#blog_c_title")
let blogCategory=document.querySelector("#blog_c_category")
let blogContent=document.querySelector("#blog_c_content")

let blogTitleLength=document.querySelector("#blog_c_titleLength")
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
    inputField.setAttribute("maxLength",maxLimit)
    inputFiledLength.style.color="red"
  }
  else{
    inputFiledLength.style.color=""

  }

}



//form loading (btn)
let formLoading=(btn)=>{
  btn.setAttribute("disabled","true")
}

//clean form

let cleanForm=()=>{
let inputs=document.querySelectorAll("input[type='text']")
let content=document.querySelector("#blog_content")
console.log(inputs)
inputs.forEach((ele)=>{
  ele.value=""
})
}









