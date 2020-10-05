const {Router} = require('express');
const router = Router();
const News = require('../models/News')
const Live = require('../models/Live')
const Logo = require('../models/Logo')
const Tags = require('../models/Tags')

router.get('/:page', async (req, res) => {
    let perPage = 8
    let page = req.params.page || 1

    let news = await (await News.find()).length;

    const urgently_news = await News.find({urgently: true}).sort({_id: -1})

    let live = await Live.find()

    let items = await News.find()

    const logo = await Logo.find()

    let tags = await Tags.find().sort({_id: -1}).limit(14)

    let array_tags = []
    tags.forEach(i => {
        i.tags.forEach(j => {
            array_tags.push(j.toString())
        })
    })

    array_tags = new Set(array_tags)

    News
        .find()
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .sort({_id: -1})
        .exec(function (err, news) {
            News.countDocuments().exec(function (err, count) {
                // let currentpages = '/result-search/'+page
                if (err) return next(err)
                res.render('category', {
                    news: news,
                    current: page,
                    pages: Math.ceil(count / perPage),
                    tags: array_tags,
                    live,
                    urgently_news,
                    logo,
                    title: 'Բոլորը'
                })
            })
        })
});

module.exports = router;