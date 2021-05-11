<h2>Blog App<h2>

<h4>Description </h4>
Blog App is an web application which allows an user to create blogs, after athentication.
<h4>Technology used</h4>
<li>1-HTML,CSS3,Javascript,Node js</li>
<li>2-Framework used- Express.js , Bootstrap 4</li>
<li>3-Database used- MongoDB Atlas(cloud)</li>
<li>4-Html template used- EJS</li>

<h4>Process </h4>
<div>Intially when user visits the homepage , can view all blogs.
After, beign authenticated a user can create blog or like any blog.
For authorization  the server wil generate a JWT token(consisting the used id,name,email), this hash token will then be stored in the user browser as a cookies .
Now, this token will be used to signin user when needed.
Ajax is used to create GET/POST request.


Basic validations-
<li>Same email id cannot be used to create new user</li>
<li>Username,email,password are required </li>
<li>Blog title,category,content are required </li>



<h4>Features </h4>
<li>Signup/Signin authentication</li>
<li>Filter option for blogs categories</li>
<li>Like blog button (requires authentication)</li>
<li>Edit blog (requires authentication)</li>
<li>Delete blog (requires authentication)</li>
<li>Responsive design</li>




