const mongoose = require('mongoose')
const Schema = mongoose.Schema

const producerSchema = new Schema({
  name: String,
  country: String
})

module.exports = mongoose.model('Producer', producerSchema)