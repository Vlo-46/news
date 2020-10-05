const {Router} = require('express');
const router = Router();
const Contact = require('../models/Contact')
const Website = require('../models/Website')
const News = require('../models/News')
const Logo = require('../models/Logo')

router.get('/:page', async (req, res) => {
    let perPage = 6
    let page = req.params.page || 1

    const website = await Website.find()
    const urgently_news = await News.find({urgently: true})
    const logo = await Logo.find()
    const contact = await Contact.find()

    const searched_name = req.query.search;

    const items = await News.find({}).sort({_id: -1})

    // const searched_items = items.filter(i => {
    //     return i.title.toLowerCase().indexOf(searched_name) === searched_name.toLowerCase().indexOf(searched_name)
    // })
    // const count_of_posts = searched_items.length;

    News
        .find()
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .sort({_id: -1})
        .exec(function (err, news) {
            News.countDocuments().exec(function (err, count) {
                const searched_items = news.filter(i => {
                    return i.title.toLowerCase().indexOf(searched_name) === searched_name.toLowerCase().indexOf(searched_name)
                })
                const count_of_posts = searched_items.length;
                // let currentpages = '/result-search/'+page
                if (err) return next(err)
                res.render('search-result', {
                    current: page,
                    pages: Math.ceil(count / perPage),
                    searched_name,
                    searched_items,
                    count_of_posts,
                    contact,
                    website,
                    urgently_news,
                    logo,
                    title: 'Որոնում'
                })
            })
        })

    // res.render('search-result', {
    //     title: 'Որոնում',
    //     contact,
    //     website,
    //     header_news,
    //     logo,
    //     searched_name,
    //     searched_items,
    //     count_of_posts
    // })
});

module.exports = router;