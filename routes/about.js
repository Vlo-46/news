const {Router} = require('express');
const router = Router();
const About = require('../models/About')
const News = require('../models/News')
const Logo = require('../models/Logo')
const AboutImgs = require('../models/About-images')

router.get('/', async (req, res) => {
    const about = await About.find()
    const urgently_news = await News.find({urgently: true}).sort({_id: -1})
    const aboutImgs = await AboutImgs.find().sort({_id: -1})

    const logo = await Logo.find()

    res.render('about', {
        about,
        urgently_news,
        logo,
        title: 'Մեր մասին',
        aboutImgs
    })
});

module.exports = router;