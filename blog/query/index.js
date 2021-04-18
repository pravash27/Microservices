const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')
app.use(bodyParser.json())
app.use(cors());
const posts = {};

const handleEvent = (type,data) => {
    if(type==='POST_CREATED'){
        const {id,title} = data;
        posts[id] = {id,title,comment:[]}
    }
    if(type==='COMMENT_CREATED'){
        const {postId,comment,id,status} = data;
        posts[postId].comment.push({id,comment,status})
    }
    if(type==='COMMENT_UPDATED'){
        const {postId,id,status} = data;
        let comment = posts[postId].comment.find(c => {
            return c.id === id
        })
        comment.status = status;
    }
}

app.get('/posts',(req,res) => {
    res.send(posts)
})

app.post('/events',(req,res) =>{
    const { type, data } = req.body;
    handleEvent(type,data);
    res.send({status:'OK'})
})


app.listen(4002, async () => {
    console.log("Query Service Listening at 4002")
    let res = await axios.get('http://event-bus-srv:4004/events');
    for(let event of res.data){
        console.log("Exceuting Event: "+event.type)
        handleEvent(event.type,event.data);
    }
})