const {Router} = require('express')
const router = Router()
const News = require('../../models/News')
const multer = require('multer');
const Category = require('../../models/Category')
const Tags = require('../../models/Tags')

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
    const category = await Category.find()

    res.render('admin/news', {
        news,
        category,
        title: 'Նորություններ',
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

        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();

        let today = month + "/" + date + "/" + year

        let url = video.substring(video.lastIndexOf('/') + 1)
        let tags = tag.split(",")

        const newPost = new News({
            title, description, category, author, header_news, special, popular,
            tag: tags,
            video: url,
            created_at: today,
            avatar
        })
        if (tag) {
            const post = new Tags({
                tags
            })
            await post.save()
        }
        await newPost.save()
        res.redirect('/admin-news')
    });
})

router.post('/delete', async (req, res) => {
    await News.deleteOne({_id: req.body.id})
    res.redirect('/admin-news')
})

router.get('/edit/:id', async (req, res) => {
    const news = await News.findById(req.params.id)
    const category = await Category.find()

    res.render('admin/edit', {news, title: news.title, category})
})

router.post('/edit', async (req, res) => {
    const {id} = req.body
    delete req.body.id
    await News.findByIdAndUpdate(id, req.body)
    res.redirect('/admin-news')
})

module.exports = router;
