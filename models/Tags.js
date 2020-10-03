const {Schema, model} = require('mongoose')

const TagsSchema = new Schema({tags: Array})

module.exports = model('Tag', TagsSchema)