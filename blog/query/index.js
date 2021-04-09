const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors());
const posts = {};


app.get('/posts',(req,res) => {
    res.send(posts)
})

app.post('/events',(req,res) =>{
    const { type, data } = req.body;
    if(type==='POST_CREATED'){
        const {id,title} = data;
        posts[id] = {id,title,comment:[]}
    }
    if(type==='COMMENT_CREATED'){
        const {postId,comment,id} = data;
        posts[postId].comment.push({id,comment})
    }
    res.send({status:'OK'})
})


app.listen(4002,() => {
    console.log("Query Service Listening at 4002")
})