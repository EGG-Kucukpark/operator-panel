const express = require('express');
const router = express.Router();
const locationSchema = require('../models/locationDB');
const bodyParser = require('body-parser');

router.use(bodyParser());

router.get('/getLocations', (req, res) => {
    locationSchema.find((err, locations) => {
        if (err) {
            console.log(err);
        } else {
            res.json(locations);
        }
    });
});

router.post('/location', async (req, res) => {
    let {
        name,
        lat,
        lng

    } = req.body;


    locationSchema.create({
        name,
        lat,
        lng
    }).then(() => {
        console.log('Location created');
        res.json({
            success: true,
            message: 'Location added successfully'
        });
    });

});



router.post('/calcLoc', async (req, res) => {
    drivers = req.body.drivers;
    customer = req.body.user;
    results = [];



    for (let i = 0; i < drivers.length; i++) {
        await axios(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${customer.location.degreesLatitude}%2C${customer.location.degreesLongitude}&destinations=${drivers[i].lat}%2C${drivers[i].lng}%&key=AIzaSyBA6gH1LTs7-6RTKi__xXvdaZ4bV78IdOE`).then((item) => {
            let driver = {
                id: drivers[i].id,
                name: drivers[i].name,
                phone: drivers[i].phone,
                distanceText : item.data.rows[0].elements[0].distance.text,
                distance: item.data.rows[0].elements[0].distance.value,
            }
            results.push(driver);

            i === drivers.length - 1 ? res.json(results) : null;

        }).catch((err) => {
            console.log(err);
        });
    }


})






module.exports = router;