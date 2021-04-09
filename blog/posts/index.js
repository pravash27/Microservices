const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const {randomBytes} = require('crypto')
const cors = require('cors')
const axios = require('axios')
app.use(bodyParser.json());
app.use(cors());
let posts = {}

app.get('/posts',(req,res) => {
    res.send(posts);
})

app.post('/events',(req,res) => {
    console.log(req.body.type)
    res.send({status:'OK'});
})

app.post('/posts',async (req,res) => {
    const id = randomBytes(4).toString('hex');
    posts[id] = {id: id,title:req.body.title};
    await axios.post("http://localhost:4004/events",{
        type: 'POST_CREATED',
        data: posts[id] 
    })
    res.status(201).send(posts[id]);
})

app.listen(4000,() => {
    console.log("Posts Server Listening at 4000")
})