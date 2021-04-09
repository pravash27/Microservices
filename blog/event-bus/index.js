const express = require('express')
const app = express();
const axios = require('axios')
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(bodyParser.json())
app.use(cors())

app.post('/events',(req,res) => {
    let data = req.body;
    axios.post('http://localhost:4000/events',data)
    axios.post('http://localhost:4001/events',data)
    axios.post('http://localhost:4002/events',data)
    res.send({status:'OK'});
})



app.listen(4004,() => {
    console.log("Event Bus Listening at 4004")
})