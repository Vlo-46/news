const {Schema, model} = require('mongoose')

const ContactSchema = new Schema({
    icon: String,
    text: String,
})

module.exports = model('Contact', ContactSchema)