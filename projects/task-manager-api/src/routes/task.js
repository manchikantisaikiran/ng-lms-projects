const express = require('express');
const Task = require('../db/models/task');
const auth = require('.././middleware/auth');
const router = express.Router();

//create task
router.post('/lists/:listId/tasks', auth, async (req, res) => {
    console.log('a')
    const task = new Task({
        ...req.body,
        listId: req.params.listId
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})
//get all tasks of particulat list
router.get('/lists/:listId/tasks', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ listId: req.params.listId })
        res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/task/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOne({ _id, author: req.user._id })
        if (!task)
            return res.status(404).send()
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})
//update a task
router.patch('/lists/:listId/tasks/:taskId', auth, async (req, res) => {
    const allowedUpdates = ['completed', 'title'];
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if (!isValidOperation)
        res.status(400).send({ error: 'invalid updates' })

    try {
        const task = await Task.findOne({ _id: req.params.taskId, listId: req.params.listId })

        if (!task)
            res.status(404).send()

        updates.forEach(update => task[update] = req.body[update])
        await task.save()

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/task/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        // const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({ _id, author: req.user._id })
        if (!task)
            return res.status(404).send()
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router;