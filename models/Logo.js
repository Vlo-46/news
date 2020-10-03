const {Schema, model} = require('mongoose')

const LogoSchema = new Schema({avatar: String})

module.exports = model('Logo', LogoSchema)