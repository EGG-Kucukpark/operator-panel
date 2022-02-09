const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const luxon = require('luxon');
const path = require('path');
require('./config/database');
const fs = require('fs');


const certOptions = {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
}


//Socket
const socket = require('socket.io');
const http = require('http').createServer(app);

//Routes & Middleware
const drivers = require('./routes/drivers');
const auth = require('./routes/auth');
const locations = require('./routes/locations');
const authMid = require('./middleware/jwtAuth');
const general = require("./routes/general");
const calcLoc = require("./routes/locations")
const trip = require("./routes/trip");
const user = require("./routes/user");
const extarnal = require("./routes/external");



//Models
const insLocation = require('./models/location/instLocation');
const allTrips = require('./models/Trips/allTripsDB');
const tripDb = require('./models/Trips/tripDB');
const notification = require('./models/others/notifiDB');


//Settings
const socketPort = 5555;
const mainPort = 2222;
axios.defaults.baseURL = 'https://www.turkpark.com.tr:2222';

let stack = []

app.listen(mainPort, () => {
    console.log(`listening on ${mainPort}`);
});
app.use(cors());
app.use(bodyParser.json());



//Routes
app.use(auth);
app.use(drivers);
app.use(locations);
app.use(general);
app.use(calcLoc);
app.use(trip)
app.use(user);
app.use(extarnal);


//Socket
const io = socket(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "OPTIONS"]
    }
});



http.listen(socketPort, () => {
    console.log(`listening on ${socketPort}`);
});


io.on("connection", socket => {
    console.log("socket connected");

    
    socket.on('tripCalc', data => {
        console.log(data, 'TripCalc');
        stack.push(data);
    })






});