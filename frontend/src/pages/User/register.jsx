// <!-- <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Register</title>
//     <script src="https://cdn.tailwindcss.com"></script>
// </head>
// <body>
//     <div class="p-4">
//         <h1 class="text-blue-800 text-xl w-auto font-medium">Register</h1>
//     </div>
//     <div class="card p-4 flex justify-center item-center">
//         <form action="/api/auth/register" method="post">
//             <input name="fullname" type="text" placeholder="Name" class="outline-0 border-2 p-1"/>
//             <input name="email" type="email" placeholder="Email" class="outline-0 border-2 p-1"/>
//             <input name="password" type="password" placeholder="Password" class="outline-0 border-2 p-1"/>
//             <input  type="submit" value="Register" class="p-2 bg-blue-800 text-white rounded-md"/>
//             <a href="/login">
//             <input  value="Login" class="p-2 bg-orange-500 text-white w-20 rounded-md"/>
//             </a>
//         </form>
//     </div>
// </body>
// </html> -->


import React from "react";

const Register = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-blue-800 text-xl font-medium mb-4">Register</h1>

      <div className="bg-white p-6 rounded-md shadow-md max-w-md mx-auto">
        <form action="/api/auth/register" method="post" className="space-y-4">
          <input
            name="fullname"
            type="text"
            placeholder="Name"
            className="w-full outline-0 border-2 p-2 rounded-md"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full outline-0 border-2 p-2 rounded-md"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full outline-0 border-2 p-2 rounded-md"
          />

          <input
            type="submit"
            value="Register"
            className="w-full p-2 bg-blue-800 text-white rounded-md cursor-pointer hover:bg-blue-900"
          />
        </form>

        <div className="text-center mt-4">
          <a href="/login">
            <button className="p-2 bg-orange-500 text-white w-20 rounded-md hover:bg-orange-600">
              Login
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;