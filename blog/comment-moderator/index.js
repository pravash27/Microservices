const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require('axios')
app.use(bodyParser.json());


app.post("/events",async (req,res) => {
    const {type,data} = req.body;
    if(type==='COMMENT_CREATED'){
        const {comment,postId,id} = data;
        const newStatus = comment.toLowerCase().includes('orange')?'rejected':'approved';
        await axios.post('http://event-bus-srv:4004/events',{
            type: 'COMMENT_UPDATED',
            data:{
                id,
                comment,
                postId,
                status: newStatus
            }
        })
    }
    res.send({status:'OK'})
})

app.listen(4003,() => {
    console.log("Moderator listening at 4003")
})