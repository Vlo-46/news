const {Schema, model} = require('mongoose')

const NewsSchema = new Schema({
    title: String,
    description: String,
    category: String,
    avatar: Array,
    author: String,
    views: String,
    tag: Array,
    created_at: Date,
    video: String,
    header_news: Boolean,
    special: Boolean,
    popular: Boolean
})

module.exports = model('News', NewsSchema)