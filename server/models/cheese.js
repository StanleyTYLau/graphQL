const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cheeseSchema = new Schema({
  name: String,
  milk: String,
  producerID: String
})

module.exports = mongoose.model('Cheese', cheeseSchema)