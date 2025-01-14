const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id:uuidv4(),
        username:"ritikyadav",
        content:"I am a Developer",
    },
    {
        id:uuidv4(),
        username:"apnacollege",
        content:"I learn concepts from apnacollege",
    },
    {
        id:uuidv4(),
        username:"shradhakhapra",
        content:"She is my teacher. She teaches us very well",
    }
];
//api for show all posts
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});
//api for serve form to adding new user
app.get("/posts/new",(req,res)=>{
    res.render("addpost.ejs");
});
//api for adding new post
app.post("/posts",(req,res)=>{
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");  //now it will redirect to all posts page
});
//api for show details
app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs",{post});
});
//api for updating content
app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    res.redirect("/posts");
});

//api for edit content
app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
});

//api for delete post
app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});
app.listen(port,()=>{
    console.log("Server is listening in port 8080");
});