
console.log('auth connected')


//global variables
const signupBtn=document.querySelector("#signup_btn")
const signinBtn=document.querySelector("#signin_btn")

const toggleFormBtn=document.querySelector(".toggle_btn")
const toggleNext=document.querySelector(".toggle_next")
const toggleSignin=document.getElementById("toggle_signin")
const toggleSignup=document.getElementById("toggle_signup")
const formLoad=document.querySelectorAll(".fa-spinner")

//forms
const signInForm=document.getElementById("in_form")
const signUpForm=document.getElementById("up_form")


let showPassword=(ev,type)=>{
const parent=document.querySelector(".eye_signup_parent")
const eyeSignin=document.querySelector(".eye_signin")
const eyeSignup=document.querySelector(".eye_signup")
if(type=="signin")
{
const pass=eyeSignin.parentElement.parentElement.children[0]
console.log(pass)
const classs=eyeSignin.classList.contains("fa-eye")
if(classs)
{
pass.setAttribute("type","text")
eyeSignin.classList.remove("fa-eye")
eyeSignin.classList.add("fa-eye-slash")

}
else{
pass.setAttribute("type","password")
eyeSignin.classList.add("fa-eye")
eyeSignin.classList.remove("fa-eye-slash")
}  


}
else{
const classs=eyeSignup.classList.contains("fa-eye")
const pass=eyeSignup.parentElement.parentElement.children[0]

if(classs)
{
pass.setAttribute("type","text")
eyeSignup.classList.remove("fa-eye")
eyeSignup.classList.add("fa-eye-slash")

}
else{
pass.setAttribute("type","password")
eyeSignup.classList.add("fa-eye")
eyeSignup.classList.remove("fa-eye-slash")
}  
console.log(pass)
}



}


//Auth form toggler function
let toggleAuthForm=()=>{
toggleSignin.classList.add("hide_box")

//toggling the form toggler
toggleFormBtn.addEventListener("click" ,(event)=>{
toggleNext.classList.toggle("move_left")
if(toggleNext.textContent == 'SignIn')
{
toggleNext.textContent="SignUp"
}
else{
toggleNext.textContent="SignIn"

}
toggleSignup.classList.toggle("hide_box")
toggleSignin.classList.toggle("hide_box")

})

}


//call  Auth form toggler
toggleAuthForm()



var pageStatus=document.querySelector("#page_status")
let callAjax=(url,data,btn,spinner)=>{

let result={
}
$.ajax({
url: url,
type: "POST",
data: data,

success: function(res) {
    btn.removeAttribute("disabled")
    console.log(res)
res=JSON.parse(res)
console.log(res)

const doc=document.querySelector(".error_msg")
const errorBox=document.querySelector("#error_box")
let errorHtml=`<div class='filter_wrapper  justify-content-center'>`

//if error
if(typeof res["errors"] !=="undefined")
{
    count=0

    //show errors 
res["errors"].forEach((element)=> {
    count++

    errorHtml+=`<div class="d-block"><span class="badge badge-light m-2">${count}</span><strong class="text-left mb-1 font-weight-normal ">${element.msg}</strong>`


});
$("#myModal").modal("show")
errorBox.innerHTML=errorHtml
}

//no error
else{
    //success for signin
    if(url == "/blog/signin")
    {
        console.log("signin in ")
        document.cookie=`token=${res["token"]};expires=365;path=/`
   document.location.href="/blogs"
    return true 
    }
     
    
    else{
    //success for signup 
    toggleSignup.innerHTML=` <div class="alert  p-2 alert-success fade show  text-center" >
    <strong >User registered , please SignIn </strong> 
  </div>`
    }


}

},
failure:function(err){
console.log("auth failed")
}


});
return result
}


//SignUp function 
toggleSignup.addEventListener("submit",(event)=>{
event.preventDefault()
//load form btn--
formLoading(signupBtn)
//btn loading
/*
signupBtn.setAttribute("disabled","true")
formLoad.classList.remove("form_load")
formLoad.classList.add("spin")
*/


var data=new FormData(signUpForm)
dataObject={}
data.forEach((ele,index)=>{
dataObject[index] = ele

})

let result=callAjax("/blog/signup",dataObject,signupBtn,formLoad[0])


})







//SignIn function 
signInForm.addEventListener("submit",(event)=>{
event.preventDefault()
//load form btn--
formLoading(signinBtn)
formData=new FormData(signInForm)
signInData={}
formData.forEach((ele,index)=>{
signInData[index] = ele

})
let result=callAjax("/blog/signin",signInData,signinBtn,formLoad[0])
console.log(result["res"])


})



//form loading (btn)
let formLoading=(btn)=>{
    btn.setAttribute("disabled","true")
}



