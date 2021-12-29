const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('./config/database');



//Socket
const socket = require('socket.io');
const http = require('http').createServer(app);
const socketPort = 5555;
const mainPort = 2222;

//Routes & Middleware
const drivers = require('./routes/drivers');
const auth = require('./routes/auth');
const locations = require('./routes/locations');
const authMid = require('./middleware/jwtAuth');
const general = require("./routes/general");
const calcLoc = require("./routes/locations")





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
    socket.on("disconnect", () => {
        console.log("socket disconnected");
    });



    socket.emit('notification', (data) => {
        console.log(data);
    })


    socket.on('driverLocation', (data) => {
        let driver = {
            id: data.user._id,
            name: data.user.name,
            lat: data.lat,
            lng: data.long,
            phone: data.user.phone,
            status: data.user.status

        }
        console.log(driver.name);


        socket.broadcast.emit('driverLoc', driver);
    });


});