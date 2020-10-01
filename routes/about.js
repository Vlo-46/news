const {Router} = require('express');
const router = Router();
const About = require('../models/About')

router.get('/', async (req, res) => {
    const about = await About.find()
    res.render('about', {
        about
    })
});

module.exports = router;