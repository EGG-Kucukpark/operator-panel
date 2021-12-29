const express = require('express');
const router = express.Router();
const DriverSchema = require('../models/driverDB');
const DriverAppSchema = require('../models/driverAppDB');
const bodyParser = require('body-parser');

const fs = require('fs');
const multer = require('multer');
const path = require("path");
const formidable = require('formidable');



const upload = multer({
    dest: "/public/uploads/",

});

router.use(bodyParser());

router.get('/drivers', (req, res) => {
    DriverSchema.find((err, drivers) => {
        if (err) {
            console.log(err);
        } else {
            res.json(drivers);
        }
    });
});

router.get('/drivers/application', (req, res) => {
    DriverAppSchema.find((err, drivers) => {
        if (err) {
            console.log(err);
        } else {
            res.json(drivers);
        }
    });
});


router.post('/drivers', async (req, res) => {
    let {
        name,
        phone,
        email,
        password,
        arac_plaka
    } = req.body;

    console.log(req.body);

    let oldUser = await DriverSchema.findOne({
        phone
    });

    if (oldUser === null) {
        DriverSchema.create({
            name,
            phone,
            email,
            password,
            arac_plaka
        }).then(() => {
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

router.get('/drivers/:id', (req, res) => {
    DriverSchema.findById(req.params.id, (err, driver) => {
        if (err) {
            console.log(err);
        } else {
            res.json(driver);
        }
    });

})

router.delete('/drivers/:id', (req, res) => {
    DriverSchema.findByIdAndRemove(req.params.id, (err, driver) => {
        if (err) {
            console.log(err);
        } else {
            res.json(driver);
        }
    });
});

router.put('/drivers/:id', (req, res) => {
    DriverSchema.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, (err, driver) => {
        if (err) {
            console.log(err);
        } else {
            res.json(driver);
        }
    });

});


router.post('/drivers/application',
    (req, res) => {

        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            const tempPath = files.photo.filepath;
            const targetPath = "src/assets/images/drivers/" + files.photo.originalFilename;

            fs.rename(tempPath, targetPath, err => {
                if (err) {
                    return err;
                }
            });

            let {
                name,
                phone,
                iban,
                arac,
                referans
            } = fields;
            
            
            let file = files.photo.originalFilename;
                DriverAppSchema.create({
                    name,
                    phone,
                    iban,
                    file,
                    arac,
                    referans
                }).then(() => {
                    res.json({
                        success: true,
                        message: 'Driver Application added successfully'
                    });
                }); 


        });






    });








module.exports = router;