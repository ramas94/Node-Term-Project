import { SrvRecord } from "dns";
import * as db from "../fake-db";

// Make calls to your db from this file!
async function getPosts(n = 5, sub?:string) {
  return db.getPosts(n, sub);
}

async function getPost(id: any){
  return db.getPost(id);
}

async function setVote(post_id: number, user_id: number, value: number) {
  return db.setVoteto(post_id,user_id,value);
}

async function addPost(
  title:string,
  link: string,
  creator: number,
  description: string,
  subgroup: string,
) {
  return db.addPost(title,link,creator,description,subgroup)
}

async function addComment(
  post_id: number,
  creator: number,
  description: string,
){
  return db.addComment(post_id,creator,description)
}

async function getSubs(){
  return db.getSubs();
}

async function editPost(
  post_id: number,
  changes: any,
){
  return db.editPost(post_id,changes);
}

async function deletePost(post_id:number) {
  return db.deletePost(post_id);
}

export { 
  getPosts,
  getPost,
  setVote,
  addPost,
  addComment,
  getSubs,
  editPost,
  deletePost,
};
