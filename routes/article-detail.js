const {Router} = require('express');
const router = Router();
const News = require('../models/News')

// router.get('/', (req, res) => {
//     res.render('article-detail')
// });


router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const news = await News.findById(id)

    let prev = await News.find({_id: {$lt: id}}).sort({_id: -1}).limit(1)
    let next = await News.find({_id: {$gt: id}}).sort({_id: 1}).limit(1)

    console.log(prev)
    console.log(next)

    res.render('article-detail', {
        news,
        prev,
        next,
    })
})

module.exports = router;