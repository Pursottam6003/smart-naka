const { MongoClient } = require("mongodb");
const Db = process.env.DB_URI;
const dbName = process.env.DB_NAME;

const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/** @type {import('mongodb').Db} */
var _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db) {
        _db = db.db(dbName);
        console.log(`Successfully connected to ${dbName}.`);

        _db.collection('vehicles').createIndex({'license_plate': 1}, {unique: true})
        .then(() => { console.log(`Successfully created unique index for license plates`) })
        .catch(err => { throw err });
      }
      return callback(err);
    });
  },

  getDb: function () {
    return _db;
  },
};