const express = require('express');
const router = express.Router();
const axios = require('axios');




router.post('/calcPrice', async (req, res) => {
    let begin = req.body.begin;
    let end = req.body.end;
    let loc1 = null;
    let loc2 = null;
    let data = null;

    await axios(encodeURI(`https://maps.googleapis.com/maps/api/geocode/json?address=${begin}&key=AIzaSyBA6gH1LTs7-6RTKi__xXvdaZ4bV78IdOE`)).then((res) => {
        loc1 = res.data.results[0].geometry.location;

    }).catch((err) => {
        return err
    })

    await axios(encodeURI(`https://maps.googleapis.com/maps/api/geocode/json?address=${end}&key=AIzaSyBA6gH1LTs7-6RTKi__xXvdaZ4bV78IdOE`)).then((res) => {
        loc2 = res.data.results[0].geometry.location;

    }).catch((err) => {
        return err
    })


    await axios(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${loc1.lat}%2C${loc1.lng}&destinations=${loc2.lat}%2C${loc2.lng}%&key=AIzaSyBA6gH1LTs7-6RTKi__xXvdaZ4bV78IdOE`).then((res) => {
        data = res.data.rows[0].elements[0].distance;
    })


    res.json(data)
})








module.exports = router;