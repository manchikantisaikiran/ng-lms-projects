const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const List = require('../db/models/list');

//create list
router.post('/lists', auth, async (req, res) => {
    const list = new List({
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

module.exports = router;