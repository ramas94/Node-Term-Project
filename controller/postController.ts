import * as db from "../fake-db";

// Make calls to your db from this file!
async function getPosts(n = 5, sub = undefined) {
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

export { 
  getPosts,
  getPost,
  setVote,
  addPost,
};
