"use strict";

const PostController = require("../app/Controllers/Http/PostController");
const LoginController = require("../app/Controllers/Http/LoginController");

//import Route from "@ioc:Adonis/Core/Route";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

//Route.on('/').render('welcome')
Route.get("/", "LoginController.auth").as("login.index").middleware(["RedirectIfAuthenticated"]);
Route.get("logout", "LoginController.logout").as("logout").middleware(["Authenticate"]);
Route.post("/login/check", "LoginController.auth_post").as("login.check").middleware(["RedirectIfAuthenticated"]);
Route.get("/register", "LoginController.register").as("register.index").middleware(["RedirectIfAuthenticated"]);
Route.post("/register/store", "LoginController.register_post").as("register.store").middleware(["RedirectIfAuthenticated"]);
Route.get("home", "PostController.index").as("home").middleware(["Authenticate"]);
Route.post("/post/data", "PostController.store").middleware(["Authenticate"]);
Route.get("/post/delete/:id", "PostController.delete").as("post.delete").middleware(["Authenticate"]);
Route.get("/post/edit/:id", "PostController.edit").as("post.edit").middleware(["Authenticate"]);
Route.post("/post/update:id", "PostController.update").as("post.update").middleware(["Authenticate"]);
