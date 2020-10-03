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

    const header_news = await News.find({header_news: true})

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
        .sort({created_at: -1})
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
                    header_news,
                    logo,
                    title: 'Բոլորը'
                })
            })
        })

    // const news = await News.find().sort({created_at: -1})
    // let live = await Live.find()
    // let array_tags = []
    // news.forEach(i => {
    //     array_tags.push(i.tag.toString())
    // })
    //
    // array_tags = new Set(array_tags)
    // res.render('category', {
    //     news,
    //     tags: array_tags,
    //     live
    // })
});

module.exports = router;