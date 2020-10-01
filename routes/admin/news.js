const {Router} = require('express')
const router = Router()
const News = require('../../models/News')
const multer = require('multer');

let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'public/uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Math.random() + Date.now());
    }
});

let upload = multer({storage: storage}).array('avatar', 10);


router.get('/', async (req, res) => {
    const news = await News.find().sort({created_at: -1})

    res.render('admin/news', {
        news
    })
})

router.post('/add', async function (req, res, next) {
    upload(req, res, async function (err) {
        const {title, description, category, author, tag, header_news, special, popular, video} = req.body;

        let img = req.files;
        let avatar = []
        img.forEach(i => {
            let imgName = i.filename;
            avatar.push(imgName)
        })

        let date = Date.now()

        let url = video.substring(video.lastIndexOf('/') + 1)
        let tags = tag.split(",")

        const newPost = new News({
            title, description, category, author, header_news, special, popular,
            tag: tags,
            video: url,
            created_at: date, avatar
        })
        await newPost.save()
        res.redirect('/admin-news')
    });
})

router.post('/delete', async (req, res) => {
    await News.deleteOne({_id: req.body.id})
    res.redirect('/admin-news')
})

module.exports = router;
