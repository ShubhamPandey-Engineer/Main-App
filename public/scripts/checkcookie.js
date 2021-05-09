function checkCookiees()
 {

    if(!document.cookie)
    {
      let status=document.querySelector("#page_status")
      status.innerHTML=`  <div class="alert  fixed-top alert-dismissible fade show  " role="alert">
  <button type="button" class="border-dark close font-weight-bolder" data-dismiss="alert" aria-label="Close">
    <span    class="font-weight-bolder " aria-hidden="true">&times;</span>
  </button>
  <strong>Please SignIn to continue <a href="blogs/auth"><button class="btn btn-md btn-light " type="button">SignIn here</button></a> </strong> 
</div>`
  status.classList.remove("hide_box")
      return false
      //  document.location.href="/blogs/user/auth"
    }
    else{
        return true
    }

}
