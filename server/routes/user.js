const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser());



// MODELS
const users = require('../models/user/userDB');
const userAdress = require('../models/user/userAddress');
const trips = require('../models/Trips/tripDB')
const userCoupons = require('../models/user/userCoupons');
const userAppointment = require('../models/user/userAppointments');




// ROUTES


// GET USER ADDRESS


router.get('/customer', async (req, res) => {



    let general = await users.findById(req.query.id);
    let address = await userAdress.find({
        phone: req.query.phone
    });
    let appointments = await userAppointment.find({
        phone: req.query.phone
    });
    let trip = await trips.find({
        customerPhone: req.query.phone
    });





    res.send({
        general,
        address,
        appointments,
        trip
    })

});




router.get('/userAddress', (req, res) => {
    userAdress.find({
        phone: req.query.phone
    }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    })

})

// GET USER APPOINTMENT
router.get('/userAppointment', (req, res) => {

    if (req.query.phone) {
        userAppointment.find({
            customerPhone: req.query.phone
        }).sort({
            created_at: -1
        }).then(data => {
            res.json(data);
        })
    } else {
        userAppointment.find().sort({
            created_at: -1
        }).then(data => {
            res.json(data);
        })

    }

})




// GET USER COUPONS

router.get('/userCoupons', (req, res) => {
    userCoupons.find({
        phone: req.query.phone
    }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    })

})


// GET USER TRIPS

router.get('/userTrips', (req, res) => {

    trips.find({
        customerPhone: req.query.phone
    }).sort({
        created_at: -1
    }).then(data => {
        res.json(data);
    })

})



// ADD USER ADDRESS
router.post('/userAddress', (req, res) => {

    let {
        name,
        phone,
        address,
        address_type
    } = req.body;

    let userAddress = new userAdress({
        name,
        phone,
        address,
        address_type
    });

    userAddress.save((err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    })

});


// ADD USER COUPONS
router.post('/userCoupons', async (req, res) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    function randomStr(alphabet) {
        var ans = '';
        for (var i = 6; i > 0; i--) {
            ans +=
                alphabet[Math.floor(Math.random() * alphabet.length)];
        }
        return ans;
    }


    let coupoun_code = await randomStr(alphabet) + req.body.discount;


    let {
        name,
        phone
    } = req.body;

    const isHave = await userCoupons.findOne({
        phone: phone
    })

    if (!isHave) {
        userCoupons.create({
            name,
            phone,
            coupoun_code,

        }, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.json(data);
            }
        })
    } else {
        res.status(400).send(isHave)
    }
});


// ADD USER APPOINTMENT 
router.post('/userAppointment', (req, res) => {
    let {
        name,
        phone,
        date,
        address,
        time,

    } = req.body;

    userAppointment.create({
        name,
        phone,
        date,
        address,
        time,
    }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    })


});


router.post('/userCouponsFriend', async (req, res) => {
    let {
        name,
        phone,
        discount,
        coupon,
        coupoun_used,
    } = req.body;



    let userCoupon = await userCoupons.findOne({
            coupoun_code: coupon.toUpperCase(),
            phone: phone
        },

    )


    if (userCoupon) {
        return res.status(400).send('coupon is used')
    }

    userCoupons.create({
        name,
        phone,
        discount,
        coupoun_code: coupon.toUpperCase(),
        coupoun_used,
    }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    })


});




// DELETE USER APPOINTMENT

router.delete('/userAppointment', (req, res) => {
    userAppointment.findByIdAndDelete(req.query.id, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    })

})


// DELETE USER ADDRESS
router.delete('/userAddress', (req, res) => {
    userAdress.findByIdAndDelete(req.query.id, (err, data) => {
        if (err) {
            console.log(err);
        } else {

            res.json(data);
        }
    })

});


module.exports = router;