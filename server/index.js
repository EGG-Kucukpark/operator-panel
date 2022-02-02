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


//Settings
const socketPort = 5555;
const mainPort = 2222;
axios.defaults.baseURL = 'http://195.174.194.97:2222';



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


    socket.on('newNotification', (data) => {
        console.log("Yeni Bildirim!");

        socket.broadcast.emit('notification', data);
    })


    socket.on('customerLocation', async (data) => {
        console.log(data);
        console.log("Yeni Customer Location!");



        socket.broadcast.emit('customerLoc', data);

    })


    socket.on('cancel', async (data) => {
        console.log("Cancel!");

        socket.broadcast.emit('tripCancel', data);
    })

    socket.on('driverLocation', (data) => {

        let driver = {
            id: data.user._id,
            name: data.user.name,
            lat: data.lat,
            lng: data.lng,
            phone: data.user.phone,
            status: data.user.status
        }


        socket.broadcast.emit('driverLoc', driver);
    });





    socket.on('customerLocationApp', async (data, callback) => {

        var driver = data.driver


        const user = await insLocation.findOne({
            userPhone: data.customer
        })



        var nameArry = user.userName.split(" ");


        user.userName = nameArry.length > 1 ? nameArry[0] + " " + nameArry[1][0].toUpperCase() + '.' : nameArry[0];


        if (user) {
            var finalData = {
                customer: user,
                driver: driver,
                note: data.note
            }

            console.log(finalData);

            socket.broadcast.emit('customerLocApp', finalData);

        }
    });


    socket.on('startTrip', (data) => {
        insLocation.findOneAndDelete({
            userPhone: data.userPhone
        }, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        })

        let tripData = {
            trip_id: data.tripId,
            lng: data.lng,
            lat: data.lat,
            distance: data.distance,
            userPhone: data.userPhone,
        }

        allTrips.create(tripData, (err, trip) => {
            if (err) {
                console.log(err);
            }
        })


        socket.broadcast.emit('startTripNot', data);


    });



    socket.on('tripNotification', (data) => {
        socket.broadcast.emit('startTripMsg1', data);

    })


    socket.on('endTrip', (data) => {

        console.log(data, 'Bitti');

        tripDb.findByIdAndUpdate(data.tripId, {
            distance: data.distance
        }, (err, trip) => {
            if (err) {
                console.log(err);
            } else {
                console.log(trip);
            }
        })


        socket.broadcast.emit('endTripMsg', data);

    })


    socket.on('endTripCoupon', (data) => {

        console.log(data, 'Bitti KUPON');

        tripDb.findByIdAndUpdate(data.tripId, {
            distance: data.distance
        }, (err, trip) => {
            if (err) {
                console.log(err);
            } else {
                console.log(trip);
            }
        })

        socket.broadcast.emit('TripCouponMsg', data);

    })



    socket.on('tripMsg', (data) => {
        console.log(data, 'TripMsg');
        socket.broadcast.emit('tripMsg1', data);

    })



    socket.on('comeTrip', (data) => {
        console.log(data, 'TripMsg');
        socket.broadcast.emit('comeTrip1', data);

    })




});