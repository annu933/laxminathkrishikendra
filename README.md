<h2>Bag Shop</h2>

<h3>config</h3>

<h5>development.js</h5>
<p>write a mongoodb base url in this file</p>

<h5>mongoose-connections</h5>
connect the application to mongodb server

<h3>controller</h3>

<h3>middleware</h3>

<h3>models</h3>

<h5>owner-model</h5>
<p>write a owner-schema</p>

<h5>product-model</h5>
<p>write a product-schema</p>

<h5>user-model</h5>
<p>write a user-schema</p>

<h3>public</h3>

<h5>javascripts</h5>
<h5>stylesheets</h5>
<h5>images</h5>

<h3>routes</h3>

<h5>owernRouter</h5>
<h5>productsRouter</h5>
<h5>usersRouter</h5>

<h3>utils</h3>

<h3>views</h3>

<h3>.env</h3>

<h3>.gitignore</h3>

<h3>app.js</h3>


<!-- create user -->
<p>"/register" route</p>

<!-- setup -->
<p>hash(encrypt the password)</p>
<p>need jwt sign data</p>
<p>set cookie</p>

<!--  -->
<p>creted keys.js file: JWT_KEY: process.env.JWT_KEY;</p>
<p>install dotenv , import it on app.js : require("dotenv").config(); --> now we can use all variable which were defined on env file </p>
<p>move the jwt.sign code to another file on utils folder</p>
<p>import it on userRouter file and pass the user data</p>

<!-- set the middleware -->
<h2>Middleware</h2>
<p>views : create index.ejs and shop.ejs file</p>
<p>routes : create a index.js file for indexRouter, and require it on app.js file</p>
<p>middleware : export isLoggedin function</p>
<p>check it not login-> set error, and redirect to "/" route</p>
<p>--remains</p>

<p>routes > index.js : </p>
<p>get the error : which were set on isLoggedin file</p>
<p>and render the file with error</p>
<p>--remains</p>
<p></p>
<p></p>
<p></p>
<p>isLoggedin</p>
<p>req.flash("error","--")</p>
<p>req.redirect("/")</p>
<p>flash shows error before redirecting to "/"</p>
<p></p>
<p></p>
<p></p>
<p>app.js</p>
<p>installed-express-session</p>
<p>innstalled-connect-flash</p>
<p>to setup flash message: that use session : to create session-> using express session</p>
<p></p>
