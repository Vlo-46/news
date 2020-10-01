const {Schema, model} = require('mongoose')

const WebsiteSchema = new Schema({
    icon: String,
    link: String,
})

module.exports = model('Website', WebsiteSchema)