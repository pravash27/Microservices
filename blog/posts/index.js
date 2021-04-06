const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const {randomBytes} = require('crypto')
app.use(bodyParser.json());

let posts = {}

app.get('/posts',(req,res) => {
    res.send(posts);
})

app.post('/posts',(req,res) => {
    const id = randomBytes(4).toString('hex');
    posts[id] = req.body.title;
    res.sendStatus(201).send(posts[id]);
})

app.listen(4000,() => {
    console.log("Posts Server Listening at 4000")
})