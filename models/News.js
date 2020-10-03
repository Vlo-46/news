const {Schema, model} = require('mongoose')

const NewsSchema = new Schema({
    title: String,
    description: String,
    category: String,
    avatar: Array,
    author: String,
    views: Number,
    tag: Array,
    created_at: String,
    video: String,
    header_news: Boolean,
    special: Boolean,
    popular: Boolean,
})

module.exports = model('News', NewsSchema)