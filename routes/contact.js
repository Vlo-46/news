const {Router} = require('express');
const router = Router();
const Contact = require('../models/Contact')
const Website = require('../models/Website')

router.get('/', async (req,res) => {
    const contact = await Contact.find()
    const website = await Website.find()

    res.render('contact', {
        contact,
        website
    })
});

module.exports = router;