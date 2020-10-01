const {Router} = require('express')
const router = Router()
const About = require('../../models/About')
const multer = require('multer')

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
    const about = await About.find()
    res.render('admin/about', {
        about
    })
})

// router.post('/about', upload.single('avatar'), async function (req, res, next) {
//     // const post = new About({
//     //     avatar: req.file.filename,
//     //     description: req.body.description,
//     // })
//     // post.save()
//     const {id} = req.body
//     delete req.body.id
//     await About.findByIdAndUpdate(id, {
//         avatar: req.file.filename,
//         description: req.body.description
//     })
//
//     res.redirect('/admin-about')
//     return false;
// })


module.exports = router;