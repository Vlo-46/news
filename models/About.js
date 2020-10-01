const {Schema, model} = require('mongoose')

const AboutSchema = new Schema({
    avatar: String,
    description: String,
})

module.exports = model('About', AboutSchema)