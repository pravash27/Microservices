const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const {randomBytes} = require('crypto')
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

let commentsByPostId = {}

app.get('/posts/:id/comments',(req,res) => {
    res.send(commentsByPostId[req.params.id] || []);
})

app.post('/posts/:id/comments',(req,res) => {
    const comid = randomBytes(4).toString('hex');
    let id = req.params.id;
    let comments = commentsByPostId[id]?commentsByPostId[id]:[];
    let comment = {id: comid,comment: req.body.comment};
    comments.push(comment);
    commentsByPostId[id] = comments;
    res.status(201).send(commentsByPostId[id]);
})

app.listen(4001,() => {
    console.log("Comments Server Listening at 4001")
})