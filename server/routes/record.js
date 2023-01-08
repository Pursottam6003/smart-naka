const express = require('express');
const recordRoutes = express.Router();
const { getCollection } = require('../helpers/helpers')

recordRoutes.route('/vehicles').get((req, res) => {
  getCollection('vehicles', (vehicles) => {
    vehicles.find({})
      .toArray()
      .then(result => { res.json(result) })
      .catch(err => {
        throw err;
      });
  })
});

// ID is license plate number
recordRoutes.route('/vehicles/:id').get((req, res) => {
  getCollection('vehicles', (vehicles) => {
    let query = { license_plate: req.params.id };

    vehicles.findOne(query)
      .then(result => { res.json(result) })
      .catch(err => { throw err });
  })
})

recordRoutes.route('/vehicles/add').post((req, res) => {
  getCollection('vehicles', (vehicles) => {
    const { vehicleNo } = req.body;
    let newVehicle = {
      vehicleNo: vehicleNo
    }

    vehicles.insertOne(newVehicle)
      .then(result => {
        console.log(result);
        res.json(result);
      })
      .catch(err => {
        throw err;
      });
  })
});

recordRoutes.route('/vehicles/delete').post((req, res) => {
  getCollection('vehicles', (vehicles) => {
    let query = { license_plate: req.params.id };
    vehicles.deleteOne(query).then(result => {
      res.status(200).json(result);
    }).catch(err => { throw err });
  });
})

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, res) {
  getCollection('vehicles', (vehicle) => {
    let myquery = { license_plate: req.params.id };
    let newvalues = {
      $set: { pos: req.body.pos },
    };

    vehicle.updateOne(myquery, newvalues)
      .then(result => {
        console.log('1 document updated');
        res.json(result);
      })
      .catch(err => {
        throw err;
      })
  })
});

module.exports = recordRoutes