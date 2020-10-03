const {Router} = require('express')
const router = Router()
const Live = require('../../models/Live')

router.get('/', async (req, res) => {
    const live = await Live.find()

    res.render('admin/live', {live, title: 'Ուղիղ միացում'})
})

router.post('/live', async (req, res) => {
    const iframe = new Live({iframe: req.body.iframe})
    await iframe.save()

    // delete req.body.id
    // await Live.findByIdAndUpdate(id, req.body)

    res.redirect('/admin-live')
})

router.post('/delete', async (req, res) => {
    await Live.deleteOne({_id: req.body.id})
    res.redirect('/admin-live')
})


module.exports = router;