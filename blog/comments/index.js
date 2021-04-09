const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const {randomBytes} = require('crypto')
const cors = require('cors');
const axios = require('axios')
app.use(cors());
app.use(bodyParser.json());

let commentsByPostId = {}

app.get('/posts/:id/comments',(req,res) => {
    res.send(commentsByPostId[req.params.id] || []);
})

app.post('/events',(req,res) => {
    console.log(req.body.type)
    res.send({status:'OK'});
})

app.post('/posts/:id/comments',async (req,res) => {
    const comid = randomBytes(4).toString('hex');
    let id = req.params.id;
    let comments = commentsByPostId[id]?commentsByPostId[id]:[];
    let comment = {id: comid,comment: req.body.comment};
    comments.push(comment);
    commentsByPostId[id] = comments;
    await axios.post("http://localhost:4004/events",{
        type: 'COMMENT_CREATED',
        data:{
            id: comid,
            comment:  req.body.comment,
            postId: id
        }
    })
    res.status(201).send(commentsByPostId[id]);
})

app.listen(4001,() => {
    console.log("Comments Server Listening at 4001")
})