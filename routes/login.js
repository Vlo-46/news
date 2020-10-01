const {Router} = require('express')
const router = Router()
const User = require('../models/User')

router.get('/', (req, res) => {
    if (req.session.isAuthenticated) {
        res.redirect('back')
    } else {
        res.render('login')
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