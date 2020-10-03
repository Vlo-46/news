const {Router} = require('express')
const router = Router()
const Website = require('../../models/Website')
const Contact = require('../../models/Contact')
const multer = require('multer')
const WebsiteLogo = require('../../models/Logo')
const Category = require('../../models/Category')

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, 'uploads')     //you tell where to upload the files,
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
})

let upload = multer({
    storage: storage,
    onFileUploadStart: function (file) {
        console.log(file.originalname + ' is starting ...')
    },
});

router.get('/', async (req, res) => {
    const website = await Website.find()
    const contact = await Contact.find()
    const logo = await WebsiteLogo.find()

    res.render('admin/settings', {
        website,
        contact,
        logo,
        title: 'Կարգավորումներ'
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


router.post('/logo', upload.single('avatar'), async function (req, res, next) {
    // const post = new WebsiteLogo({
    //     avatar: req.file.filename,
    // })
    // await post.save()

    const {id} = req.body
    delete req.body.id
    await WebsiteLogo.findByIdAndUpdate(id, {
        avatar: req.file.filename,
    })

    res.redirect('/admin-settings')
    return false;
})

router.post('/category', async (req, res) => {
    const post = new Category({category: req.body.category})
    await post.save()
    res.redirect('/admin-settings')
})

module.exports = router;