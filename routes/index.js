const {Router} = require('express');
const router = Router();
const News = require('../models/News')

router.get('/', async (req, res) => {
    const news = await News.find()
    const header_news = await News.find({header_news: true})
    const special_news = await News.find({special: true}).sort({created_at: -1})
    const popular_news = await News.find({popular: true}).sort({created_at: -1}).limit(5)

    res.render('index', {
        news,
        header_news,
        special_news,
        popular_news
    })
});


module.exports = router;