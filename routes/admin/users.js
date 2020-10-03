const {Router} = require('express')
const router = Router()
const User = require('../../models/User')
const auth = require('../../middlewares/auth')

router.get('/', async (req, res) => {
    const users = await User.find()

    res.render('admin/users', {
        users,
        title: 'Օգտատերեր'
    })
})

router.post('/add', async (req, res) => {
    const {email, password} = req.body;
    const user = new User({email, password})
    await user.save()
    res.redirect('/admin-users')
})

router.post('/delete', async (req, res) => {
    await User.deleteOne({ _id: req.body.id })
    res.redirect('/admin-users')
})

module.exports = router