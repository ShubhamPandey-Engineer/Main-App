
console.log('Filter connected')


//Filter function

const filterBtn=document.querySelector("#filter_btn")
const filterBox=document.querySelector("#filter_box")
const hideFilter=document.querySelector("#hide_filter")
let  blogsRow=document.querySelector("#blogs_row")

const filterData=document.querySelector("#filter_data")

hideFilter.addEventListener("click",()=>{
  $("#filter_box").fadeIn(300)
  blogsRow.classList.remove("blur")

  filterBox.classList.add("hide_box")

})


filterBtn.addEventListener("click",(event)=>{
//call api

let filter=`<div class='filter_wrapper p-2 justify-content-center'><label class=" text-center w-100 filter_category  mb-1 font-weight-bold text-white">Categories:</label>`
//get all blog category
fetch(`/blogs/filter`,{method:"GET",headers:{"Content-Type":"application/json"}})
.then(json=>json.json())
.then(category=>{
  category["blogs"].forEach(ele=>{
   filter+=`<div>
   <label class="d-block p-2 filter_parent">
   <label class="text mb-0" for='${ele}'>
   <input type="checkbox" name="list"   id="${ele}" value='${ele}' class=" filter_choice form-check-input ">${ele}</label>
   
    </label></div>`
  })
filter+=`</div>`
  filterBox.classList.remove("hide_box")
blogsRow.classList.add("blur")
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
  let blogs=fetch(`/blogs/sort/${value}`,{method:"GET",headers:{"Content-Type":"application/json"}})
  let blog =`<div class="container-fluid">
  <div class=" justify-content-between row" id="blogs_row"> `

 blogsRow.innerHTML='<strong class="p-2 text-primary">Loading ...</strong>'

 setTimeout(()=>{
  blogsRow.classList.remove("blur")

  blogs.then(d=>d.json()).then(data=>{
    console.log(data)
      data["blogs"].forEach(element => {
    
     blog+=`
       <div class="card  m-3 p-4  col-md-3">
  <div class="card-header text-center blog_title  font-weight-bold">${element.title}</div>
  <div class="card-body p-0">
      <input type="text" class="blog_id" hidden value="${element._id}">
    <label class="card-title d-block text-center m-1 blog_category ">${element.category}</label>
  <div class="d-flex justify-content-center">  <label  class="blog_likes card-title d-block text-center m-1">${element.likes}  </label><i class="fa fa-thumbs-up text-primary m-2 likes_icon" aria-hidden="true"></i></div>
  </div>
  <div class="d-flex justify-content-center  p-2" >
  <a  data-toogle="tooltip" title="View this blog" href="/blogs/detail/${element._id}"><button  style="width: 38px;height: 38px;" class="btn btn-md  blog_visit m-2"><i class="fa fa-external-link" aria-hidden="true"></i>
  </button></a>
  <button type="button" data-toogle="tooltip"   title="Like this blog!!!"  style="color:#FFF;width: 38px;height: 38px;" class=" blog_like btn  btn-md m-2" data-blogid="<%= ele._id %>">
  <i class="border-primary fa fa-thumbs-up blog_like_icon not_liked " onclick='likeOrDislike(this)' aria-hidden="true"></i>
  </button>
  </div>
  <label class="card-title blog_date  d-block">${element.createdAt.toString().substring(0,15)}</label>

</div>`
      blogsRow.innerHTML =blog

    })

    blog+=`</div></div>`




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

