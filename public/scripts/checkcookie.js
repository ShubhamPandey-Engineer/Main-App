function checkCookiees()
 {

    if(!document.cookie)
    {
      let status=document.querySelector("#page_status")
      status.innerHTML=`  <div class="alert  fixed-top alert-dismissible fade show  " role="alert">
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
  <strong>Please SignIn to continue <a href="blogs/auth"><button class="btn btn-md btn-light " type="button">SignIn here</button></a> </strong> 
</div>`
<<<<<<< HEAD
=======
>>>>>>> 3785a995d58e341ec22f7ffac44cccf520957edb
      return false
      //  document.location.href="/blogs/user/auth"
    }
    else{
        return true
    }

}
