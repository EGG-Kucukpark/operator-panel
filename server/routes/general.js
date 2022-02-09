const express = require('express');
const router = express.Router();
const User = require('../models/user/userDB');
const userLocation = require('../models/location/userLocation');
const instLocation = require('../models/location/instLocation');
const notification = require('../models/others/notifiDB');
const luxon = require('luxon');


require('dotenv').config();



//FETCH DATA

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

router.get('/notifications', async (req, res) => {

  notification.find().sort({
    created_at: -1
  }).then(notifications => {

    res.json(notifications);

  });

})



// PUT DATA

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


  if (oldUser === null || oldUser === undefined) {
    User.create({
      name,
      phone
    }).then(user => {
      res.json(user)
    });

  } else {
    res.json(oldUser)
  }

});



router.post('/customer/instLocation', async (req, res) => {
  let {
    name,
    phone,
    location
  } = req.body;

  console.log('LOC',location);

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
    location: location

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

  let name = '';
  let phone = '';
  if (req.body.type == 'emergency') {
    name = req.body.name;
    phone = req.body.phone;
  } else {
    phone = req.body.msg.key.remoteJid.split('@')[0];
    name = req.body.msg.pushName;

  }

  let type = req.body.type;


  notification.create({
    userName: name,
    userPhone: phone,
    Notype: type,
  });

});

// UPDATE DATA



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

router.put('/customer/update', async (req, res) => {

  User.findByIdAndUpdate(req.body.id, {
    kvkk: req.body.kvkk
  }).catch(err => {
    console.log(err);
  })

});



// DELETE DATA


router.delete('/customer/instLocation', (req, res) => {

  console.log('Delete', req.query);

  instLocation.deleteOne({
      userPhone: req.query.phone
    }, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }



  )
})


module.exports = router;