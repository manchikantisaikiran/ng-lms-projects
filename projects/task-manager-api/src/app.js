const { CATCH_ERROR_VAR } = require('@angular/compiler/src/output/output_ast');
const express = require('express');
const app = express();

require('./db/mongoose');
const List = require('./db/models/list');
const Task = require('./db/models/task');

app.use(express.json());

app.get('/lists', async (req, res) => {
    try {
        const lists = await List.find({});
        if (!lists) throw new Error('lists not found')
        res.send(lists);
    } catch (e) {
        res.status(400).send(e);
    }
})

app.get('/lists/:listId', async (req, res) => {
    try {
        const list = await List.findOne({
            _id: req.params.listId,
        })
        if (!list) throw new Error('no list found!');
        res.send(list);
    } catch (e) {
        res.status(400).send(e)
    }
})

app.post('/lists', async (req, res) => {
    const list = new List(req.body);
    try {
        await list.save();
        res.send(list);
    } catch (e) {
        res.status(400).send(e);
    }
})

app.patch('/lists/:id', async (req, res) => {
    try {
        const updatedUser = await List.findOneAndUpdate({ _id: req.params.id }, {
            $set: req.body
        })
        if (!updatedUser) throw new Error('no user found to update');
        res.send('updated succesfully!');
    } catch (e) {
        res.status(400).send(e);
    }

})

app.delete('/lists/:id', async (req, res) => {
    try {
        const list = List.findOneAndRemove({
            _id: req.params.id
        })
        if (!list) throw new Error('no user found to delete!');
        res.send('deleted succesfully!');
    } catch (e) {
        res.status(400).send(e);
    }
})

app.get('/lists/:listId/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({
            listId: req.params.listId
        })
        if (!tasks) throw new Error('something went wrong!');
        res.send(tasks);
    } catch (e) {
        res.status.send(e)
    }
})

app.get('/lists/:listId/tasks/:taskId', async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.taskId,
            listId: req.params.listId
        })
        if (!task) throw new Error('no task found!');
        res.send(task);
    } catch (e) {
        res.status(400).send(e)
    }
})

app.post('/lists/:listId/taask', async (req, res) => {
    try {
        const task = new Task({
            ...req.body,
            listId: req.params.listId
        });
        await task.save();
        if (!task) throw new error('something went wrong!');
        res.send(task);
    } catch (e) {
        res.status.send(e)
    }
})

app.patch('/lists/:listId/task/:taskId', async (req, res) => {
    try {
        await Task.findOneAndUpdate({
            _id: req.params.taskId,
            listId: req.params.listId
        }, {
            $set: req.body
        });
        res.send('task updated!');
    } catch (e) {
        res.status.send(e)
    }
})

app.delete('/lists/:listId/task/:taskId', async (req, res) => {
    try {
        await Task.findOneAndDelete({
            _id: req.params.taskId,
            listId: req.params.listId
        });
        res.send('deleted succesfully!');
    } catch (e) {
        res.status.send(e);
    }
})

app.listen(3000, () => {
    console.log('server is up and running');
})