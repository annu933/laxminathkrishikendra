# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)




/------------------------------Details----------------------------------------



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



If sysytem not found your DB file. 
so just run this code , mongod --dbpath "D:/annu/bagshop/data"
if you have data/db file

<!-- 23july -->

<!-- frontend -->
npm start

<!-- backend -->
mongod - //run mongodb 
mongod --dbpath "D:/annu/bagshop/data" - //to connect db file
npx nodemon app.js -  //to start nodeJS server
