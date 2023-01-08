const dbo = require('../db/conn');
const { ObjectId } = require('mongodb');

/** 
 * @typedef {function(import('mongodb').Collection): void} Cb0
 */
/** 
 * @param {string} collection collection name
 * @param {Cb0} cb
 */
const getCollection = (collection, cb) => {
  cb(dbo.getDb().collection(collection));
}

module.exports = { getCollection }