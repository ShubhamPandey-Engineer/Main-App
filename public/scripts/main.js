console.log('js connected')
let pageTitle=document.title


//Home

if(pageTitle == "Home")
{

//Filter function

const filterBtn=document.querySelector("#filter_btn")
const filterBox=document.querySelector("#filter_box")
const hideFilter=document.querySelector("#hide_filter")

const filterData=document.querySelector("#filter_data")

hideFilter.addEventListener("click",()=>{
  $("#filter_box").fadeIn(300)

  filterBox.classList.add("hide_box")

})


filterBtn.addEventListener("click",(event)=>{
//call api
let filter=`<div class='filter_wrapper p-2 justify-content-center'><label class=" text-center w-100  mb-1 font-weight-bold text-white">Categories:</label>`
//get all blog category
fetch(`/blog/filter`,{method:"GET",headers:{"Content-Type":"application/json"}})
.then(json=>json.json())
.then(category=>{
  category["blogs"].forEach(ele=>{
   filter+=`<div><label class="d-block p-2 filter_parent "> <input type="checkbox" name="cat" value='${ele}' class="filter_choice form-check-input ml-2"><label class="text" for="cat">${ele}</label></label></div>`
  })
filter+=`</div>`
  filterBox.classList.remove("hide_box")
  filterData.innerHTML=filter

})

})


const showResult=document.querySelector("#show_result")
showResult.addEventListener("click",(event)=>{
  let arr=[]

  filterBox.classList.add("hide_box")

let checkBoxes=document.querySelectorAll(".filter_choice")
checkBoxes.forEach((ele)=>{
  if(ele.checked)
  {
   arr.push(ele.value)

}

})
obj={
  data:arr
}
renderResult(JSON.stringify(obj))

})


let renderResult=(value)=>{
  let  blogsRow=document.querySelector("#blogs_row")
  let blogs=fetch(`/blog/sort/${value}`,{method:"GET",headers:{"Content-Type":"application/json"}})
  let blog =`<div class="w-100  justify-content-center row  m-1" id="blogs_row"> `

 blogsRow.innerHTML='<strong class="p-2 text-primary">Loading ...</strong>'

 setTimeout(()=>{
  
  blogs.then(d=>d.json()).then(data=>{
    console.log(data)
      data["blogs"].forEach(element => {
    
     blog+=`
       <div class="card  m-3 p-4  col-md-4">
  <div class="card-header text-center blog_title  font-weight-bold">${element.title}</div>
  <div class="card-body p-0">
      <input type="text" class="blog_id" hidden value="${element._id}">
    <label class="card-title d-block text-center m-1 blog_category ">${element.category}</label>
  <div class="d-flex justify-content-center">  <label  class="blog_likes card-title d-block text-center m-1">${element.likes}  </label><i class="fa fa-thumbs-up text-primary m-2" aria-hidden="true"></i></div>
  </div>
  <div class="d-flex justify-content-center  p-2" >
  <a  data-toogle="tooltip" title="View this blog" href="/blog/${element._id}"><button  style="width: 38px;height: 38px;" class="btn btn-md btn-dark m-2"><i class="fa fa-external-link" aria-hidden="true"></i>
  </button></a>
  <button type="button" data-toogle="tooltip"  title="Like this blog!!!"  style="color:#FFF;width: 38px;height: 38px;" class=" btn-primary blog_like btn  btn-md m-2" data-blogid="${element._id}"><i class="fa fa-thumbs-up" aria-hidden="true"></i>
  </button>
  </div>
  <label class="card-title blog_date  d-block">${element.createdAt.toString().substring(0,15)}</label>

</div>`
      blogsRow.innerHTML =blog

    })

    blog+=`</div>`




  })
},600)
}
let showFilterResult=()=>{

}






 function getSortValue(value){
   let data={
     sortValue:value
   }
   let  blogsRow=document.querySelector("#blogs_row")
   let blogs=fetch(`/blog/sort/${value}`,{method:"GET",headers:{"Content-Type":"application/text"}})
 

 }

}



//create blog


if(pageTitle == 'Create')
{
  
let blogTitle=document.querySelector("#blog_c_title")
let blogCategory=document.querySelector("#blog_c_category")
let blogContent=document.querySelector("#blog_c_content")

let blogTitleLength=document.querySelector("#blog_c_titleLength")
let blogCategoryLength=document.querySelector("#blog_c_categoryLength")

//on form submission


  
   
 

/*
let  createForm=document.querySelector("#create_blog")
console.log(createForm)
createForm.addEventListener("click",(event)=>{
  console.log("btn")
  let ele= document.querySelectorAll(".form-control") 
console.log(ele)
  ele.forEach((ele)=>{
    if(ele.value =="")
    {
      console.log(this)
      ele.focus()
    }

  })

})
*/
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



}



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