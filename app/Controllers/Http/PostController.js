"use strict";
const Post = use("App/Models/Post");
class PostController {
  async index({ view, auth }) {
    const user = auth.user.toJSON();
    let posts = await Post.all();

    return view.render("posts.index", { posts: posts.rows, user: user });
  }

  async store({ request, response, view, session }) {
    const post = new Post();

    post.nama_produk = request.input("nama_produk");
    post.qty = request.input("qty");
    post.harga = request.input("harga");
    post.deskripsi = request.input("deskripsi");

    await post.save();

    session.flash({ Notification: "data berhasil di simpan" });
    return response.route("/");
  }

  async delete({ request, response, view, params, session }) {
    const id = params.id;
    const post = await Post.find(id);
    await post.delete();

    session.flash({ Notification: "data berhasil di hapus" });
    return response.route("/");
  }

  async edit({ request, response, view, params }) {
    const id = params.id;
    const post = await Post.find(id);

    return view.render("posts.edit", { post: post });
  }

  async update({ request, response, view, params, session }) {
    const id = params.id;
    const post = await Post.find(id);

    post.nama_produk = request.input("nama_produk");
    post.qty = request.input("qty");
    post.harga = request.input("harga");
    post.deskripsi = request.input("deskripsi");
    await post.save();
    session.flash({ Notification: "data berhasil di ubah" });
    return response.route("/");
  }
}

module.exports = PostController;
