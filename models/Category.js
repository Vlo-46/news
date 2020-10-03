const {Schema, model} = require('mongoose')

const CategorySchema = new Schema({category: String})

module.exports = model('Category', CategorySchema)