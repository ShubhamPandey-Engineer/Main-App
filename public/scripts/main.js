var pageStatus=document.querySelector("#page_status")



//cokkies
function checkCookiees()
 {

    if(!document.cookie)
    {
      let status=document.querySelector("#page_status")
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



//Network status method

let networkStatus=(event)=>{
 
  

  if(event == "offline")
  {
    console.log(event)
    pageStatus.innerHTML=`  <div class="alert alert-warning text-dark fixed-top alert-dismissible fade show  " role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    <strong>Please connect to the internet  <i class="fa fa-plug p-2" aria-hidden="true"><i class=" p-2 fa fa-thumbs-down" aria-hidden="true"></i>
    </i>
    </strong> 
  </div>`
  }
  else{
    console.log(event)

    pageStatus.innerHTML=`  <div class="alert bg-success  fixed-top alert-dismissible fade show  " role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    <strong>You are back ...... <i class="fa fa-thumbs-up p-2" aria-hidden="true"></i>
    </strong> 
  </div>`
  setTimeout(()=>{
    pageStatus.classList.toggle("hide_box")
  },2500)
  }
}