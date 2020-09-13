const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express()

//basic port and env variables
const PORT = 5000;

//connect to database
const mongoose = require('mongoose')
mongoose.connect
    ('mongodb://localhost:27017/checklist',
    {useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log("Connected to database");
    })
    .catch(err => {
        console.log("Cannot connect to database", err);
    });
    
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Routes
app.use('/api', require('./routes/routeApi.js'));

//set port & listen for requests
app.listen(PORT, () => {
    console.log(`Server is running on "localhost: ${PORT}" || Enter ctr^c to close server`);
});