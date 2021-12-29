const express = require('express');
const router = express.Router();
const User = require('../models/userDB');
const userLocation = require('../models/userLocation');
const instLocation = require('../models/instLocation');
const notification = require('../models/notifiDB');
const luxon = require('luxon');


require('dotenv').config();



router.get('/', (req, res) => {
  User.find().then(users => {
    res.json(users);
  });

})

router.get('/instCustomerLocation', (req, res) => {
  instLocation.find().then(locations => {
    res.json(locations);
  });

})


router.get('/getUserLocations', (req, res) => {
  userLocation.find().then(locations => {

    res.json(locations);

  });

})

router.get('/customer/subsActive', async (req, res) => {


  let usersActive = await User.find({
    disabled: {
      $eq: false
    },
  })
  res.json(usersActive);


});

router.get('/customer/subsInactive', async (req, res) => {

  let usersDeactive = await User.find({
    disabled: true,
  })
  res.json(usersDeactive);
});



router.post('/customer/red', async (req, res) => {
  let {
    name,
    phone
  } = req.body;

  let oldUser = await User.findOne({
    phone
  });



  if (oldUser.disabled === true) {
    return res.status(400).json({
      msg: 'Red Listesine Daha Önceden Alınmış'
    });
  } else {
    User.findByIdAndUpdate(oldUser.id, {
        disabled: true,
      })
      .then((product) => {
        res.status(200).json({
          msg: 'Red Listesine Alındı'
        });
      })




  }
});


router.post('/customer/abone', async (req, res) => {
  let {
    name,
    phone
  } = req.body;

  let oldUser = await User.findOne({
    phone
  });



  if (oldUser.disabled === false) {
    return res.status(400).json({
      msg: 'Abone Listesine Daha Önceden Alınmış'
    });
  } else {
    User.findByIdAndUpdate(oldUser.id, {
        disabled: false,
      })
      .then((product) => {
        res.status(200).json({
          msg: 'Abone Listesine Alındı'
        });
      })




  }
});


router.post('/customer/add', async (req, res) => {
  let {
    name,
    phone
  } = req.body;

  let oldUser = await User.findOne({
    phone
  });


  if (oldUser === null) {
    User.create({
      name,
      phone
    });

  }

});



router.post('/customer/instLocation', async (req, res) => {
  let {
    name,
    phone,
    location
  } = req.body;

  instLocation.deleteMany({
    userPhone: phone
  }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });

  instLocation.create({
    userName: name,
    userPhone: phone,
    location,

  });

});


router.post('/customer/location', async (req, res) => {
  let {
    name,
    phone,
    location
  } = req.body;

  userLocation.create({
    userName: name,
    userPhone: phone,
    location,

  });

});



router.post('/notification/add', async (req, res) => {
  console.log(req.body);

  let name = req.body.msg.pushName;
  let phone = req.body.msg.key.remoteJid.split('@')[0];



  notification.create({
    userName: name,
    userPhone: phone,
  });

});

router.get('/notifications', async (req, res) => {

  notification.find().sort({
    created_at: -1
  }).then(notifications => {

    res.json(notifications);

  });

})

router.put('/notifications/readAll', async (req, res) => {

  notification.updateMany({}, {
    read: true
  }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });


})





module.exports = router;