const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    listId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'List'
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;