const express = require('express')
const app = express();
const axios = require('axios')
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(bodyParser.json())
app.use(cors())
let events = [];
app.post('/events',(req,res) => {
    let event = req.body;
    console.log(event.type);
    events.push(event)
    axios.post('http://posts-clusterip-srv:4000/events',event)
    axios.post('http://comments-srv:4001/events',event)
    axios.post('http://query-srv:4002/events',event)
    axios.post('http://comment-moderator-srv:4003/events',event)
    console.log(events)
    res.send({status:'OK'});
})

app.get('/events',(req,res) =>{
    res.send(events);
})



app.listen(4004,() => {
    console.log("Event Bus Listening at 4004")
})