const {Router} = require('express');
const router = Router();
const Contact = require('../models/Contact')
const Website = require('../models/Website')
const News = require('../models/News')
const Logo = require('../models/Logo')

router.get('/', async (req,res) => {
    const contact = await Contact.find()
    const website = await Website.find()
    const urgently_news = await News.find({urgently: true})
    const logo = await Logo.find()

    res.render('contact', {
        contact,
        website,
        urgently_news,
        logo,
        title: 'Կապ'
    })
});

module.exports = router;