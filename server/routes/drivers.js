const express = require('express');
const router = express.Router();
const fs = require('fs');
const bcrypt = require("bcryptjs");

const formidable = require('formidable');
const bodyParser = require('body-parser');


const DriverSchema = require('../models/Driver/driverDB');
const DriverAppSchema = require('../models/Driver/driverAppDB');
const DriverScoreSchema = require('../models/Driver/driverScore');
const DriverStart = require('../models/Driver/driverStart');
const trips = require('../models/Trips/tripDB')




router.use(bodyParser());



//  FETCH DATA
router.get('/drivers', (req, res) => {

    DriverSchema.find({}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    });

    /* DriverScoreSchema.find((err, data) => {
        if (err) {
            console.log(err);
        } else {
            driverScore.push(data);
        }
    });


    drivers.filter(driver => {
            driverScore.filter(score => {
                if (driver._id == driverScore.driver_id) {
                    driver.rating = driverScore.rating;

                } else {
                    driver.rating = 0;
                }
            });
        }


    ).then(() => {
        res.send(drivers);
    });
 */



});



router.get('/drivers/:id', async (req, res) => {

    let general = await DriverSchema.findById(req.params.id);
    let trip = await trips.find();


    res.send({
        general,
        trip
    });



})



router.get('/application', (req, res) => {
    DriverAppSchema.find({}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    });
});



// ADD DATA

router.post('/drivers', async (req, res) => {
    let {
        name,
        photo,
        phone,
        email,
        password,
        arac,
        il,
        arac_plaka
    } = req.body;
    encryptedPassword = await bcrypt.hash(password, 10);

    let oldUser = await DriverSchema.findOne({
        phone
    });

    if (oldUser === null) {
        DriverSchema.create({
            name,
            phone,
            photo,
            email,
            password: encryptedPassword,
            arac,
            il,
            arac_plaka
        }).then((data) => {


            res.json({
                success: true,
                message: 'Driver added successfully'
            });
        });
    } else {
        res.json({
            success: false,
            message: 'Driver already exists'
        });
    }




});


router.post('/drivers/score', (req, res) => {
    let {
        driver_id,
        rating,
        review
    } = req.body;





    DriverScoreSchema.create({
        driver_id,
        rating,
        review
    }).then(() => {
        res.json({
            success: true,
            message: 'Driver score added successfully'
        });
    });



})


router.post('/drivers/application',
    (req, res) => {



        let {
            name,
            phone,
            iban,
            arac,
            il,
            referans
        } = req.body;



        DriverAppSchema.create({
            name,
            phone,
            iban,
            arac,
            il,
            referans
        }).then(() => {
            res.json({
                success: true,
                message: 'Driver Application added successfully'
            });
        }).catch(err => {
            res.json({
                success: false,
                message: 'Driver Application could not be added'
            });
        })


    })


router.post('/drivers/calcLocation', (req, res) => {


    let driver = DriverStart.FindOne({
        _id: req.body.id
    });

    if (driver) {
        res.json({
            success: true,
            message: 'Driver location added successfully'
        });
    }



    DriverStart.create(req.body).then(() => {
        res.json({
            success: true,
            message: 'Driver Location added successfully'
        });
    });

})




// UPDATE DATA

router.put('/drivers', async (req, res) => {

    let data = req.body.params;

    let isBcyrpt = await bcrypt.compare(data.password, data.password);


    let encryptedPassword = !isBcyrpt ? await bcrypt.hash(data.password, 10) : data.password;

    console.log(isBcyrpt);
    DriverSchema.findByIdAndUpdate(data.id, {
        name: data.name,
        phone: data.phone,
        email: data.email,
        password: encryptedPassword,
        arac_plaka: data.arac_plaka

    }).then((xd) => {
        res.json({
            success: true,
            message: 'Driver updated successfully'
        });
    }).catch(err => {
        console.log(err);
    })




});




// DELETE DATA



router.delete('/drivers/:id', (req, res) => {
    DriverSchema.findByIdAndRemove(req.params.id, (err, driver) => {
        if (err) {
            console.log(err);
        } else {
            res.json(driver);
        }
    });
});









module.exports = router;