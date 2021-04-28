const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const List = require('../db/models/list');

//create list
router.post('/lists', auth, async (req, res) => {
    const list = await new List({
        ...req.body,
        userId: req.user._id,
    })
    try {
        await list.save()
        res.status(201).send(list)
    } catch (e) {
        res.status(400).send(e)
    }
})

//get all lists of particular user
router.get('/lists', auth, async (req, res) => {
    try {
        const lists = await List.find({ userId: req.user._id })
        res.send(lists);
    } catch (e) {
        res.status(500).send(e)
    }
})

//update a list
router.patch('/lists/:listId', auth, async (req, res) => {
    const allowedUpdates = ['title']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if (!isValidOperation)
        return res.status(400).send({ error: 'invalid updates' })

    try {
        const list = await List.findById(req.params.listId);
        console.log(list)
        updates.forEach(update => list[update] = req.body[update])
        await list.save()

        res.send(list)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/lists/:listId', auth, async (req, res) => {
    try {
        const list = await List.findById(req.params.listId);
        console.log(list)
        await list.remove()
        res.send(list);
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router;