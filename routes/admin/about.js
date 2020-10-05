const {Router} = require('express')
const router = Router()
const About = require('../../models/About')
const multer = require('multer')
const AboutImgs = require('../../models/About-images')
const auth = require('../../middlewares/auth')

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

router.get('/', auth, async (req, res) => {
    const about = await About.find()
    const images = await AboutImgs.find().sort({_id: -1})
    res.render('admin/about', {
        about,
        title: 'Մեր մասին',
        images
    })
})

router.post('/logo', upload.single('avatar'), async function (req, res, next) {
    const post = new AboutImgs({
        avatar: req.file.filename,
    })
    post.save()
    res.redirect('/admin-about')
    return false;
})

router.post('/description', async (req, res) => {
    const {id} = req.body
    delete req.body.id
    await About.findByIdAndUpdate(id, req.body)
    res.redirect('/admin-about')
})


router.post('/delete', async (req, res) => {
    await AboutImgs.deleteOne({_id: req.body.id})
    res.redirect('/admin-about')
})

module.exports = router;