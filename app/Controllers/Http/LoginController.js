"use strict";

const Session = require("@adonisjs/session/src/Session");
const User = use("App/Models/User");

class LoginController {
  auth({ view }) {
    return view.render("auth.login");
  }

  async auth_post({ request, auth, session, response }) {
    /**
     * get data from form
     */
    const { email, password } = request.all();

    /**
     * attemp auth
     */
    await auth.attempt(email, password);

    return response.route("home");
  }

  async logout({ auth, response }) {
    await auth.logout();
    return response.route("/");
  }

  register({ view }) {
    return view.render("auth.register");
  }

  async register_post({ request, response, view, session }) {
    const rules = {
      username: "required",
      email: "required",
      password: "required",
    };

    const user = await User.create({
      username: request.input("username"),
      email: request.input("email"),
      password: request.input("password"),
    });

    //Session.flash({ notification: "register berhasil" });
    return response.route("register.index");
  }
}

module.exports = LoginController;
