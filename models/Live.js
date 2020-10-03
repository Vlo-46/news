const {Schema, model} = require('mongoose')

const LiveSchema = new Schema({
    iframe: String
})

module.exports = model('Live', LiveSchema)