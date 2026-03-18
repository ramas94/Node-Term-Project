// const { ensureAuthenticated } = require("../middleware/checkAuth");
import express from "express";
import * as database from "../controller/postController";
const router = express.Router();

router.get("/list", async (req, res) => {
  const subs = await database.getSubs();
  
  subs.sort();
  res.render("subs", {
    subs,
    user: req.user,
  });
});

router.get("/show/:subname", async (req, res) => {
  const subname = req.params.subname;
  const posts =  await database.getPosts(20, subname)

  res.render("sub",{
    subname,
    posts,
    user: req.user,
  });
});

export default router;
