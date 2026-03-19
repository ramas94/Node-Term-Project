// @ts-nocheck
import express from "express";
import * as database from "../controller/postController";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";
import { userInfo } from "os";

router.get("/", async (req, res) => {
  const posts = await database.getPosts(20);
  const user = await req.user;
  res.render("posts", { posts, user });
});

router.get("/create", ensureAuthenticated, (req, res) => {
  res.render("createPosts");
});

router.post("/create", ensureAuthenticated, async (req, res) => {
  const user = await req.user;

  const title = req.body.title?.trim();
  const link = req.body.link?.trim();
  const description = req.body.description?.trim();
  const subgroup = req.body.subgroup?.trim();

  if (!title || !subgroup || (!description && !link)) {
    return res.redirect("/posts/create");
  }

  const post = await database.addPost(
    title,
    link,
    user.id,
    description,
    subgroup
  );

  res.redirect(`/posts/show/${post.id}`);
});

router.get("/show/:postid", async (req, res) => {
  const postId = req.params.postid;
  const user = await req.user;

  let post = await database.getPost(postId);
  
  if(!post){
    return res.redirect("/posts")
  }

  res.render("individualPost", {
    post,
    user,
  });
});

router.get("/edit/:postid", ensureAuthenticated, async (req, res) => {
  const postId = parseInt(req.params.postid);
  const post = await database.getPost(postId);
  const user = await req.user;

  if(!post){
    return res.redirect("/posts");
  }

  if (post.creator.id !== user.id){
    return res.redirect(`/posts/show/${postId}`);
  }

  res.render("editPost", {
    post,
    user,
  })
});

router.post("/edit/:postid", ensureAuthenticated, async (req, res) => {
  const postId = parseInt(req.params.postid);
  const post = await database.getPost(postId);
  const user = await req.user;

  if (!post){
    return res.redirect("/posts");
  }

  if(post.creator.id!== user.id){
    return res.redirect(`/posts/show/${postId}`);
  }

  const title = req.body.title?.trim();
  const link = req.body.link?.trim();
  const description = req.body.description?.trim()
  const subgroup = req.body.subgroup?.trim();

  if (!title || !subgroup || (!link && !description)){
    return res.redirect(`/posts/edit/${postId}`);
  }

  await database.editPost(postId,{
    title,
    link,
    description,
    subgroup,
  });

  res.redirect(`/posts/show/${postId}`);
});

router.get("/deleteconfirm/:postid", ensureAuthenticated, async (req, res) => {
  const postId = parseInt(req.params.postid);
  const post = await database.getPost(postId);
  const user = await req.user;

  if (!post){
    return res.redirect("/posts");
  }

  if(post.creator.id !== user.id){
    return res.redirect(`/posts/show/${postId}`);
  }

  res.render("deleteConfirm",{
    post,
    user,
  });
});

router.post("/delete/:postid", ensureAuthenticated, async (req, res) => {
  
  const postId = parseInt(req.params.postid);
  const post = await database.getPost(postId);
  const user = await req.user;
  const confirm = req.body.confirm;

  if(!post){
    return res.redirect("/posts");
  }
  if(post.creator.id !== user.id){
    return res.redirect(`/posts/show/${postId}`);
  }

  if(confirm !== "yes"){
    return res.redirect(`/posts/show/${postId}`);
  }

  const subgroup = post.subgroup;
  await database.deletePost(postId);
  res.redirect (`/subs/show/${subgroup}`);

});

router.post(
  "/comment-create/:postid",
  ensureAuthenticated,
  async (req, res) => {
    const postId = parseInt(req.params.postid);
    const user = await req.user;
    const description = req.body.description?.trim();

    if (!description){
      return res.redirect(`/posts/show/${postId}`);
    }
    
    await database.addComment(
      postId,
      user.id,
      description);
    
     res.redirect(`/posts/show/${postId}`)
  }
 
);

router.post("/vote/:postid", ensureAuthenticated, async(req, res) =>{
  const postId = parseInt(req.params.postid);
  const user = await req.user;
  const userId = user.id;
  const value = parseInt(req.body.setvoteto)


  await database.setVote(postId,userId,value)

  res.redirect(`/posts/show/${postId}`);
});

export default router;
