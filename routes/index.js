const {Router} = require('express');
const router = Router();
const News = require('../models/News')
const Live = require('../models/Live')
const Logo = require('../models/Logo')
const Tags = require('../models/Tags')

router.get('/', async (req, res) => {
    const logo = await Logo.find()
    const news = await News.find().sort({created_at: -1})
    const header_news = await News.find({header_news: true}).sort({created_at: -1})
    const special_news = await News.find({special: true}).sort({created_at: -1})
    const popular_news = await News.find({popular: true}).sort({created_at: -1}).limit(5)
    let live = await Live.find()

    const news_list = await News.find().sort({created_at: -1}).limit(6)

    let tags = await Tags.find().sort({_id: -1}).limit(15)

    let array_tags = []
    tags.forEach(i => {
        i.tags.forEach(j => {
            array_tags.push(j.toString())
        })
    })

    array_tags = new Set(array_tags)


    res.render('index', {
        news,
        header_news,
        special_news,
        popular_news,
        tags: array_tags,
        news_list,
        live,
        logo,
        title: 'Գլխավոր',
    })
});


module.exports = router;