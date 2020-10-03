const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const Logo = require('../models/Logo')
const News = require('../models/News')


router.get('/', async (req, res) => {
    const header_news = await News.find({header_news: true})
    const logo = await Logo.find()
    if (req.session.isAuthenticated) {
        res.redirect('back')
    } else {
        res.render('login', {header_news, logo, title: 'Մուտք'})
    }

})

router.post('/', async (req, res) => {
    const {email, password} = req.body;
    const candidate = await User.findOne({email});

    if (candidate) {
        if (candidate.password === password) {
            req.session.isAuthenticated = true;
            res.redirect('/admin-users')
        } else {
            res.redirect('/login')
        }
    } else {
        res.redirect('/login')
    }
})

router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login')
    })
})


module.exports = router