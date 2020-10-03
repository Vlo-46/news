const {Schema, model} = require('mongoose')

const AboutImgSchema = new Schema({avatar: String})

module.exports = model('About image', AboutImgSchema)