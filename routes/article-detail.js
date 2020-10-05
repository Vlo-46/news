const {Router} = require('express');
const router = Router();
const News = require('../models/News')
const Logo = require('../models/Logo')
const Category = require('../models/Category')

// router.get('/', (req, res) => {
//     res.render('article-detail')
// });


router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const news = await News.findById(id)

    const urgently_news = await News.find({urgently: true}).sort({_id: -1})
    const logo = await Logo.find()

    let prev = await News.find({_id: {$lt: id}}).sort({_id: -1}).limit(2)
    let next = await News.find({_id: {$gt: id}}).sort({_id: 1}).limit(1)

    let category = await News.find({category: news.category}).sort({_id: -1}).limit(6)

    res.render('article-detail', {
        news,
        prev,
        next,
        urgently_news,
        logo,
        category,
        title: news.title
    })
})

module.exports = router;