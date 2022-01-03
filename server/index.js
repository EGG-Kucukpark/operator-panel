const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
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



    socket.on('newNotification', (data) => {
        console.log("Yeni Bildirim!");
        
        socket.broadcast.emit('notification', data);
    })


    socket.on('customerLocation', async (data) => {
        console.log("Yeni Customer Location!");
        var userLocations = [];

        await axios('/instCustomerLocation').then((res) => {
            res.data.map((item) => {
              let currentDate = DateTime.now().toISO();
              let diff = DateTime.fromISO(currentDate).diff(DateTime.fromISO(item.createdAt), 'minutes');
              item.duration = parseInt(diff.minutes);
              userLocations.push(item);
            })
          })
        
        socket.broadcast.emit('customerLocation', userLocations); 

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


        socket.broadcast.emit('driverLoc', driver);
    });

 


});