const {Router} = require('express')
const router = Router()
const Website = require('../../models/Website')
const Contact = require('../../models/Contact')

router.get('/', async (req, res) => {
    const website = await Website.find()
    const contact = await Contact.find()

    res.render('admin/settings', {
        website,
        contact
    })
})

router.post('/website', async (req, res) => {
    const {link, icon} = req.body
    const post = new Website({link, icon})
    await post.save()
    res.redirect('/admin-settings')
})

router.post('/contact', async (req, res) => {
    const {icon, text} = req.body
    const post = new Contact({icon, text})
    await post.save()
    res.redirect('/admin-settings')
})

router.post('/delete-website', async (req, res) => {
    await Website.deleteOne({_id: req.body.id})
    res.redirect('/admin-settings')
})

router.post('/delete-contact-info', async (req, res) => {
    await Contact.deleteOne({_id: req.body.id})
    res.redirect('/admin-settings')
})

module.exports = router;